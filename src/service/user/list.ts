import Base from '../Base'

export default class extends Base {
  public async list (param) {
    let { search, page, limit } = param
    page = page > 0 ? +page : 1
    limit = limit > 0 ? +limit : 10
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
      .select(
        {
          id: 'id',
          fullName: 'fullName',
          avatar: 'avatar',
          phone: 'phone',
          accountID: 'accountID',
          email: 'email',
          emailAcb: 'emailAcb',
          documentCode: 'documentCode',
          position: 'position',
          balanceScoreCard: 'balanceScoreCard',
          department: 'department',
          birthday: 'birthday',
          workingDay: 'workingDay',
          qrCode: 'qrCode'
        })
      .orderBy('id', 'DESC')
      .paginate({
        perPage: limit,
        currentPage: page,
        isLengthAware: true
      })
  }
}
