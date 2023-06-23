import Base from '../../Base'
import StaffService from '../../../service/staff/logout'

export default class extends Base {
  needLogin = true;
  async action () {
    const param = this.getParam()
    const staffService = this.buildService(StaffService)
    const rs = await staffService.logout(param)
    return this.result(1, rs)
  }
}
