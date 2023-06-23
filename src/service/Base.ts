
import knex from '../db/configs/db-connector'
export default class Base {
    protected currentUser;
    protected knex;

    constructor (user) {
      this.currentUser = user
      this.knex = knex
      this.init()
    }

    protected init () {
      if (typeof this.currentUser?.id === 'string') {
        // this.currentUser._id = new ObjectID(this.currentUser.id)
      }
    }

    public getDBModel (name: string) {
      return knex(name)
    }

    protected buildService<T extends Base> (service: { new(...args): T }): T {
      // eslint-disable-next-line new-cap
      return new service(this.knex)
    }

    public async validateUUID (uuids) {
      for (const id of uuids) {
        const s = '' + id
        const rs = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')
        if (rs === null) {
          return false
        }
      }
      return true
    }
}
