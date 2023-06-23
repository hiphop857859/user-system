import Base from '../Base'
import { error } from '../../constant'
import * as uuid from 'uuid'
import * as jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { setRedisData } from '../../db/configs/redis'
import { sendQueue } from '../../helper/amqp.helper'
export default class extends Base {
  private dbUser;
  protected init () {
    this.dbUser = this.knex('User')
  }

  public async login (param) { // NOSONAR
    const {
      accountID,
      fullName = '',
      email,
      avatar,
      accessToken,
      device = 'NULL'
      // position,
      // phone
    } = param
    // if (type === 'GOOGLE') {
    // login by Google
    if (!accountID) {
      throw error.USER.ACCOUNT_ID_INVALID
    }

    try {
      let clientId = process.env.APP_GOOGLE_ID
      if (device === 'IOS') {
        clientId = process.env.APP_GOOGLE_ID_IOS
      }
      if (device === 'ANDROID') {
        clientId = process.env.APP_GOOGLE_ID_ANDROID
      }
      const client = new OAuth2Client(clientId)
      const ticket = await client.verifyIdToken({
        idToken: accessToken,
        audience: clientId
      })
      const payload = ticket.getPayload()
      if (accountID !== payload?.sub) {
        throw error.USER.ACCOUNT_ID_INVALID
      }
      if (email !== payload?.email) {
        throw error.USER.EMAIL_INVALID
      }
    } catch (ex) {
      console.log('ex', ex)
      throw error.USER.ACCOUNT_ID_INVALID
    }
    let user = await this.knex('User')
      .where({ isDeleted: false })
      .where(function () {
        this.where({
          email: email
        }).orWhere({
          emailAcb: email
        })
          .orWhere({
            accountID: accountID
          })
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
      await this.knex('User').insert({
        accountID,
        email,
        fullName,
        avatar,
        qrCode: uuid.v4()
      })

      const userData = await this.knex('User')
        .where({ isDeleted: false })
        .where(function () {
          this.where({
            email: email
          }).orWhere({
            emailAcb: email
          })
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
      this.syncUser(userData)
      const token1 = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.JWT_TOKEN_LIFE)
      })
      setRedisData(`USER:${userData.id}:TOKEN`, JSON.stringify(token1))
      // Tạo một mã token khác - Refresh token
      // const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
      //   expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE
      // })
      return {
        user: userData,
        'api-token': token1
      }
    } else {
      await this.knex('User').where({ emailAcb: email }).orWhere({
        email: email
      })
        .update({
          accountID,
          fullName
        })

      user = await this.knex('User')
        .where({ isDeleted: false })
        .where(function () { // NOSONAR
          this.where({
            email: email
          }).orWhere({
            emailAcb: email
          })
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
    this.syncUser(user)
    if (!user.status) {
      throw error.USER.ACCOUNT_IS_BLOCKED
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: Number(process.env.JWT_TOKEN_LIFE)
    })
    setRedisData(`USER:${user.id}:TOKEN`, JSON.stringify(token))
    return {
      user,
      'api-token': token
    }
  }

  async syncUser (data) {
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
}
