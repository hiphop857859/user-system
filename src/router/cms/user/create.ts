import Base from '../../Base'
import UserService from '../../../service/user/create'
import RedisService from '../../../service/RedisService'
import { type } from '../../../constant'
export default class extends Base {
  needLogin = true;
  needPermissions = [type.PERMISSION.CREATE_USER]
  async action () {
    const params = this.getParam()
    const userService = this.buildService(UserService)
    const rs = await userService.create(params)
    const redisService = this.buildService(RedisService)
    redisService.removeCache({
      module: type.CACHE_MODULE.USER,
      list: true
    })
    return this.result(1, rs)
  }
}
