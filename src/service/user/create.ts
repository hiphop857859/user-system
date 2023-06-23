import Base from '../Base'
import { error } from '../../constant'
import {
  validate, utilCrypto, getRandomSalt
} from '../../utility'
import { sendQueue } from '../../helper/amqp.helper'
export default class extends Base {
  public async create (param) {
    const {
      fullName,
      email,
      emailAcb,
      qrCode,
      // password,
      position,
      phone,
      accountID,
      documentCode,
      team,
      description,
      birthday,
      workingDay,
      unit
    } = param
    if (email && email !== '') {
      this.validate_email(email)
      const checkEmail = await this.knex('User')
        .where(function () {
          this.where({ email })
            .orWhere({ email: emailAcb })
            .orWhere({ emailAcb: email })
            .orWhere({ emailAcb })
        }).first()
      if (checkEmail) {
        throw error.USER.USER_EXIST
      }
    }
    this.validate_email(emailAcb)
    const checkEmailACB = await this.knex('User')
      .where(function () {
        this.where({ email: emailAcb })
          .orWhere({ emailAcb })
      }).first()
    if (checkEmailACB) {
      throw error.USER.USER_EXIST
    }
    const data = {
      fullName,
      email,
      emailAcb,
      position,
      team,
      documentCode,
      accountID,
      phone,
      qrCode,
      description,
      birthday,
      workingDay,
      unit: JSON.stringify(unit)
    }
    if (!birthday || birthday === '') {
      delete data.birthday
    }
    if (!workingDay || workingDay === '') {
      delete data.workingDay
    }
    const userID = await this.knex('User').insert(data).returning('id')
    this.sync(data, userID[0])
    return userID[0]
  }

  async sync (data, id) {
    const newData = {
      ...data,
      id
    }
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

  public async getRandomSalt () {
    let salt
    while (1) {
      salt = getRandomSalt()
      const isExistedSalt = await this.knex('User').where({
        salt: salt
      })
      if (!isExistedSalt.length) {
        return salt
      }
    }
  }
}
