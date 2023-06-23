import {
  validate, utilCrypto
} from '../utility'
import { error } from '../constant'

export const validatePassword = (password) => {
  if (!validate.valid_string(password, 6, 18)) {
    throw error.PASSWORD_WRONG_FORMAT
  }
}

export const validateEmail = (email) => {
  if (!validate.email(email)) {
    throw error.USER.INVALID_USER_EMAIL
  }
}

export const getPassword = (password, salt) => {
  return utilCrypto.sha512(password + salt)
}
