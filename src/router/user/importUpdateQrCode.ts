import Base from '../Base'
import UserService from '../../service/user/importUpdateQRCode'
import RedisService from '../../service/RedisService'
import { type } from '../../constant'
export default class extends Base {
  async action () {
    let param = this.getParam()
    // eslint-disable-next-line dot-notation
    param = { ...param, ...this.req['files'] }
    param.req = this.req
    const userService = this.buildService(UserService)
    // eslint-disable-next-line node/handle-callback-err
    const redisService = this.buildService(RedisService)
    redisService.removeCache({
      module: type.CACHE_MODULE.USER,
      list: true
    })
    const rs = await userService.import(param)
    return this.result(1, rs)
  }
}
