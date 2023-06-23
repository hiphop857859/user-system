import knex from '../configs/db-connector'
import { getRandomSalt, utilCrypto } from '../../utility'
// Model

import UserModel from './user.model'
import LogModel from './log.model'
import TokenApp from './tokenApp.model'
import Staff from './staff.model'
import Role from './role.model'
// Init model

const user = new UserModel('User')
const log = new LogModel('Log')
const tokenApp = new TokenApp('TokenApp')
const staff = new Staff('Staff')
const role = new Role('Role')
const arrayModel = [
  user,
  log,
  tokenApp,
  staff,
  role
];

(async function () {
  for (const model of arrayModel) {
    const result = await knex.schema.hasTable(model.tableName)
    if (!result) {
      await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"') // NOSONAR
      await knex.schema.createTable(model.tableName, model.initTable.bind(model)) // NOSONAR
    }
  }

  console.log('CREATE_DB_SUCCESSFULLY')
  const countAdmin = await knex('Staff').count('* as count').first() // NOSONAR
  const countRole = await knex('Role').count('* as count').first() // NOSONAR

  if (+countRole.count === 0) {
    await knex('Role').insert({ name: 'MASTER', key: 'MASTER', permissions: JSON.stringify(['FULL']), isBlock: true })// NOSONAR
  }

  if (+countAdmin.count === 0) {
    let salt
    while (1) {
      salt = getRandomSalt()
      const isExistedSalt = await knex('Staff').where({ salt }).first() // NOSONAR
      if (!isExistedSalt) {
        break
      }
    }

    const password = getPassword(process.env.ADMIN_PASSWORD, salt)
    const role = await knex('Role').where({ key: 'MASTER' }).first() // NOSONAR

    await knex('Staff').insert({ fullName: 'Admin', email: 'admin@wejelly.com', phone: '', type: 'ADMIN', role: role?.id || 1, status: true, password, salt })// NOSONAR
  }
})()
function getPassword (password, salt) {
  return utilCrypto.sha512(password + salt)
}
