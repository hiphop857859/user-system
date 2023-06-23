import Base from '../Base'
import { error } from '../../constant'
export default class extends Base {
  public async detail (params) {
    let { id, system } = params
    const checkUUID = await this.validateUUID([id])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    system = system || this.currentUser.system // NOSONAR
    const checkStaff = await this.knex('Staff').where({
      id,
      isDeleted: false
      // system
    }).first()

    if (!checkStaff) {
      throw error.STAFF.STAFF_NOT_FOUND
    }

    return this.knex('Staff')
      .leftJoin('Role', 'Role.id', 'Staff.role')
      .where('Staff.id', '=', id)
      .select('Staff.id', 'Staff.fullName', 'Staff.phone', 'Staff.email', 'Role.name as roleName', 'Role.id as roleID')
      .first()
  }

  public async getAdmin () {
    return this.knex('Staff')
      .leftJoin('Role', 'Role.id', 'Staff.role')
      .where({ 'Staff.type': 'ADMIN' })
      .select(
        {
          id: 'Staff.id',
          fullName: 'Staff.fullName',
          phone: 'Staff.phone',
          role: 'Role.permissions',
          email: 'Staff.email',
          type: 'Staff.type',
          status: 'Staff.status',
          avatar: 'Staff.avatar',
          salt: 'Staff.salt'
        })
      .first()
  }
}
