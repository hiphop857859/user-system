import * as knex from 'knex'
import { attachPaginate } from 'knex-paginate'
export default knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host: process.env.DB_URL,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: Boolean(process.env.DB_SSL),
    database: process.env.DB_NAME,
    typeCast: function (field, next) {
      console.log('field: ', field)
      if (field.type === 'JSON') {
        return (JSON.parse(field.string()))
      }
      return next()
    }
  }
})
attachPaginate()
require('../models')
