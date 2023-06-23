import Base from '../../Base'
import StaffService from '../../../service/staff/list'
import { type } from '../../../constant'

export default class extends Base {
    needLogin = true;
    needPermissions = [type.PERMISSION.READ_STAFF];

    async action () {
      const param = this.getParam()
      const staffService = this.buildService(StaffService)
      const rs = await staffService.list(param)

      return this.result(1, rs)
    }
}
