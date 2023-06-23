import Base from '../Base'
import { error } from '../../constant'

export default class extends Base {
  public async delete (params) {
    const { id } = params
    const checkUUID = await this.validateUUID([id])
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
      throw error.STAFF.CANT_DELETE_HIGHER_STAFF
    }

    await this.knex('Staff')
      .where({ isDeleted: false, id })
      .update({ isDeleted: true })

    return 'Success'
  }
}
