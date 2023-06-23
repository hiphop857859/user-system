import Base from '../../Base'
import StaffService from '../../../service/staff/detail'

export default class extends Base {
  async action () {
    const staffService = this.buildService(StaffService)
    const rs = await staffService.getAdmin()

    return this.result(1, rs)
  }
}
