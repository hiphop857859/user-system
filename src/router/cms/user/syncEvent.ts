import Base from '../../Base'
import UserService from '../../../service/user/syncTalent'
export default class extends Base {
  async action () {
    const userService = this.buildService(UserService)
    const rs = await userService.syncEvent()

    return this.result(1, rs)
  }
}
