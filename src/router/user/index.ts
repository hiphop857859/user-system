import Base from '../Base'
import login from './login'
import logout from './logout'
import currenUser from './getCurrentUser'
import addTokenApp from './addTokenApp'
import updateInfo from './updateInfo'
import importUpdateQrCode from './importUpdateQrCode'
export default Base.setRouter([
  {
    path: '/login',
    router: login,
    method: 'post'
  },
  {
    path: '/logout',
    router: logout,
    method: 'get'
  },
  {
    path: '/currenUser',
    router: currenUser,
    method: 'get'
  },
  {
    path: '/add-token-app',
    router: addTokenApp,
    method: 'post'
  },
  {
    path: '/update-info',
    router: updateInfo,
    method: 'put'
  },
  {
    path: '/import-update-qrcode',
    router: importUpdateQrCode,
    method: 'post'
  }
])
