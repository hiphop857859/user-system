import Base from '../Base'
import UserService from '../../service/user/logout'

export default class extends Base {
  needLogin = true;
  async action () {
    const param = this.getParam()
    const userService = this.buildService(UserService)
    const rs = await userService.logout(param)
    // this.req.logout()
    this.res.clearCookie('api-token', { domain: process.env.DOMAIN_ALL, httpOnly: false })
    this.res.clearCookie('current_user', { domain: process.env.DOMAIN_ALL, httpOnly: false })
    this.res.clearCookie('avatar', { domain: process.env.DOMAIN_ALL, httpOnly: false })
    this.res.clearCookie('type-login', { domain: process.env.DOMAIN_ALL, httpOnly: false })
    return this.result(1, rs)
  }
}
