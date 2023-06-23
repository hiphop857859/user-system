import Base from '../../Base'
import RoleService from '../../../service/role/create'
import { type } from '../../../constant'

export default class extends Base {
    needLogin = true;
    needPermissions = [type.PERMISSION.CREATE_ROLE];

    async action () {
      const param = this.getParam()
      const roleService = this.buildService(RoleService)
      const rs = await roleService.create(param)
      return this.result(1, rs)
    }
}
