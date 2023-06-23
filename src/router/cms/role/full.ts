import Base from '../../Base'
import RoleService from '../../../service/role/fullRole'

export default class extends Base {
  async action () {
    const param = this.getParam()
    const roleService = this.buildService(RoleService)
    const rs = await roleService.full(param)
    return this.result(1, rs)
  }
}
