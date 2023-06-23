import { Recaptcha } from 'recaptcha-v2'

/**
 * Verify ReCaptcha
 * @param {Object} recaptchaData
 * @returns {Promise}
 */
export default (recaptchaData) => {
  return new Promise((resolve, reject) => {
    const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY, recaptchaData)
    recaptcha.verify((success, error_code) => {
      resolve(success)
    })
  })
}
