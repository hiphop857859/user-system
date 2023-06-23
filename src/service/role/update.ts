import Base from '../Base'
import { error } from '../../constant'
import { slugVer2 } from '../../utility'

export default class extends Base {
  public async update (param) {
    const {
      roleID,
      name,
      description,
      permissions
    } = param
    const system = this.currentUser.system
    if (!roleID) {
      throw error.ROLE.ROLE_ID_INVALID
    }
    const checkUUID = await this.validateUUID([roleID])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    if (!name) {
      throw error.ROLE.NAME_INVALID
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

    const key = slugVer2(name)
    await this.knex('Role').where({
      id: roleID,
      isDeleted: false
    }).update({
      name,
      key,
      description,
      permissions: JSON.stringify(permissions)
    })

    return 'UPDATE_SUCCESS'
  }
}
