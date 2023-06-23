/* eslint-disable dot-notation */
import Base from '../Base'
import UserService from '../../service/user/login'

export default class extends Base {
  /**
     * The API token only encrypts stores the userId, on a request we always query the full user, nothing else
     * passed from the client is trusted.
     *
     * Since we encrypt with the APP_SECRET on the server side we trust that
     *
     * @returns {Promise<{code: number; data: any; message: string} | {code: number; type: string; error: string}>}
     */
  async action () {
    const param = this.getParam()
    const userService = this.buildService(UserService)
    const rs = await userService.login(param)
    return this.result(1, rs)
  }
}
