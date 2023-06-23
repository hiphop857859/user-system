import Base from '../../Base'
import UserService from '../../../service/user/detail'

export default class extends Base {
  needLogin = true
  async action () {
    const params = this.getParam()
    const req = this.req
    const userService = this.buildService(UserService)
    const key = `${req.originalUrl}`
    // eslint-disable-next-line node/handle-callback-err
    this.redisClient.get(key, async (err, data) => {
      if (data) {
        this.res.json({ code: 1, data: JSON.parse(data), message: 'ok' })
      } else {
        try {
          const rs = await userService.findByQrCode(params)
          this.redisClient.setex(key, 86400, JSON.stringify(rs))
          this.res.json({ code: 1, data: rs, message: 'ok' })
        } catch (err2) {
          return this.res.json({ code: -1, error: err2 })
        }
      }
    })
  }
}
