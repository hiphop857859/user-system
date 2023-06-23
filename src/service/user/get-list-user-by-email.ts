import Base from '../Base'
export default class extends Base {
  public async listUser (param) {
    const { emailACBs } = param
    return this.knex('User').whereIn('emailAcb', emailACBs).select('id', 'fullName', 'accountID', 'accountMsID', 'emailAcb', 'phone')
  }
}
