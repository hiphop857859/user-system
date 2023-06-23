import Base from '../Base'
import { error } from '../../constant'
import {
  validate, utilCrypto, getRandomSalt
} from '../../utility'
import { sendQueue } from '../../helper/amqp.helper'

export default class extends Base {
  public async update (param) {
    const {
      id,
      fullName,
      avatar,
      qrCode,
      email,
      emailAcb,
      position,
      phone,
      accountID,
      documentCode,
      department,
      description,
      birthday,
      workingDay,
      unit,
      team,
    } = param
    const checkUUID = await this.validateUUID([id])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    const checkUser = await this.knex('User').where({
      id,
      isDeleted: false
    }).first()
    if (!checkUser) {
      throw error.USER.USER_NOT_FOUND
    }

    if (email && email !== '') {
      this.validate_email(email)
      const checkemail = await this.knex('User')
        .where({ email, isDeleted: false })
        .whereNot('id', id).first()
      if (checkemail) throw error.USER.USER_EXIST
    }

    this.validate_email(emailAcb)
    const checkemailAcb = await this.knex('User')
      .where({ emailAcb, isDeleted: false })
      .whereNot('id', id).first()
    if (checkemailAcb) throw error.USER.USER_EXIST

    const data = {
      fullName,
      qrCode,
      email,
      emailAcb,
      position,
      phone,
      accountID,
      documentCode,
      department,
      description,
      avatar,
      team,
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
    await this.knex('User').where({ id, isDeleted: false }).update(data)
    this.sync(data, id)
    return 'Success'
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
      }).first()
      if (!isExistedSalt) {
        return salt
      }
    }
  }
}
