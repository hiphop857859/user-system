import Base from '../Base'
export default class extends Base {
  public async add (param) {
    const {
      deviceID,
      tokenFCM
    } = param
    // userID

    const tokenApp = await this.knex('TokenApp')
      .update({ tokenFCM })
      .where({
        deviceID,
        userID: this.currentUser.id
      })
    if (!tokenApp) {
      await this.knex('TokenApp').insert({
        deviceID,
        tokenFCM,
        userID: this.currentUser.id
      })
    }
    return 'SUCCESS'
  }
}
