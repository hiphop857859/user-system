import * as FB from 'fb'

FB.options({
  appId: process.env.APP_FACEBOOK_ID,
  Promise: global.Promise
})

export default FB
