import Base from '../Base'

import * as Excel from 'exceljs'
import { constant } from '../../constant'
import * as fs from 'fs'
import UploadService from '../UploadService'
import UserService from './create'
import { sendQueue } from '../../helper/amqp.helper'
export default class extends Base {
    private uploadService
    private userService
    protected init () {
      this.uploadService = this.buildService(UploadService)
      this.userService = this.buildService(UserService)
    }

    public async import (param) { // NOSONAR
      const { file } = param
      const { pathFile } = await this.uploadService.uploadSingleFile(file)
      const workbook = new Excel.Workbook()
      const wb = await workbook.xlsx.readFile(pathFile)

      const workSheet = wb.getWorksheet(1)

      if (!fs.existsSync(constant.PATH.FOLDER_QRCODE)) {
        fs.mkdirSync(constant.PATH.FOLDER_QRCODE, { recursive: true })
      }

      let i = 2
      const data = []
      while (1) {
        const row = workSheet.getRow(i)
        if (!row || row.values[1] === undefined) {
          break
        }
        const emailAcb = row.values[2]?.toString()?.trim() || ''
        const qrCode = row.values[3]?.toString()?.trim() || ''
        // data.push({
        //   emailAcb,
        //   qrcode
        // })
        // let j = 4; let error = false
        // if (!validate.email(emailAcb)) {
        //   row.getCell(j).value = 'Email không đúng định dạng'
        //   j++
        //   error = true
        //   errors = true
        // }
        const query = this.knex('User')
          .where({ emailAcb })
        const user = await query.first()
        if (user) {
          await this.knex('User').where({ id: user.id }).update({ qrCode })
          // this.sync({ qrCode: qrCode }, user.id)
        } else {
          this.userService.create({ fullName: emailAcb, emailAcb: emailAcb, qrCode: qrCode })
          data.push(emailAcb)
        }
        i++
      }
      return data
    }

    async sync (data, id) {
      const newData = {
        ...data,
        id
      }
      await sendQueue({
        key: 'SYNC_USER_TALENT',
        data: [newData]
      })
      await sendQueue({
        key: 'SYNC_USER_ACTIVITY',
        data: [newData]
      })
      await sendQueue({
        key: 'SYNC_USER_EVENT',
        data: [newData]
      })
    }
}
