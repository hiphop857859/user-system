import Base from '../Base'
import { type } from '../../constant'
export default class extends Base {
  public async full (param) {
    const system = this.currentUser.system
    if (system) {
      if (system === 'LMS') {
        return type.FULL_ROLE_LMS
      }
      if (system === 'EVENT') {
        return type.FULL_ROLE_EVENT
      }
      if (system === 'TALENT') {
        return type.FULL_ROLE_TALENT
      }
    }
    return null
  }
}
