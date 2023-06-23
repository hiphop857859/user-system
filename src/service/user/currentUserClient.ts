import Base from '../Base'
import { error } from '../../constant'

export default class extends Base {
  public async getCurrentUser (param) {
    const {
      id,
      eventID = -1
    } = param
    const checkUUID = await this.validateUUID([id])
    if (!checkUUID) {
      throw error.UUID.DATA_NOT_UUID_VALUE
    }
    const user = await this.knex('User')
      // .leftJoin('UserPoint', function () {
      //   this.on(knex.raw(`
      //                   public."User"."id" = public."UserPoint"."userID"
      //                   and public."UserPoint"."eventID" = ?
      //               `, [eventID]))
      // })
      .where({
        'User.id': id,
        'User.status': true,
        'User.isDeleted': false
      })
      .select({
        id: 'User.id',
        fullName: 'User.fullName',
        accountID: 'User.accountID',
        emailAcb: 'User.emailAcb',
        email: 'User.email',
        phone: 'User.phone',
        status: 'User.status',
        avatar: 'User.avatar',
        position: 'User.position',
        linkSocial: 'User.linkSocial',
        bio: 'User.bio',
        // point: knex.raw('coalesce(public."UserPoint"."point", 0)'),
        // pointBonus: knex.raw('coalesce(public."UserPoint"."bonusPoint", 0)'),
        documentCode: 'User.documentCode',
        qrCode: 'User.qrCode',
        balanceScoreCard: 'User.balanceScoreCard',
        birthday: 'User.birthday',
        workingDay: 'User.workingDay',
        unit: 'User.unit'
      })
      .first()

    if (!user) {
      throw error.USER.USER_NOT_FOUND
    }

    return user
  }
}
