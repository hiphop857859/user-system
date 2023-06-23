import Base from '../Base'
import { deleteKey } from '../../db/configs/redis'
export default class extends Base {
  public async logout (param) {
    try {
      await deleteKey(`USER:${this.currentUser.id}:TOKEN`)
      return 'SUCCESS'
    } catch (e) {
      throw Error('ACCESS_DENIED')
    }
  }
}
