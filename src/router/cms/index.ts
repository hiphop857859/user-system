import Base from '../Base'
// Staff
import staffLogin from '../cms/staff/login'
import staffLogout from '../cms/staff/logout'
import createStaff from './staff/create'
import updateStaff from './staff/update'
import listStaff from './staff/list'
import deleteStaff from './staff/delete'
import singleStaff from './staff/detail'
import currentStaff from './staff/currentStaff'
import getAdmin from './staff/getAdmin'
import listStaffIn from './staff/listIn'
import listStaffNotIn from './staff/listNotIn'
// Role
import createRole from './role/create'
import updateRole from './role/update'
import listRole from './role/list'
import detailRole from './role/detail'
import deleteRole from './role/delete'
import fullRole from './role/full'

// User
import createUser from './user/create'
import listUser from './user/list'
import updateUser from './user/update'
import detailUser from './user/detail'
import deleteUser from './user/delete'
import findUserByEmailAcb from './user/findByEmailAcb'
import findUserByEmail from './user/findByEmail'
import listUserNotIn from './user/listNotIn'
import findByQrCode from './user/findByQrCode'
import listIn from './user/listIn'
import importUser from './user/import'
import detailToken from './user/detailToken'
import updateDescription from './user/updateDescription'
import updateBSC from './user/updateBSC'
import importBSC from './user/importBSC'
import listSearchName from './user/listSearchName'
import syncTalent from './user/syncTalent'
import syncActivity from './user/syncActivity'
import listUserByEmail from './user/get-list-user-by-email'
import syncEvent from './user/syncEvent'
export default Base.setRouter([

  {
    path: '/staff/login',
    router: staffLogin,
    method: 'post'
  },
  {
    path: '/staff/logout',
    router: staffLogout,
    method: 'post'
  },
  {
    path: '/staff/list',
    router: listStaff,
    method: 'get'
  },
  {
    path: '/staff/detail/:id',
    router: singleStaff,
    method: 'get'
  },
  {
    path: '/staff/create',
    router: createStaff,
    method: 'post'
  },
  {
    path: '/staff/update/:id',
    router: updateStaff,
    method: 'put'
  },
  {
    path: '/staff/delete/:id',
    router: deleteStaff,
    method: 'delete'
  },
  {
    path: '/staff/current-staff',
    router: currentStaff,
    method: 'get'
  },
  {
    path: '/staff/get-admin',
    router: getAdmin,
    method: 'get'
  },
  {
    path: '/staff/list-in',
    router: listStaffIn,
    method: 'post'
  },
  {
    path: '/staff/list-not-in',
    router: listStaffNotIn,
    method: 'post'
  },
  // Role
  {
    path: '/role/create',
    router: createRole,
    method: 'post'
  },
  {
    path: '/role/update/:roleID',
    router: updateRole,
    method: 'put'
  },
  {
    path: '/role/list',
    router: listRole,
    method: 'get'
  },
  {
    path: '/role/detail/:roleID',
    router: detailRole,
    method: 'get'
  },
  {
    path: '/role/delete/:roleID',
    router: deleteRole,
    method: 'delete'
  },
  {
    path: '/role/full',
    router: fullRole,
    method: 'get'
  },
  // User
  {
    path: '/user/create',
    router: createUser,
    method: 'post'
  },
  {
    path: '/user/update/:id',
    router: updateUser,
    method: 'put'
  },
  {
    path: '/user/delete/:id',
    router: deleteUser,
    method: 'delete'
  },
  {
    path: '/user/detail/:id',
    router: detailUser,
    method: 'get'
  },
  {
    path: '/user/list',
    router: listUser,
    method: 'get'
  },
  {
    path: '/user/find-by-emailacb',
    router: findUserByEmailAcb,
    method: 'get'
  },
  {
    path: '/user/find-by-email',
    router: findUserByEmail,
    method: 'get'
  },
  {
    path: '/user/list-user-by-emailacb',
    router: listUserByEmail,
    method: 'post'
  },
  {
    path: '/user/list-not-in',
    router: listUserNotIn,
    method: 'post'
  },
  {
    path: '/user/find-by-qrcode',
    router: findByQrCode,
    method: 'post'
  },
  {
    path: '/user/list-in',
    router: listIn,
    method: 'post'
  },
  {
    path: '/user/find-by-qrcode',
    router: findByQrCode,
    method: 'get'
  },
  {
    path: '/user/import',
    router: importUser,
    method: 'post'
  },
  {
    path: '/user/detail-tokenapp/:id',
    router: detailToken,
    method: 'get'
  },
  {
    path: '/user/update-description',
    router: updateDescription,
    method: 'put'
  },
  {
    path: '/user/update-bsc',
    router: updateBSC,
    method: 'put'
  },
  {
    path: '/user/import-bsc',
    router: importBSC,
    method: 'post'
  },
  {
    path: '/user/list-search-name',
    router: listSearchName,
    method: 'get'
  },
  {
    path: '/user/sync-talent',
    router: syncTalent,
    method: 'get'
  },
  {
    path: '/user/sync-activity',
    router: syncActivity,
    method: 'get'
  },
  {
    path: '/user/sync-event',
    router: syncEvent,
    method: 'get'
  }
])
