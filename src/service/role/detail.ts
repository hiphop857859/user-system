import Base from '../Base'
import { error } from '../../constant'

export default class extends Base {
  public async detail (param) {
    const {
      roleID
    } = param
    const system = this.currentUser.system
    if (!roleID) {
      throw error.ROLE.ROLE_ID_INVALID
    }
    const checkUUID = await this.validateUUID([roleID])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    const role = await this.knex('Role').where({
      id: roleID,
      isDeleted: false
    })
      .where(function () {
        this.where({ system })
          .orWhere({ key: 'MASTER' })
      })
      .select(
        'id',
        'name',
        'description',
        'permissions',
        'isBlock'
      ).first()

    if (!role) {
      throw error.ROLE.ROLE_NOT_FOUND
    }

    role.permissions = JSON.parse(role.permissions)
    return role
  }
}
