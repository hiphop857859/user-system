import Base from '../Base'

export default class extends Base {
  async list (params) {
    const {
      limit, page, search, ids
    } = params
    const query = this.knex('User')
      .where({ isDeleted: false })

    if (search) {
      query.where(function () {
        this.where('fullName', 'ilike', `%${search}%`)
          .orWhere('email', 'ilike', `%${search}%`)
          .orWhere('emailAcb', 'ilike', `%${search}%`)
          .orWhere('department', 'ilike', `%${search}%`)
          .orWhere('phone', 'ilike', `%${search}%`)
          .orWhere('position', 'ilike', `%${search}%`)
          .orWhere('accountID', 'ilike', `%${search}%`)
      })
    }
    return query
      .whereIn('id', ids.map(i => i.userID))
      .orderBy('createdAt', 'DESC')
      .select(
        'id', 'email', 'accountID', 'fullName', 'avatar', 'description',
        'phone', 'position', 'documentCode',
        'department', 'qrCode',
        'balanceScoreCard', 'emailAcb')
      .paginate({
        perPage: limit,
        currentPage: page,
        isLengthAware: true
      })
  }
}
