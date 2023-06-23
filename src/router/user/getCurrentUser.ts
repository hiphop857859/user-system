import Base from '../Base'
import UserService from '../../service/user/currentUserClient'

export default class extends Base {
    needLogin = true;
    async action () {
      const params = this.getParam()
      const userService = this.buildService(UserService)
      const rs = await userService.getCurrentUser({
        id: this.currentUser.id,
        eventID: params.eventID
      })
      return this.result(1, rs)
    }
}
