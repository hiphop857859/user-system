/* eslint-disable no-useless-catch */
import Base from '../../Base'
import StaffService from '../../../service/staff/login'
import verifyCAPTCHA from '../../../helper/captcha.helper'
import { getRedisData, setRedisData } from '../../../db/configs/redis'
export default class extends Base {
  async action () {
    const param = this.getParam()
    await this._verifyCaptcha(param.recaptcha)
    const staffService = this.buildService(StaffService)
    const ip = this.req['clientIp']
    const turn = await getRedisData(`TURNS_LOGIN_${ip}`) || 0
    if (turn >= 5) {
      throw Error('MANY_REQUEST')
    }
    let rs
    try {
      rs = await staffService.login(param)
    } catch (ex) {
      if (turn !== 0) {
        setRedisData(`TURNS_LOGIN_${ip}`, JSON.stringify(+turn + 1), 5 * 60)
      } else {
        setRedisData(`TURNS_LOGIN_${ip}`, JSON.stringify(1), 5 * 60)
      }
      throw ex
    }
    return this.result(1, rs)
  }

  async _verifyCaptcha (recaptcha) {
    const recaptchaData = {
      // remoteip: process.env.RECAPTCHA_REMOTE_IP,
      response: recaptcha,
      secret: process.env.RECAPTCHA_SECRET_KEY
    }
    try {
      if (!(await verifyCAPTCHA(recaptchaData))) {
        throw Error('ForbiddenException')
      }
    } catch (ex) {
      console.error(ex);
      throw ex
    }
  }
}
