import Base from '../../Base'
import UserService from '../../../service/user/update'
import RedisService from '../../../service/RedisService'
import { type } from '../../../constant'
export default class extends Base {
  needLogin = true
  needPermissions = [type.PERMISSION.UPDATE_USER]
  async action () {
    const params = this.getParam()
    const userService = this.buildService(UserService)
    const redisService = this.buildService(RedisService)
    redisService.removeCache({
      module: type.CACHE_MODULE.USER,
      list: true
    })
    const rs = await userService.update(params)
    return this.result(1, rs)
  }
}
