// tslint:disable:no-null-keyword
import Base from './Base'
import * as redis from 'redis'

interface IRemoveCache {
  module: string,
  detailID?: string, // dành cho xoá detail
  userID?: string[], // chỉ xoá cache của user
  detail?: boolean, // xoá detail
  list?: boolean, // xoá list
  onlyListOfUser?: boolean // chỉ xoá list cache của user đó
}

export default class extends Base {
  private redisListener;
  protected init () {
    const redisConfig = {
      host: process.env.REDIS_HOST,
      port: +(process.env.REDIS_PORT || 6380),
      password: process.env.REDIS_PASSWORD,
      tls: {
        servername: process.env.REDIS_HOST
      }
    }
    if (!process.env.REDIS_PASSWORD || process.env.REDIS_PASSWORD === '') {
      delete redisConfig.password
      delete redisConfig.tls
    }
    this.redisListener = redis.createClient(redisConfig)
  }

  // /**
  //  * @param type: @type {IRemoveCache}
  //  */
  removeCache (param: IRemoveCache) {
    // eslint-disable-next-line no-unused-vars
    // const articleModule = [
    //   CREATE_ARTICLE, // list
    //   UPDATE_ARTICLE, // list, detail
    //   DELETE_ARTICLE // list, detail
    // ]

    const module = param.module
    this.redisListener.keys('*', (err, allKeys) => {
      if (err) return console.log(err)

      if (param.list) {
        const filterKey = `${module}/list`
        const list = allKeys.filter(e => e.includes(filterKey))

        for (const key of list) {
          this.redisListener.del(key)
        }
      }

      if (param.detail) {
        const filterKey = `${module}/detail`
        const list = allKeys.filter(e => e.includes(filterKey))
        const key = list.find(e => e.includes(param.detailID))

        if (key) {
          // remove cache
          this.redisListener.del(key)
        }
      }

      if (param.onlyListOfUser) {
        const filterKey = `${module}/list`
        const list = allKeys.filter(e => e.includes(filterKey))

        for (const userID of param.userID) {
          const key = list.find(e => e.includes(userID))

          if (key) {
            // remove cache
            this.redisListener.del(key)
          }
        }
      }
    })
  }

  removeAllCache () {
    // redis.createClient(): must create new instance for publishing "flushdb" event
    redis.createClient().flushdb(() => {
      console.log('All cache have been removed !!!')
    })
  }
}
