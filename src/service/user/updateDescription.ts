import Base from '../Base'
import { error } from '../../constant'
export default class extends Base {
  async update (params) {
    const { list } = params
    for (const user of list) {
      const checkUUID = await this.validateUUID([user.userID])
      if (!checkUUID) {
        throw error.UUID.DATA_NOT_UUID_VALUE
      }
      const check = await this.knex('User')
        .where({ id: user.userID, isDeleted: false }).first()
      if (check) {
        await this.knex('User')
          .where({ id: user.userID })
          .update({ description: user.description })
      }
    }
    return 'Success'
  }
}
