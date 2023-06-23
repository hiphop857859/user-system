import Base from '../Base'
import { error } from '../../constant'
import { validate, utilCrypto, getRandomSalt } from '../../utility'
const commonPassword = require('common-password-checker')

export default class extends Base {
  public async create (params) {
    let { fullName, phone, email, password, role } = params
    const system = this.currentUser.system
    if (!system || system === '') {
      throw error.SYSTEM.SYSTEM_IS_REUQUIRED
    }
    const checkUUID = await this.validateUUID([role])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    const checkRole = await this.knex('Role')
      .where({ id: role }).first()
    if (JSON.parse(checkRole.permissions)[0] === 'FULL' && this.currentUser.role[0] !== 'FULL') {
      throw error.STAFF.CANT_CREATE_HIGHER_STAFF
    }
    const checkEmail = await this.knex('Staff').where({ email, system, isDeleted: false })
    if (checkEmail.length) {
      throw error.STAFF.STAFF_EXIST
    }
    this.validate_password(password)
    this.validate_email(email)
    const salt = await this.getRandomSalt()
    password = this.getPassword(password, salt)
    const data = {
      fullName, phone, email, password, salt, role, type: 'STAFF', system
    }
    await this.knex('Staff').insert(data)
    return 'Success'
  }

  // eslint-disable-next-line camelcase
  public validate_password (password) {
    const result = password.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')
    if (!result) {
      throw error.PASSWORD_NOT_STRONG
    }
    if (!validate.valid_string(password, 6, 18)) {
      throw error.PASSWORD_WRONG_FORMAT
    }
    if (commonPassword(password)) {
      throw error.PASSWORD_NOT_STRONG
    }
  }

  // eslint-disable-next-line camelcase
  public validate_email (email) {
    if (!validate.email(email)) {
      throw error.STAFF.INVALID_STAFF_EMAIL
    }
  }

  public getPassword (password, salt) {
    return utilCrypto.sha512(password + salt)
  }

  public async getRandomSalt () {
    let salt
    while (1) {
      salt = getRandomSalt()
      const isExistedSalt = await this.knex('Staff').where({
        salt: salt
      })
      if (!isExistedSalt.length) {
        return salt
      }
    }
  }
}
