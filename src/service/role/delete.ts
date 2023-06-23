import Base from '../Base'
import { error } from '../../constant'

export default class extends Base {
  public async delete (param) {
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
      isDeleted: false,
      system
    }).first()

    if (!role) {
      throw error.ROLE.ROLE_NOT_FOUND
    }

    if (role.isBlock) {
      throw error.ROLE.ROLE_IS_BLOCKED
    }

    await this.knex('Role').where({
      id: roleID,
      isDeleted: false
    }).update({
      isDeleted: true
    })

    return 'DELETE_SUCCESS'
  }
}
