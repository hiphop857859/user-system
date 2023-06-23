import Base from '../Base'
import { error } from '../../constant'

export default class extends Base {
  public async detailToken (param) {
    const { id } = param
    const checkUUID = await this.validateUUID([id])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    return this.knex('TokenApp').where({ userID: id })
  }
}
