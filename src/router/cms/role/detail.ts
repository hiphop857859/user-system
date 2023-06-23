import Base from '../../Base'
import RoleService from '../../../service/role/detail'

export default class extends Base {
    needLogin = true;
    async action () {
      const param = this.getParam()
      const roleService = this.buildService(RoleService)
      const rs = await roleService.detail(param)
      return this.result(1, rs)
    }
}
