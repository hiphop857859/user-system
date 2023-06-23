import utilCrypto from './crypto'

import validate from './validate'
import sso from './sso'
import FbAuth from './facebook'
import GgAuth from './GgAuth'
const random = require('random')
const RE = require('re2')
export {
  utilCrypto,
  sso,
  validate,
  FbAuth,
  GgAuth

}
export const getEnv = () => process.env.NODE_ENV

export const isSubArray = (sub, master) => {
  // console.log('isSubArr', sub, master)
  if (!Array.isArray(sub)) return false
  if (sub.length === 0) return true
  return sub.every(elem => master.indexOf(elem) > -1)
}

export const min = (a, b) => {
  return a > b ? b : a
}
export const getRandomSalt = (length = 8): string => {
  let salt = ''
  const charList = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789'
  for (let i = 0; i < length; i++) { salt += charList.charAt(Math.floor(random.float(0.1, 1) * charList.length)) }

  return salt
}

export const slugVer2 = (strSlug) => {
  if (strSlug === undefined || strSlug === '') {
    return ''
  } else {
    let slug = strSlug.toLowerCase()

    // Chuyển Ký Tự Có Dấu Thành Không Dấu
    slug = new RE(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g).replace(slug, 'a') // NOSONAR
    slug = new RE(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g).replace(slug, 'e') // NOSONAR
    slug = new RE(/ì|í|ị|ỉ|ĩ/g).replace(slug, 'i') // NOSONAR
    slug = new RE(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g).replace(slug, 'o') // NOSONAR
    slug = new RE(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g).replace(slug, 'u') // NOSONAR
    slug = new RE(/ỳ|ý|ỵ|ỷ|ỹ/g).replace(slug, 'y') // NOSONAR
    slug = new RE(/đ/g).replace(slug, 'd') // NOSONAR

    // Xóa Ký Tự Đặc Biệt
    // eslint-disable-next-line no-useless-escape
    slug = new RE(/[^a-zA-Z0-9]/g).replace(slug, '')
    // Đổi Khoảng Trằng Thành -
    slug = slug.replace(/ /gi, '-')

    // Phòng Trường Hợp Khách Hàng Nhập Nhiều Ký Tự Khoảng Trống
    // eslint-disable-next-line no-useless-escape
    slug = slug.replace(/\-{2,}/gi, '-')

    // Xóa Các Ký Tự Gạch Ngang Ở Đầu Và Cuối
    slug = '@' + slug + '@'
    // eslint-disable-next-line no-useless-escape
    slug = slug.replace(/\@\-|\-\@|\@/gi, '')

    return slug
  }
}
