import Base from '../Base'

import * as Excel from 'exceljs'

import { validate } from '../../utility'
import { constant } from '../../constant'
import * as fs from 'fs'
import UploadService from '../UploadService'
import UpdateBSC from './updateBSC'
export default class extends Base {
    private uploadService
    private updateBSC
    protected init () {
      this.uploadService = this.buildService(UploadService)
      this.updateBSC = this.buildService(UpdateBSC)
    }

    public async import (param) { // NOSONAR
      const { file } = param
      const { pathFile, filename } = await this.uploadService.uploadSingleFile(file)
      const workbook = new Excel.Workbook()
      const wb = await workbook.xlsx.readFile(pathFile)

      const workSheet = wb.getWorksheet(1)

      if (!fs.existsSync(constant.PATH.FOLDER_QRCODE)) {
        fs.mkdirSync(constant.PATH.FOLDER_QRCODE, { recursive: true })
      }

      (async function () {
        let i = 2
        const errors = []
        while (1) {
          const row = workSheet.getRow(i)
          if (!row || row.values[1] === undefined) {
            break
          }

          const emailAcb = row.values[4]?.toString()?.trim() || ''
          const balanceScoreCard = row.values[5]?.toString()?.trim() || ''

          if (!validate.valid_string(emailAcb, 1)) {
            errors.push('Số thự tự ' + row.values[1] + ': trường "Email ACB" không được để trống')
            ++i
            continue
          }
          const checkEmail = await this.knex('User')
            .where({ emailAcb }).first()

          if (checkEmail) {
            await this.updateBSC.updateBSC({
              id: checkEmail.id, balanceScoreCard, user: checkEmail
            })
          }

          ++i
        }
        if (errors.length) {
          const data = errors.reduce((a, b) => a + '\n' + b)
          fs.writeFileSync(`${constant.PATH.IMPORT_FILE_ERROR}/${filename}.txt`, data)
        }
        console.log('IMPORT_USER_SUCCESSFULLY')
      }.bind(this))()

      return 'IMPORT_USER_SUCCESSFULLY'
    }
}
