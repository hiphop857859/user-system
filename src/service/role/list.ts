import Base from '../Base'

export default class extends Base {
  public async list (param) {
    const {
      search
    } = param
    const system = this.currentUser.system
    const query = this.knex('Role').where({
      isDeleted: false
    })
      .where(function () {
        this.where({ system })
          .orWhere({ key: 'MASTER' })
      })

    if (search) {
      query.where(function () {
        this.orWhere('name', 'ilike', `%${search}%`)
      })
    }

    return query
      .select(
        'id',
        'name',
        'description',
        'isBlock'
      )
    // .paginate({
    //     perPage: limit,
    //     currentPage: page,
    //     isLengthAware: true
    // })
  }
}
