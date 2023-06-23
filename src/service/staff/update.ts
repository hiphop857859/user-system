import Base from '../Base'
import { error } from '../../constant'
import { validate, utilCrypto, getRandomSalt } from '../../utility'
const commonPassword = require('common-password-checker')

export default class extends Base {
  public async update (params) {
    const { id, fullName, phone, email, password = '', role } = params
    const checkUUID = await this.validateUUID([id, role])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    const system = this.currentUser.system
    const checkStaff = await this.knex.from('Staff as S')
      .join('Role as R', 'R.id', 'S.role')
      .where({
        'S.id': id,
        'S.isDeleted': false,
        'S.system': system
      })
      .select('S.*', 'R.permissions')
      .first()
    if (!checkStaff) {
      throw error.STAFF.STAFF_EXIST
    }
    if (JSON.parse(checkStaff.permissions)[0] === 'FULL' && this.currentUser.role[0] !== 'FULL') {
      throw error.STAFF.CANT_UPDATE_HIGHER_STAFF
    }
    const checkRole = await this.knex('Role')
      .where({ id: role }).first()
    if (JSON.parse(checkRole.permissions)[0] === 'FULL' && this.currentUser.role[0] !== 'FULL') {
      throw error.STAFF.CANT_UPDATE_HIGHER_STAFF
    }

    this.validate_email(email)
    const checkemail = await this.knex('Staff')
      .where({ email, isDeleted: false })
      .whereNot('id', id).first()
    if (checkemail) throw error.STAFF.INVALID_STAFF_EMAIL
    const data = {
      fullName, phone, email, password, role
    }
    if (!role) {
      delete data.role
    }
    if (password !== '') {
      data.password = await this.getPassword(password, checkStaff.salt)
    } else {
      delete data.password
    }
    await this.knex('Staff').where({ isDeleted: false, id }).update(data)
    return 'Success'
  }

  // eslint-disable-next-line camelcase
  public validate_password (password) {
    const result = password.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')
    if (result) {
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
