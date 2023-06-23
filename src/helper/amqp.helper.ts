
const amqp = require('amqplib')

const CHANNEL = {
  NOTI_TALENT: 'notificationTalent',
  SYNC_USER_TALENT: 'syncUserTalent',
  DELETE_USER_TALENT: 'deleteUserTalent',
  SYNC_USER_ACTIVITY: 'syncUserActivity',
  DELETE_USER_ACTIVITY: 'deleteUserActivity',
  SYNC_USER_LMS: 'syncUserLMS',
  DELETE_USER_LMS: 'deleteUserLMS',
  SYNC_USER_EVENT: 'syncUserEvent',
  DELETE_USER_EVENT: 'deleteUserEvent'
}
// create Attendee
export const sendQueue = async (param) => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL)
  const channel = await connection.createChannel()
  await channel.assertQueue(CHANNEL[param.key])

  await channel.sendToQueue(CHANNEL[param.key], Buffer.from(JSON.stringify(param.data)))
  await channel.close()
  await connection.close()
}
