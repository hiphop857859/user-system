import Base from '../Base'
import { error } from '../../constant'

export default class extends Base {
  public async detail (param) {
    const { id } = param
    const checkUUID = await this.validateUUID([id])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    const data = await this.knex('User')
      .select(
        'id',
        'email',
        'avatar',
        'emailAcb',
        'fullName',
        'position',
        'qrCode',
        'phone',
        'accountID',
        'documentCode',
        'balanceScoreCard',
        'department',
        'description',
        'birthday',
        'workingDay',
        'unit'
      )
      .where({ id, isDeleted: false })
      .first()
    if (!data) {
      throw error.USER.USER_NOT_FOUND
    }

    return data
  }

  public async findByEmailAcb (params) {
    const {
      emailAcb
    } = params
    const data = await this.knex('User')
      .where({ emailAcb, isDeleted: false }).first()
    if (data) {
      return data
    }
    throw error.USER.USER_NOT_FOUND
  }

  public async findByEmail (params) {
    const {
      email
    } = params
    const data = await this.knex('User')
      .where({ email, isDeleted: false }).first()
    if (data) {
      return data
    }
    throw error.USER.USER_NOT_FOUND
  }

  public async findByQrCode (params) {
    const {
      qrCode
    } = params
    const data = await this.knex('User')
      .where({ qrCode, isDeleted: false }).first()
    if (data) {
      return data
    }
    throw error.USER.USER_NOT_FOUND
  }
}
