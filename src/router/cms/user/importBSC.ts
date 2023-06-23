import Base from '../../Base'
import UserService from '../../../service/user/importBSC'

export default class extends Base {
  needLogin = true
  async action () {
    let param = this.getParam()
    // eslint-disable-next-line dot-notation
    param = { ...param, ...this.req['files'] }
    const userService = this.buildService(UserService)
    // eslint-disable-next-line node/handle-callback-err
    const rs = await userService.import(param)
    return this.result(1, rs)
  }
}
