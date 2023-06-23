import Base from '../../Base'
import RoleService from '../../../service/role/delete'
import { type } from '../../../constant'

export default class extends Base {
    needLogin = true;
    needPermissions = [type.PERMISSION.DELETE_ROLE];

    async action () {
      const param = this.getParam()
      const roleService = this.buildService(RoleService)
      const rs = await roleService.delete(param)
      return this.result(1, rs)
    }
}
