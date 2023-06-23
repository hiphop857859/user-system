import { Request, Response, NextFunction, Router } from 'express'
import user from './user'
import cms from './cms'
import * as jwt from 'jsonwebtoken'
import knex from '../db/configs/db-connector'
import { utilCrypto } from '../utility'
import * as moment from 'moment'
import * as uuid from 'uuid'
import { setRedisData, getRedisData, deleteKey } from '../db/configs/redis'
const passport = require('passport')
import { sendQueue } from '../helper/amqp.helper'
/**
 * Every request intercepts the token and sets the session user from the userId again
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {boolean}
 */
export const middlewareUser = async (req: Request, res: Response, next: NextFunction) => {
  // check token
  const token: any = req.headers['api-token']
  if (token) {
    try {
      const decoded = await verifyJwtToken(token, process.env.JWT_SECRET)
      if (!await isValidUserTokenCache(decoded, token)) {
        return res.json({
          code: -100,
          type: 'ACCESS_DENIED',
          error: 'ACCESS_DENIED'
        })
      }
      // eslint-disable-next-line dot-notation
      req['currentUser'] = decoded
      next()
    } catch (e) {
      console.log('middleware: ', e.message)
      next()
    }
  } else {
    next()
  }
}

const isValidUserTokenCache = async (decoded, token) => {
  const originalToken = await getRedisData(`USER:${decoded.id}:TOKEN`)
  if (!originalToken || originalToken !== token) {
    console.log('USER_FALSE')
    return false
  }
  return true
}

const isValidStaffTokenCache = async (decoded, token) => {
  const originalToken = await getRedisData(`STAFF:${decoded.id}:TOKEN:${decoded.timeStart}`)
  if (!originalToken || originalToken !== token) {
    console.log('STAFF_FALSE')
    return false
  }
  return true
}

export const verifyJwtToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}
const syncUser = async (data) => {
  const newData = data
  await sendQueue({
    key: 'SYNC_USER_TALENT',
    data: [newData]
  })
  await sendQueue({
    key: 'SYNC_USER_ACTIVITY',
    data: [newData]
  })
  await sendQueue({
    key: 'SYNC_USER_EVENT',
    data: [newData]
  })
}

export const middlewareStaff = async (req: Request, res: Response, next: NextFunction) => { // NOSONAR
  // check token
  const token = req.headers['api-token']
  const systemToken = req.headers['system-token']
  if (token) {
    try {
      const json = JSON.parse(utilCrypto.decrypt(token.toString()))
      if (json.user && json.expired && (json.expired - moment().unix() > 0)) {
        if (!json.user.system || json.user.system === '') {
          throw Error('ACCESS_DENIED')
        }
        if (!await isValidStaffTokenCache(json.user, token)) {
          return res.json({
            code: -100,
            type: 'ACCESS_DENIED',
            error: 'ACCESS_DENIED'
          })
        }
        // eslint-disable-next-line dot-notation
        req['currentUser'] = json.user
        next()
      } else {
        throw Error('ACCESS_DENIED')
      }
    } catch (e) {
      console.log('middleware: ', e.message)
      next()
    }
  } else if (systemToken) {
    try {
      const json = jwt.verify(systemToken, process.env.SECRET_KEY)
      if (json) {
        knex('Staff')
          .where({
            type: 'ADMIN'
            // type: 'ADMIN'
          })
          .first()
          .then(async (staff) => {
            if (staff) {
              // eslint-disable-next-line dot-notation
              req['currentUser'] = staff
            }
            next()
          }).catch(e => {
            console.log('middleware: ', e.message)
            next()
          })
      }
    } catch (e) {
      console.log('middleware: ', e.message)
      next()
    }
  } else {
    next()
  }
}

export const middlewareAzure = async (req: any, res: Response, next: NextFunction) => { // NOSONAR
  const baseUrl = {
    TALENT: process.env.TALENT_CLIENT_URL,
    LMS: process.env.LMS_CLIENT_URL,
    EVENT: process.env.EVENT_CLIENT_URL
  }
  let user = await knex('User').where({ // NOSONAR
    isDeleted: false,
    emailAcb: req.user.profile.upn
  })
    .select(
      'id',
      'fullName',
      'accountID',
      'accountMsID',
      'email',
      'emailAcb',
      'phone',
      'status',
      'avatar',
      'position',
      'linkSocial',
      'bio',
      'balanceScoreCard',
      'documentCode',
      'qrCode',
      'department',
      'birthday',
      'workingDay'
    ).first()

  if (!user) {
    await knex('User').insert({ // NOSONAR
      accountMsID: req.user.profile.oid,
      emailAcb: req.user.profile.upn,
      fullName: req.user.profile.name,
      qrCode: uuid.v4()
    })

    const userData = await knex('User') // NOSONAR
      .where({
        isDeleted: false,
        emailAcb: req.user.profile.upn
      })
      .select(
        'id',
        'fullName',
        'accountID',
        'accountMsID',
        'email',
        'emailAcb',
        'phone',
        'status',
        'avatar',
        'position',
        'linkSocial',
        'bio',
        'balanceScoreCard',
        'documentCode',
        'qrCode',
        'department',
        'birthday',
        'workingDay'
      ).first()
    syncUser(userData)
    userData.system = req.query.state
    const token2 = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: Number(process.env.JWT_TOKEN_LIFE)
    })
    setRedisData(`USER:${userData.id}:TOKEN`, JSON.stringify(token2))
    res.cookie('accessTokenMS', req.user.accessToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
    res.cookie('refreshTokenMS', req.user.refreshToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
    res.cookie('api-token', token2, { domain: process.env.DOMAIN_ALL, httpOnly: false })
    res.cookie('current_user', JSON.stringify(userData), { domain: process.env.DOMAIN_ALL, httpOnly: false })
    res.cookie('avatar', userData.avatar, { domain: process.env.DOMAIN_ALL, httpOnly: false })
    res.cookie('type-login', 'MICROSOFT', { domain: process.env.DOMAIN_ALL, httpOnly: false })
    res.redirect(baseUrl[req.query.state])
  } else {
    await knex('User').where({
      emailAcb: req.user.profile.upn
    })
      .update({
        accountMsID: req.user.profile.oid,
        emailAcb: req.user.profile.upn,
        fullName: req.user.profile.name
      })

    user = await knex('User') // NOSONAR
      .where({
        isDeleted: false,
        emailAcb: req.user.profile.upn
      })
      .select(
        'id',
        'fullName',
        'accountID',
        'accountMsID',
        'email',
        'emailAcb',
        'phone',
        'status',
        'avatar',
        'position',
        'linkSocial',
        'bio',
        'balanceScoreCard',
        'documentCode',
        'qrCode',
        'department',
        'birthday',
        'workingDay'
      ).first()
  }

  if (!user.status) {
    res.redirect(baseUrl[req.query.state])
    return
  }
  user.system = req.query.state
  const token3 = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_TOKEN_LIFE)
  })
  setRedisData(`USER:${user.id}:TOKEN`, JSON.stringify(token3))
  res.cookie('accessTokenMS', req.user.accessToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.cookie('refreshTokenMS', req.user.refreshToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.cookie('api-token', token3, { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.cookie('current_user', JSON.stringify(user), { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.cookie('avatar', user.avatar, { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.cookie('type-login', 'MICROSOFT', { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.redirect(baseUrl[req.query.state])
}
const router = Router()
router.use('/users', user)
router.use('/user', middlewareUser, user)
router.use('/cms', middlewareStaff, cms)
router.use('/users/login-azure',
  async function (req: any, res) {
    req.session.system = req.query.system

    res.cookie('system', req.query.system, { domain: process.env.DOMAIN_ALL, httpOnly: false })

    const baseUrl2 = {
      TALENT: '/user/api/users/login-azures-talent',
      LMS: '/user/api/users/login-azures-lms',
      EVENT: '/user/api/users/login-azures-event'
    }
    const baseUrl = {
      TALENT: process.env.TALENT_CLIENT_URL,
      LMS: process.env.LMS_CLIENT_URL,
      EVENT: process.env.EVENT_CLIENT_URL
    }
    const params = req.query.system
    if (req.isAuthenticated()) {
      let user = await knex('User').where({ // NOSONAR
        isDeleted: false,
        emailAcb: req.user.profile.upn
      })
        .select(
          'id',
          'fullName',
          'accountID',
          'accountMsID',
          'email',
          'emailAcb',
          'phone',
          'status',
          'avatar',
          'position',
          'linkSocial',
          'bio',
          'balanceScoreCard',
          'documentCode',
          'qrCode',
          'department',
          'birthday',
          'workingDay'
        ).first()

      if (!user) {
        await knex('User').insert({ // NOSONAR
          accountMsID: req.user.profile.oid,
          emailAcb: req.user.profile.upn,
          fullName: req.user.profile.name,
          qrCode: uuid.v4()
        })

        const userData = await knex('User') // NOSONAR
          .where({
            isDeleted: false,
            emailAcb: req.user.profile.upn
          })
          .select(
            'id',
            'fullName',
            'accountID',
            'accountMsID',
            'email',
            'emailAcb',
            'phone',
            'status',
            'avatar',
            'position',
            'linkSocial',
            'bio',
            'balanceScoreCard',
            'documentCode',
            'qrCode',
            'department',
            'birthday',
            'workingDay'
          ).first()
          syncUser(userData)
        userData.system = params
        const token2 = jwt.sign(userData, process.env.JWT_SECRET, {
          expiresIn: Number(process.env.JWT_TOKEN_LIFE)
        })
        setRedisData(`USER:${userData.id}:TOKEN`, JSON.stringify(token2))
        res.cookie('accessTokenMS', req.user.accessToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
        res.cookie('refreshTokenMS', req.user.refreshToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
        res.cookie('api-token', token2, { domain: process.env.DOMAIN_ALL, httpOnly: false })
        res.cookie('current_user', JSON.stringify(userData), { domain: process.env.DOMAIN_ALL, httpOnly: false })
        res.cookie('avatar', userData.avatar, { domain: process.env.DOMAIN_ALL, httpOnly: false })
        res.cookie('type-login', 'MICROSOFT', { domain: process.env.DOMAIN_ALL, httpOnly: false })
        res.redirect(baseUrl[req.query.state])
      } else {
        await knex('User').where({ // NOSONAR
          emailAcb: req.user.profile.upn
        })
          .update({
            accountMsID: req.user.profile.oid,
            emailAcb: req.user.profile.upn,
            fullName: req.user.profile.name
          })

        user = await knex('User') // NOSONAR
          .where({
            isDeleted: false,
            emailAcb: req.user.profile.upn
          })
          .select(
            'id',
            'fullName',
            'accountID',
            'accountMsID',
            'email',
            'emailAcb',
            'phone',
            'status',
            'avatar',
            'position',
            'linkSocial',
            'bio',
            'balanceScoreCard',
            'documentCode',
            'qrCode',
            'department',
            'birthday',
            'workingDay'
          ).first()
      }

      if (!user.status) {
        res.redirect(baseUrl[req.query.state])
        return
      }
      user.system = params
      const token3 = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.JWT_TOKEN_LIFE)
      })
      setRedisData(`USER:${user.id}:TOKEN`, JSON.stringify(token3))
      res.cookie('accessTokenMS', req.user.accessToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
      res.cookie('refreshTokenMS', req.user.refreshToken, { domain: process.env.DOMAIN_ALL, httpOnly: false })
      res.cookie('api-token', token3, { domain: process.env.DOMAIN_ALL, httpOnly: false })
      res.cookie('current_user', JSON.stringify(user), { domain: process.env.DOMAIN_ALL, httpOnly: false })
      res.cookie('avatar', user.avatar, { domain: process.env.DOMAIN_ALL, httpOnly: false })
      res.cookie('type-login', 'MICROSOFT', { domain: process.env.DOMAIN_ALL, httpOnly: false })
      res.redirect(baseUrl[req.query.state])
    } else {
      res.redirect(baseUrl2[params])
    }
  })
router.use('/users/logout-azure', async function (req: any, res) {
  const userSystem: any = req.cookies.current_user
  await deleteKey(`USER:${userSystem.id}:TOKEN`)
  req.logout()
  res.clearCookie('api-token', { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.clearCookie('current_user', { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.clearCookie('avatar', { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.clearCookie('type-login', { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.clearCookie('accessTokenMS', { domain: process.env.DOMAIN_ALL, httpOnly: false })
  res.clearCookie('refreshTokenMS', { domain: process.env.DOMAIN_ALL, httpOnly: false })
  const baseUrl = {
    TALENT: process.env.TALENT_CLIENT_URL,
    LMS: process.env.LMS_CLIENT_URL,
    EVENT: process.env.EVENT_CLIENT_URL
  }
  const params = req.query.system
  res.redirect('https://login.microsoftonline.com/' + process.env.MICROSOFT_GRAPH_TENANTID + '/oauth2/logout?post_logout_redirect_uri=' + baseUrl[params])
})
router.use('/users/login-azures-talent',
  passport.authenticate('azure_ad_oauth2', { state: 'TALENT' }))
router.use('/users/login-azures-event',
  passport.authenticate('azure_ad_oauth2', { state: 'EVENT' }))
router.use('/users/login-azures-lms',
  passport.authenticate('azure_ad_oauth2', { state: 'LMS' }))
router.use('/users/login-azure-success',
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
  middlewareAzure)
router.use((req, res) => {
  return res.sendStatus(403)
})

export default router
