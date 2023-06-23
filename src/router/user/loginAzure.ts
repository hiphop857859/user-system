import Base from '../Base'
const passport = require('passport')
export default class extends Base {
  async action () {
    passport.authenticate('microsoft')
  }
}
