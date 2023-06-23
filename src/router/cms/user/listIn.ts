import Base from '../../Base'
import UserService from '../../../service/user/listIn'

export default class extends Base {
  needLogin = true
  async action () {
    const params = this.getParam()

    const userService = this.buildService(UserService)
    const rs = await userService.list(params)
    this.res.json({ code: 1, data: rs, message: 'ok' })
  }
}
