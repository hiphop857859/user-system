import Base from '../Base'
import { sendQueue } from '../../helper/amqp.helper'
export default class extends Base {
  async sync () {
    const users = await this.knex('User')
      .where({ isDeleted: false })
    let i = 0
    while (1) {
      if (i >= users.length) {
        break
      }
      const data = users.slice(i, i + 100)
      await sendQueue({
        key: 'SYNC_USER_TALENT',
        data
      })
      i = i + 100
    }
    return 'Success'
  }

  async syncActivity () {
    const users = await this.knex('User')
      .where({ isDeleted: false })
    let i = 0
    while (1) {
      if (i >= users.length) {
        break
      }
      const data = users.slice(i, i + 100)
      await sendQueue({
        key: 'SYNC_USER_ACTIVITY',
        data
      })
      i = i + 100
    }
    return 'Success'
  }

  async syncEvent () {
    const users = await this.knex('User')
      .where({ isDeleted: false })
    let i = 0
    while (1) {
      if (i >= users.length) {
        break
      }
      const data = users.slice(i, i + 100)
      await sendQueue({
        key: 'SYNC_USER_EVENT',
        data
      })
      i = i + 100
    }
    return 'Success'
  }
}
