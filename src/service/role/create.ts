import Base from '../Base'
import { error } from '../../constant'
import { slugVer2 } from '../../utility'

export default class extends Base {
  public async create (param) {
    const {
      name,
      description,
      permissions
    } = param
    const system = this.currentUser.system
    if (!name) {
      throw error.ROLE.NAME_INVALID
    }

    const key = slugVer2(name)

    await this.knex('Role').insert({
      name,
      key,
      description,
      system,
      permissions: JSON.stringify(permissions)
    })

    return 'CREATE_SUCCESS'
  }
}
