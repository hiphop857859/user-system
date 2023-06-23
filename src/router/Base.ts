import { Response, Request, Router } from 'express'
import * as _ from 'lodash'
import Service from '../service/Base'
import knex from '../db/configs/db-connector'
import { type, error } from '../constant'
import { isSubArray } from '../utility'
import { getRedisClient } from '../db/configs/redis'
const redis = require('redis')
interface RESULT {
    code: number;
    data?: any;
    error?: Error;
    message?: string;
}

interface ROUTEING {
    path: string;
    router: any;
    method: string;
    timeout?: number;
}

export default abstract class {
  static setRouter (list: ROUTEING[]): Router {
    const router = Router()
    _.each(list, (item) => {
      // this runs on init

      // this sets the callback for router.[method]
      router[item.method](item.path, (req, res) => {
        // this block is the callback
        // for the file upload - we remove any timeout
        // eslint-disable-next-line new-cap
        const c = new item.router(req, res)
        return c.main()
      })
    })
    return router
  }

    protected req: Request;
    protected res: Response;
    protected currentUser: any;

    protected needLogin = false;
    protected needAdmin = false;
    protected knex;
    protected needPermissions = [];
    protected redisClient;
    constructor (req, res) {
      this.req = req
      this.res = res
      this.knex = knex
      this.currentUser = req.currentUser
      this.redisClient = getRedisClient()
      this.init()
    }

    protected init () {} // NOSONAR

    public async main (): Promise<any> {
      try {
        if (!await this.validate()) {
          return this.result(-1, { code: 401, message: 'Please login' })
        }
        // validate permissions
        await this.validatePermissons()

        const result = await this.action()
        if (result) {
          this.res.set('Content-Type', 'application/json')
          this.res.json(result)
        }
      } catch (e) {
        process.env.NODE_ENV === 'dev' && console.error(e)
        if (e === error.UNAUTHORIZED) {
          return this.res.json(this.result(-99, {
            name: error.UNAUTHORIZED,
            message: error.UNAUTHORIZED
          }))
        }

        if (e === error.ACCESS_DENIED) {
          return this.res.json(this.result(-100, {
            name: error.ACCESS_DENIED,
            message: error.ACCESS_DENIED
          }))
        }
        this.res.json(this.result(-1, e))
      }
    }

    private async validate () {
      // check need login or not
      if (this.needLogin) {
        if (!this.currentUser) {
          this.res.json(this.result(-100, {
            name: error.ACCESS_DENIED,
            message: error.ACCESS_DENIED
          }))
          return false
        }
      }

      if (this.needAdmin) {
        if (!this.currentUser) {
          this.res.json(this.result(-100, {
            name: error.ACCESS_DENIED,
            message: error.ACCESS_DENIED
          }))
          return false
        }

        if (this.currentUser.type !== 'ADMIN') {
          this.res.json(this.result(-99, {
            name: error.UNAUTHORIZED,
            message: error.UNAUTHORIZED
          }))
          return false
        }
      }

      return true
    }

    // need to override
    abstract async action();

    protected result (code, dataOrError, msg?) {
      const opts: RESULT = {
        code,
        data: dataOrError,
        error: dataOrError,
        message: msg
      }
      if (opts.code === -2) {
        return {
          query: opts.data,
          message: opts.message || 'query'
        }
      }
      if (opts.code > 0) {
        return {
          code: opts.code,
          data: opts.data,
          message: opts.message || 'ok'
        }
      } else {
        const err = opts.error
        return {
          // eslint-disable-next-line dot-notation
          code: err['code'] ? -err['code'] : opts.code,
          type: err.name || '',
          error: err.message || err.toString()
        }
      }
    }

    /*
    * get service
    * */
    protected buildService<T extends Service> (service: { new(...args): T }): T {
      // eslint-disable-next-line new-cap
      return new service(this.currentUser)
    }

    protected getParam (key?: string): any {
      const param = _.extend({}, this.req.query, this.req.body, this.req.params)
      return key ? _.get(param, key, '') : param
    }

    public getApiKey (): any {
      if (!this.req.headers['api-key']) {
        this.res.sendStatus(403)
        return false
      }
      return this.req.headers['api-key']
    }

    public getDBModel (name: string) {
      return knex(name)
    }

    public async validatePermissons () {
      const errMsg = error.UNAUTHORIZED

      if (!this.needPermissions.length) {
        return true
      }

      if (!this.currentUser) {
        throw error.ACCESS_DENIED
      }

      if (this.currentUser.type === 'ADMIN') {
        return true
      }

      const staff = await this.knex('Staff')
        .leftJoin('Role', function () {
          this.on(knex.raw(`
                    public."Staff"."role" = public."Role"."id"
                    and public."Role"."isDeleted" = ?
                `, [false]))
        })
        .select({
          id: 'Staff.id',
          fullName: 'Staff.fullName',
          role: 'Role.permissions'
        })
        .where({
          'Staff.id': this.currentUser.id,
          type: 'STAFF'
        })
        .first()

      const roles = staff?.role ? JSON.parse(staff?.role) : []
      if (!roles || roles.length === 0) {
        throw errMsg
      }

      if (
        !roles.includes(type.PERMISSION.FULL) &&
            !isSubArray(this.needPermissions, roles)
      ) {
        throw errMsg
      }

      return true
    }
}
