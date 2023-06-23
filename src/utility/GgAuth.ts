import { OAuth2Client } from 'google-auth-library'

const GgAuth = new OAuth2Client(process.env.APP_GOOGLE_ID)

export default GgAuth
