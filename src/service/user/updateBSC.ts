import Base from '../Base'
import { sendQueue } from '../../helper/amqp.helper'
import { error } from '../../constant'
export default class extends Base {
  async update (params) {
    const { list } = params
    for (const item of list) {
      const check = await this.knex('User')
        .where({ emailAcb: item.email, isDeleted: false }).first()
      if (check) {
        this.updateBSC({
          id: check.id, balanceScoreCard: item.balanceScoreCard, user: check
        })
      }
    }
    return 'Success'
  }

  async updateBSC (params) {
    const { id, balanceScoreCard, user } = params
    const checkUUID = await this.validateUUID([id])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    await this.knex('User')
      .where({ id })
      .update({ balanceScoreCard })
    const data = {
      type: 'UPDATE_BSC',
      title: 'Điểm BSC đã cập nhật',
      content: 'Điểm Balance Score Card của bạn đã được cập nhật',
      detail: JSON.stringify(user),
      userID: id
    }
    sendQueue({
      key: 'NOTI_TALENT',
      data
    })
  }
}
