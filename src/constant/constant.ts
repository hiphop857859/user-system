
export const seedDistrict: any[] = [
  {
    districtId: '001',
    provinceId: '01',
    name: 'Quận Ba Đình'
  }
]
export const seedWard: any[] = [
  {
    wardId: '00001',
    districtId: '001',
    name: 'Phường Phúc Xá'
  }
]
export const seedTeam: any[] = [
  {
    name: 'Team01',
    key: 'team01'
  }
]

export const seedEvent: any[] = [
  {
    name: 'Event ACB',
    startDate: new Date('2020-12-24 02:02:32'),
    endDate: new Date('2021-01-24 02:02:32')
  }
]
export const PATH = {
  EXPORT_FILE: 'src/exports',
  EXPORT_FILE_ERROR: 'src/export/errors',
  FOLDER_REQUEST: 'request',
  IMPORT_FILE: 'src/imports',
  IMPORT_FILE_ERROR: 'src/imports/errors',
  FOLDER_EXPORT_MEMBER: 'member',
  FOLDER_QRCODE: 'src/images/qrcode',
  FOLDER_SESQRCODE: 'src/images/sessionqrcode',
  PATH_SESQRCODE: 'images/sessionqrcode',
  FOLDER_EXPORT_TEAM: 'team',
  FOLDER_EXPORT_BOOTH: 'booth',
  FOLDER_EXPORT_EVENT: 'event',
  FOLDER_EXPORT_TYPE_SESSION: 'typesession',
  FOLDER_EXPORT_SESSION: 'session',
  FOLDER_EXPORT_SURVEY: 'survey',
  FOLDER_EXPORT_USER: 'user',
  FOLDER_EXPORT_SESSION_POINT_GIVING: 'sessionPointGiving',
  FOLDER_EXPORT_SESSION_CHECK_IN: 'sessionCheckIn',
  FOLDER_EXPORT_HISTORY_POINT: 'historyPoint',
  FOLDER_EXPORT_ALL_IN_OUT: 'allInOut'
}

export const categoryDefault = [
  {
    name: 'Lịch trình',
    key: 'lich-trinh',
    color: 'linear-gradient(180deg, #6D8DF4 0%, #3D63DC 100%)'
  },
  {
    name: 'Livestream',
    key: 'livestream',
    color: 'linear-gradient(342deg, #002395 -0.65%, #0953DA 100.66%, #0C3BD6 100.67%)'
  },
  {
    name: 'Tin tức',
    key: 'tin-tuc',
    color: 'linear-gradient(180deg, #56DEFC 0%, #08BBE2 60.47%)'
  },
  {
    name: 'Thành tích',
    key: 'thanh-tich',
    color: 'linear-gradient(281.05deg, #0499D0 17.37%, #56CDF9 98.76%)'
  },
  {
    name: 'Lịch trình của tôi',
    key: 'lich-trinh-cua-toi',
    color: 'linear-gradient(281.05deg, #92C10D 17.37%, #C5EA5D 98.76%)'
  },
  {
    name: 'Tài liệu',
    key: 'tai-lieu',
    color: 'linear-gradient(270deg, #56A0FF 0%, #8DC1FE 99.02%)'
  }
]

export const seedSetting = [
  {
    title: 'Điểm hằng ngày',
    key: 'POINT_BONUS_DAILY',
    value: { point: 20 }
  },
  {
    title: 'Hướng dẫn tham gia',
    key: 'INSTRUCTION',
    value: ''
  },
  {
    title: 'Hình ảnh mặc định của sự kiện',
    key: 'IMAGE_DEFAULT',
    value: ''
  }
]
