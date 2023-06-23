import Base from '../Base'
import { error } from '../../constant'
import {
  validate, utilCrypto
} from '../../utility'
import * as moment from 'moment'
import { setRedisData } from '../../db/configs/redis'
export default class extends Base {
  public async login (param) {
    const {
      email,
      password,
      system
    } = param

    if (!system || system === '') {
      throw error.SYSTEM.SYSTEM_IS_REUQUIRED
    }

    this.validate_email(email)
    this.validate_password(password)
    const knex = this.knex
    const checkAdmin = await this.knex('Staff')
      .where({ email, type: 'ADMIN' }).first()
    const query = this.knex('Staff')
      .leftJoin('Role', function () {
        this.on(knex.raw(`
                    public."Staff"."role" = public."Role"."id"
                    and public."Role"."isDeleted" = ?
                `, [false]))
      })
      .where({ 'Staff.email': email, 'Staff.isDeleted': false })

    if (system && !checkAdmin) {
      query.where({ 'Staff.system': system })
    }

    const user = await query
      .select(
        {
          id: 'Staff.id',
          fullName: 'Staff.fullName',
          phone: 'Staff.phone',
          roleID: 'Role.id',
          role: 'Role.permissions',
          email: 'Staff.email',
          type: 'Staff.type',
          status: 'Staff.status',
          avatar: 'Staff.avatar',
          password: 'Staff.password', // NOSONAR
          salt: 'Staff.salt',
          system: 'Staff.system'
        })
      .first()
    if (!user) {
      throw error.USER.USERNAME_OR_PASSWORD_IS_INCORRECT
    }
    if (checkAdmin) {
      user.system = system
    }
    user.timeStart = new Date().getTime()

    const hashPass = this.getPassword(password, user.salt)
    if (hashPass !== user.password) {
      throw error.USER.USERNAME_OR_PASSWORD_IS_INCORRECT
    }

    delete user.password
    delete user.salt
    console.log(user)
    user.role = (user.role && JSON.parse(user.role)) || []

    const resultData = {
      user
    }
    delete user.password
    // always return api-token on login, this is needed for future requests
    const token = utilCrypto.encrypt(JSON.stringify({
      user,
      expired: moment().add(30, 'd').unix()
    }))
    resultData['api-token'] = token
    setRedisData(`STAFF:${user.id}:TOKEN:${user.timeStart}`, JSON.stringify(token))

    return resultData
  }

  // eslint-disable-next-line camelcase
  public validate_password (password) {
    if (!validate.valid_string(password, 6, 18)) {
      throw error.PASSWORD_WRONG_FORMAT
    }
  }

  // eslint-disable-next-line camelcase
  public validate_email (email) {
    if (!validate.email(email)) {
      throw error.USER.INVALID_USER_EMAIL
    }
  }

  public getPassword (password, salt) {
    return utilCrypto.sha512(password + salt)
  }
}
