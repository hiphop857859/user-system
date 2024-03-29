export const UNIT = {
  RET: 'RET',
  BTC: 'BTC'
}

export const USER_ACTION = {

  REGISTER: 'USER_REGISTER',
  VERIFY: 'USER_VERIFY',
  NEW_CHILD: 'USER_NEW_CHILD',
  UPDATE: {
    PASSWORD: 'USER_UPDATE_PASSWORD',
    ADDRESS: {
      RET: 'USER_UPDATE_ADDRESS_RET',
      BTC: 'USER_UPDATE_ADDRESS_BTC'
    }
  },

  TRANSFER: 'USER_TRANSFER',
  PURCHASE_CREATE: 'USER_PURCHASE_CREATE',
  PURCHASE_SUCCESS: 'USER_PURCHASE_SUCCESS',
  COMMISSION: 'USER_COMMISSION',
  WITHDRAW_CREATE: 'USER_WITHDRAW_CREATE',
  WITHDRAW_SUCCESS: 'USER_WITHDRAW_SUCCESS'
}

export const ADMIN_ACTION = {
  CREATE_ADMIN: 'CREATE_ADMIN',
  CREATE_ROLE: 'CREATE_ROLE',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  DELETE_ROLE: 'DELETE_ROLE',
  UPDATE_ADMIN_ROLES: 'UPDATE_ADMIN_ROLES',
  UPDATE_ROLE: 'UPDATE_ROLE',
  VERIFY_USER: 'VERIFY_USER',
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY'
}

export const ADMIN_TYPE_ACTION = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  IMPORT: 'IMPORT',
  EXPORT: 'EXPORT'
}
