import Base from '../../Base'
import StaffService from '../../../service/staff/update'
import { type } from '../../../constant'

export default class extends Base {
    needLogin = true;
    needPermissions = [type.PERMISSION.UPDATE_STAFF];

    async action () {
      const param = this.getParam()
      const staffService = this.buildService(StaffService)
      const rs = await staffService.update(param)

      return this.result(1, rs)
    }
}
