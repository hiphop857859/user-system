import Base from '../../Base'
import UserService from '../../../service/user/list'
import { type } from '../../../constant'
export default class extends Base {
  needLogin = true
  needPermissions = [type.PERMISSION.READ_USER]
  async action () {
    const params = this.getParam()
    // const key = `${req.originalUrl}`
    // if (+params.page === 1) {
    //   this.redisClient.get(key, async (_err, data) => {
    //     if (data) {
    //       this.res.json({ code: 1, data: JSON.parse(data), message: 'ok' })
    //     } else {
    //       const userService = this.buildService(UserService)
    //       const rs = await userService.list(params)
    //       this.redisClient.setex(key, 3600 * 24, JSON.stringify(rs))
    //       this.res.json({ code: 1, data: rs, message: 'ok' })
    //     }
    //   })
    // } else {
      const userService = this.buildService(UserService)
      const rs = await userService.list(params)
      this.res.json({ code: 1, data: rs, message: 'ok' })
    // }
  }
}
