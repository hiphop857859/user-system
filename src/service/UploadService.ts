// tslint:disable:no-null-keyword
import Base from './Base'
import * as fs from 'fs'
import { constant, error, type } from '../constant'
import * as moment from 'moment'
import * as uuid from 'uuid'

import * as sharp from 'sharp'

export default class extends Base {
    private IMAGES_PATH;
    private FILE_PATH;
    protected init () {
      this.IMAGES_PATH = `src/${process.env.IMAGES}`
      this.FILE_PATH = `src/${process.env.FILE_PATH}`
    }

    /*
    * @param - file, req.files.file.
    * */
    public async saveFile (files) {
      console.log('------Upload-start-----------')

      const fileUpload = files
      const name = files.name.split('.')
      const typeFile = name[name.length - 1]
      const fileName = ['jpg', 'png', 'jpeg', 'gif', 'bmp'].includes(name[name.length - 1].toLowerCase())
        ? `${uuid.v4()}.${typeFile}`
        : `${files.name}`

      const dir = this.IMAGES_PATH
      const pathFile = `${dir}/${fileName}`

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }

      const upLoad = await fileUpload.mv(pathFile)

      if (!upLoad) {
        console.log('------Upload-end-----------')
        return fileName
      }
    }

    public async processUpfile (fileUpload) {
      const name = fileUpload.name.split('.')
      const typeFile = name[name.length - 1]
      const date = new Date().toUTCString().split(' ').slice(1, 4).join('-')
      if (fileUpload.name.match(/\.(jpg|png|jpeg|gif|bmp|heic|tiff|HEIF|jfif)$/i)) {
        const url = `${this.IMAGES_PATH}/${date}/${uuid.v4()}.${typeFile}`.replace(/\s/g, '')

        if (!fs.existsSync(`${this.IMAGES_PATH}/${date}`)) {
          fs.mkdirSync(`${this.IMAGES_PATH}/${date}`, { recursive: true })
        }
        await sharp(fileUpload.data)
          .jpeg({ quality: 65, progressive: true })
          .toFile(url, (_err, info) => {}) //NOSONAR
        return {
          success: true,
          url: url.split('/').slice(2, 4).join('/')
        }
      }
      return {
        success: false, message: 'File type not support!'
      }
    }

    public async uploadSingleFile (file) {
      if (!file) { throw error.FILES.FILE_NOT_FOUND }

      const splitFilename = file.name.split('.')
      const extension = splitFilename[splitFilename.length - 1]
      const filename = moment().format('DD_MM_YYYY---HH_mm_ss')

      // create folder import file
      if (!fs.existsSync(constant.PATH.IMPORT_FILE)) {
        fs.mkdirSync(constant.PATH.IMPORT_FILE)
      }

      // create folder import file error
      if (!fs.existsSync(constant.PATH.IMPORT_FILE_ERROR)) {
        fs.mkdirSync(constant.PATH.IMPORT_FILE_ERROR)
      }

      const pathFile = `${constant.PATH.IMPORT_FILE}/${filename}.${extension}`
      await file.mv(pathFile)
      return { pathFile, filename, extension }
    }

    public async changeSizeRadio (url, pathFile, dimensions) {
      const width = dimensions.width
      const height = dimensions.height
      const size = {}
      for (const val of type.ASPECTRATIO) {
        const heightNew = height
        const widthNew = width
        size[val.name] = await this.reSizeImage(
          pathFile,
          dimensions,
          width,
          height,
          widthNew,
          heightNew,
          url,
          val)
      }
      return size
    }

    public async reSizeImage (pathFile, dimensions, width, height, widthNew, heightNew, url, objRatio) { //NOSONAR
      const urlNew = url.split('.').slice(0, -1).join('.')
      const unitWidth = Math.round(width / objRatio.OP1)
      const unitHeight = Math.round(height / objRatio.OP2)
      if (unitWidth < unitHeight) {
        widthNew = unitWidth * objRatio.OP1
        heightNew = unitWidth * objRatio.OP2
      } else if (unitWidth > unitHeight) {
        widthNew = unitHeight * objRatio.OP1
        heightNew = unitHeight * objRatio.OP2
      }

      const pathFileNew = `${urlNew}-${widthNew}x${heightNew}.${dimensions.type}`.replace(/\s/g, '')

      await sharp(pathFile)
        .jpeg({ quality: 65, progressive: true })
        .resize({ width: widthNew, height: heightNew, fit: 'cover' })
      // .toBuffer();
        .toFile(pathFileNew)
      const FormatUrl = pathFileNew.split('/').slice(1, 4).join('/')
      return {
        height: heightNew,
        width: widthNew,
        url: FormatUrl
      }
    }

    public async saveFileDocument (files, param) {
      const { docType } = param
      const limitVideo = 200 * 1024 * 1024
      const limitDocument = 100 * 1024 * 1024
      if (docType !== 'document' && docType !== 'video') {
        throw error.FILES.FORMAT_DOCUMENT_ERROR
      }
      if (docType === 'document') {
        if (!files.name.match(/\.(doc|docx|dotx|pdf|potx|xls|xlsx|pptx|pptm|ppt|txt)$/i)) throw error.FILES.FORMAT_DOCUMENT_ERROR
        if (files.data.byteLength > limitDocument) throw error.FILES.FILE_LARGER_THAN_100MB
      }
      if (docType === 'video') {
        if (!files.name.match(/\.(avi|flv|wmv|mp4|mov)$/i)) throw error.FILES.FORMAT_VIDEO_ERROR
        if (files.data.byteLength > limitVideo) throw error.FILES.FILE_LARGER_THAN_200MB
      }

      const name = files.name.split('.')
      const typeFile = name[name.length - 1]
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      const now = date.getTime()
      if (!fs.existsSync(`${this.FILE_PATH}/${docType}/${year}/${month}`)) {
        fs.mkdirSync(`${this.FILE_PATH}/${docType}/${year}/${month}`, { recursive: true })
      }
      const pathFile = `${this.FILE_PATH}/${docType}/${year}/${month}/${now}.${typeFile}`
      const urlFile = `${process.env.FILE_PATH}/${docType}/${year}/${month}/${now}.${typeFile}`

      const upLoad = await files.mv(pathFile)
      if (!upLoad) {
        return urlFile
      }
      return 0
    }
}
