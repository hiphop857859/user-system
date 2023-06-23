import Base from '../../Base'

export default class extends Base {
    needLogin = true;

    async action () {
      const result = {
        id: this.currentUser.id,
        fullName: this.currentUser.fullName,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        type: this.currentUser.type,
        role: this.currentUser.role,
        avatar: this.currentUser.avatar
      }
      return this.result(1, result)
    }
}
