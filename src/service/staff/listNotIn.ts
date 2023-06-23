import Base from '../Base'
export default class extends Base {
  public async list (params) {
    const { page, limit, search, system, ids } = params

    return this.knex('Staff')
      .where('fullName', 'ilike', `%${search}%`)
      .where(function () {
        this.where({ 'Staff.system': system })
          .orWhere({ 'Staff.type': 'ADMIN' })
      })
      .whereNotIn('id', ids.map(i => i.staffID))
      .select(
        'id',
        'fullName',
        'email',
        'phone',
        'avatar'
      )
      .paginate({
        perPage: limit,
        currentPage: page,
        isLengthAware: true
      })
  }
}
