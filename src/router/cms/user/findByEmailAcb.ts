import Base from '../../Base'
import UserService from '../../../service/user/detail'

export default class extends Base {
  needLogin = true
  async action () {
    const params = this.getParam()
    const userService = this.buildService(UserService)
    const rs = await userService.findByEmailAcb(params)
    return this.result(1, rs)
  }
}
