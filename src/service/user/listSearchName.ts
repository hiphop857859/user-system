import Base from '../Base'

export default class extends Base {
  async list (params) {
    const { page, limit, search } = params
    const query = this.knex('User')
      .where({ isDeleted: false })
    if (search && search !== '') {
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
      .select('id', 'fullName', 'avatar')
      .orderBy('createdAt', 'desc')
      .paginate({
        perPage: limit,
        currentPage: page,
        isLengthAware: true
      })
  }
}
