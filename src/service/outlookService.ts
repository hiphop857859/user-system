/* eslint-disable camelcase */
import Base from './Base'
import axios from 'axios'
import { ICalendar } from '../constant/interface'
import * as _ from 'lodash'
const url = 'https://graph.microsoft.com/v1.0/'
const params = {
  client_id: process.env.MICROSOFT_GRAPH_CLIENT_ID || '331d9194-fdc3-4ab5-9aff-9ec2b703890f',
  redirect_uri: process.env.MICROSOFT_CALLBACK_URL || 'http://localhost:5000/api/users/login-azure-success',
  grant_type: 'refresh_token',
  client_secret: process.env.MICROSOFT_GRAPH_CLIENT_SECRET || 'BvC7Q~1QWUVf-XKYrn0rXEcknsCGovRi.ctGE',
  scope: ['user.read', 'offline_access', 'calendars.readwrite']
}
const createEventCalendar = async (data: ICalendar, token) => {
  return axios({
    method: 'POST',
    url: `${url}me/calendar/events`,
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      const { status, statusText } = err.response
      return { status, statusText }
    })
}

const deleteEventCalendar = async (calendarID, token) => {
  return axios({
    method: 'DELETE',
    url: `${url}me/events/${calendarID}`,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  })
    .then((res) => {
      return 'SUCCESS'
    })
    .catch((err) => {
      const { status, statusText } = err.response
      return { status, statusText }
    })
}

const updateEventCalendar = async (calendarID, data: ICalendar, token) => {
  return axios({
    method: 'PATCH',
    url: `${url}me/events/${calendarID}`,
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      const { status, statusText } = err.response
      return { status, statusText }
    })
}

const getNewTokenMicrosoft = async (refreshToken) => {
  const app = { ...params, refresh_token: refreshToken }
  const data = Object.keys(app)
    .map((key) => `${key}=${encodeURIComponent(app[key])}`)
    .join('&')
  return axios({
    method: 'POST',
    url: 'https://login.microsoftonline.com/' + process.env.MICROSOFT_GRAPH_TENANTID + '/oauth2/v2.0/token',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      const { status, statusText } = err.response
      return { status, statusText }
    })
}

export default class extends Base {
  public async createEventCalendar (params) { // NOSONAR
    const { token, newEvent, refreshToken } = params
    const resultCalendar = await createEventCalendar(newEvent, token)
    const status = _.get(resultCalendar, 'status')
    if (status) {
      if (status === 401) {
        const resultNewToken = await getNewTokenMicrosoft(refreshToken)
        if (_.get(resultNewToken, 'status')) {
          throw _.get(resultNewToken, 'statusText')
        } else {
          const { access_token } = resultNewToken
          return createEventCalendar(newEvent, access_token)
        }
      }
      throw _.get(resultCalendar, 'statusText')
    }
    return resultCalendar
  }

  public async deleteEventCalendar (params) { // NOSONAR
    const { calendarID, token, refreshToken } = params
    const result = await deleteEventCalendar(calendarID, token)
    const status = _.get(result, 'status')
    if (status) {
      if (status === 401) {
        const resultNewToken = await getNewTokenMicrosoft(refreshToken)
        if (_.get(resultNewToken, 'status')) {
          throw _.get(resultNewToken, 'statusText')
        } else {
          const { access_token } = resultNewToken
          return deleteEventCalendar(calendarID, access_token)
        }
      }
      throw _.get(result, 'statusText')
    }
    return result
  }

  public async updateEventCalendar (params) { // NOSONAR
    const { calendarID, data, token, refreshToken } = params
    const result = await updateEventCalendar(calendarID, data, token)
    const status = _.get(result, 'status')
    if (status) {
      if (status === 401) {
        const resultNewToken = await getNewTokenMicrosoft(refreshToken)
        if (_.get(resultNewToken, 'status')) {
          throw _.get(resultNewToken, 'statusText')
        } else {
          const { access_token } = resultNewToken
          return updateEventCalendar(calendarID, data, access_token)
        }
      }
      throw _.get(result, 'statusText')
    }
    return result
  }
}
