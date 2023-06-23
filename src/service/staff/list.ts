import Base from '../Base'
export default class extends Base {
  public async list (params) {
    const { perPage, currentPage, search, system } = params
    const maxrow = perPage ? +perPage : 10
    const pageIndex = currentPage ? +currentPage : 1
    const query = search || ''
    const systems = (system) || this.currentUser.system
    return this.knex('Staff')
      .leftJoin('Role', 'Role.id', 'Staff.role')
      .where('Staff.isDeleted', '=', 'false')
      .andWhere(function () {
        this.orWhere('Staff.fullName', 'ilike', `%${query}%`)
          .orWhere('Staff.email', 'ilike', `%${query}%`)
          .orWhere('Staff.phone', 'ilike', `%${query}%`)
      })
      .whereNot('Staff.email', 'admin@wejelly.com')
      .where(function () {
        this.where({ 'Staff.system': systems })
          .orWhere({ 'Staff.type': 'ADMIN' })
      })
      .orderBy('Staff.id', 'DESC')
      .select('Staff.id', 'Staff.fullName', 'Staff.phone', 'Staff.email', 'Role.name as roleName', 'Staff.avatar')
      .paginate({
        perPage: maxrow,
        currentPage: pageIndex,
        isLengthAware: true
      })
  }
}
