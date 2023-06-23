import * as _ from 'lodash'
import * as validator from 'validator'
import { ObjectId } from 'bson'

const validate = {
  email (email) {
    return validator.isEmail(email)
  },

  valid_string (str, min, max = 8192) {
    if (!str || !_.isString(str)) return false
    const len = str.length
    if (len < min) return false
    if (len > max) return false

    return true
  },

  valid_number (number, min, max) {
    if (number < min) return false
    if (number > max) return false
    return true
  },

  valid_object_id (id) {
    return ObjectId.isValid(id)
  }
}

export default validate
