import Base from '../Base'
import { deleteKey } from '../../db/configs/redis'
export default class extends Base {
  public async logout (param) {
    try {
      console.log('this.currentUser', this.currentUser)
      await deleteKey(`STAFF:${this.currentUser.id}:TOKEN:${this.currentUser.timeStart}`)
      return 'SUCCESS'
    } catch (e) {
      throw Error('ACCESS_DENIED')
    }
  }
}
