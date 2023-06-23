import Base from '../../Base'
import UserService from '../../../service/user/detail'
import { type } from '../../../constant'
export default class extends Base {
  needLogin = true
  needPermissions = [type.PERMISSION.READ_USER]
  async action () {
    const params = this.getParam()
    const userService = this.buildService(UserService)
    const rs = await userService.detail(params)
    return this.result(1, rs)
  }
}
