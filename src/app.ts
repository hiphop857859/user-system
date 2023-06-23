import './config'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as timeout from 'connect-timeout'
import * as cors from 'cors'
import * as fileUpload from 'express-fileupload'
import * as compression from 'compression'
import * as fs from 'fs'
import * as jwt from 'jsonwebtoken'
import router from './router'
import * as path from 'path'
import * as rateLimit from 'express-rate-limit'
import SyncUserService from './service/user/syncTalent'

const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const requestIp = require('request-ip')

const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy

passport.use(new AzureAdOAuth2Strategy({
  clientID: process.env.MICROSOFT_GRAPH_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_GRAPH_CLIENT_SECRET,
  callbackURL: process.env.MICROSOFT_CALLBACK_URL,
  tenant: process.env.MICROSOFT_GRAPH_TENANTID,
  scope: ['user.read', 'offline_access', 'calendars.readwrite', 'email']
},

function (accessToken, refreshToken, params, profile, done) {
  // asynchronous verification, for effect...
  // console.log('accessToken', accessToken)
  // console.log('refreshToken', refreshToken)
  const waadProfile = jwt.decode(params.id_token, '', true)
  // console.log('profile', waadProfile)
  process.nextTick(function () {
    // To keep the example simple, the user's Microsoft Graph profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the Microsoft account with a user record in your database,
    // and return that user instead.
    const user = {
      accessToken,
      refreshToken,
      profile: waadProfile
    }
    return done(null, user)
  })
}
))
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'microsoft',
  cookie: { maxAge: 60000 }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(requestIp.mw())
const server = require('http').Server(app)
if (process.env.SYNC_USER === 'SYNC_USER') {
  const syncUserService = new SyncUserService(null)
  syncUserService.sync()
  syncUserService.syncActivity()
  syncUserService.syncEvent()
}
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(compression())
app.use(cors({ origin: '*' })) // NOSONAR

const TIMEOUT = '600s'
app.use(timeout(TIMEOUT))

morgan.format(
  'ebp',
  '[Backend] :method :url :status :res[content-length] - :response-time ms'
)
app.use(morgan('ebp'))
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
  })
)
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }))
app.use(helmet())
const bodyParserOptions = {
  strict: false,
  limit: '10mb'
}
app.use(bodyParser.json(bodyParserOptions)) // NOSONAR
app.use(bodyParser.urlencoded({ extended: false })) // NOSONAR
app.use(cookieParser())
// init router
// app.use(middleware);
app.use(fileUpload())

const limiter = rateLimit({
  windowMs: 8 * 1000,
  max: 10000
})
app.use(
  '/export',
  express.static(path.join(process.env.DIRNAME || __dirname, 'export'))
)
app.use('/user/api', limiter)
app.use('/user/api', router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', (req, res) => {
  res.sendFile(path.join(process.env.DIRNAME || __dirname, 'views/index.html'))
})

const port = process.env.SERVER_PORT
server.listen(port, () => {
  console.log(`start server at port ${port}`)
})
// }
