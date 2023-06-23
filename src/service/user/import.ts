import Base from '../Base'

import * as Excel from 'exceljs'
import * as moment from 'moment'
import { validate } from '../../utility'
import { constant } from '../../constant'
import * as fs from 'fs'
import UploadService from '../UploadService'
import * as uuid from 'uuid'
import UserService from './create'
import UserServiceUpdate from './update'

export default class extends Base {
    private uploadService
    private userService
    private userServiceUpdate
    protected init () {
      this.uploadService = this.buildService(UploadService)
      this.userService = this.buildService(UserService)
      this.userServiceUpdate = this.buildService(UserServiceUpdate)
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
      let errors = false
      while (1) {
        const row = workSheet.getRow(i)
        if (!row || row.values[1] === undefined) {
          break
        }
        const accountID = row.values[2]?.toString()?.trim() || ''
        const fullName = row.values[3]?.toString()?.trim() || ''
        const emailAcb = row.values[4]?.toString()?.trim() || ''
        const email = row.values[5]?.toString()?.trim() || ''
        const phone = row.values[6]?.toString()?.trim() || ''
        const position = row.values[7]?.toString()?.trim() || ''
        const documentCode = row.values[8]?.toString()?.trim() || ''
        const team = row.values[9]?.toString()?.trim() || null
        const areaCode = row.values[10]?.toString()?.trim() || ''
        const departmentCode = row.values[11]?.toString()?.trim() || ''
        const unitCode = row.values[12]?.toString()?.trim() || ''
        const qrCode = uuid.v4()
        // {"areaCode":"","areaName":"","unitCode":"","unitName":"","departmentCode":"","departmentName":""}

        let j = 13; let error = false
        if (accountID === '') {
          row.getCell(j).value = 'Mã nhân viên không đc để trống'
          j++
          error = true
          errors = true
        }
        if (!validate.email(emailAcb)) {
          row.getCell(j).value = 'Email không đúng định dạng'
          j++
          error = true
          errors = true
        }
        if (email && email !== '') {
          if (!validate.email(email)) {
            row.getCell(j).value = 'Email gmail không đúng định dạng'
            j++ // NOSONAR
            error = true
            errors = true
          }
        }
        const query = this.knex('User')
          .where({ isDeleted: false })
          .where(function () { // NOSONAR
            this.where({ emailAcb })
              .orWhere({ accountID })
          })
        if ((email && email !== '')) {
          query.orWhere({ email })
        }
        const check = await query.first()
        if (check) {
          data.push({
            id: check.id,
            fullName: check.fullName,
            avatar: check.avatar,
            qrCode: check.qrCode,
            email: check.email,
            emailAcb: check.emailAcb,
            position: check.position,
            phone: check.phone,
            accountID: check.accountID,
            documentCode: check.documentCode,
            department: check.department,
            description: check.description,
            birthday: check.birthday,
            workingDay: check.workingDay,
            unit: { areaCode: areaCode, unitCode: unitCode, departmentCode: departmentCode },
            team
          })
        } else {
          data.push({
            accountID,
            fullName,
            email,
            emailAcb,
            phone,
            position,
            documentCode,
            qrCode,
            team,
            unit: { areaCode: areaCode, unitCode: unitCode, departmentCode: departmentCode }
          })
        }
        if (error) {
          row.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
              argb: 'FFD6CD'
            }
          }
        }
        i++
      }
      if (!fs.existsSync(`${constant.PATH.EXPORT_FILE}/${constant.PATH.FOLDER_EXPORT_USER}`)) {
        fs.mkdirSync(`${constant.PATH.EXPORT_FILE}/${constant.PATH.FOLDER_EXPORT_USER}`, { recursive: true })
      }
      if (errors) {
        const fileName = `IMPORT_ERRORS_${moment().format('DD_MM_YYYY')}.xlsx`
        workbook.xlsx.writeFile(`${constant.PATH.EXPORT_FILE}/${constant.PATH.FOLDER_EXPORT_USER}/${fileName}`)
        const pathDownload = `${process.env.USER_CLIENT_URL}/${process.env.EXPORTS}/${constant.PATH.FOLDER_EXPORT_USER}/${fileName}`
        return {
          notice: 'Dữ liệu file import người dùng không đúng, vui lòng kiểm tra.',
          errorList: pathDownload
        }
      } else {
        data.forEach(async user => {
          if (user.id) {
            this.userServiceUpdate.update(user)
          } else {
            this.userService.create(user)
          }
        })
      }
      console.log('IMPORT_USER_SUCCESSFULLY')
      return 'IMPORT_USER_SUCCESSFULLY'
    }
}
