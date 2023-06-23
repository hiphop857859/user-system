import Base from '../Base'
import { error } from '../../constant'
import { sendQueue } from '../../helper/amqp.helper'
export default class extends Base {
  public async delete (param) {
    const {
      id
    } = param
    const checkUUID = await this.validateUUID([id])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    const checkUser = await this.knex('User').where({ id }).first()
    if (!checkUser) {
      throw error.USER.USER_NOT_FOUND
    }
    await sendQueue({
      key: 'DELETE_USER_TALENT',
      data: id
    })
    await sendQueue({
      key: 'DELETE_USER_ACTIVITY',
      data: id
    })
    await sendQueue({
      key: 'DELETE_USER_EVENT',
      data: id
    })
    return this.knex('User').where({ id, isDeleted: false }).del()
  }
}
