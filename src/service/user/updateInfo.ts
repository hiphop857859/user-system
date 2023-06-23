import Base from '../Base'
import { sendQueue } from '../../helper/amqp.helper'
export default class extends Base {
  public async updateInfo (param) {
    const {
      avatar
    } = param
    const data = { avatar }
    await this.knex('User').where({ id: this.currentUser.id, isDeleted: false }).update(data)
    this.sync(data, this.currentUser.id)
    return 'Success'
  }

  async sync (data, id) {
    const newData = {
      ...data,
      id
    }
    await sendQueue({
      key: 'SYNC_USER_TALENT',
      data: [newData]
    })
    await sendQueue({
      key: 'SYNC_USER_ACTIVITY',
      data: [newData]
    })
    await sendQueue({
      key: 'SYNC_USER_EVENT',
      data: [newData]
    })
  }
}
