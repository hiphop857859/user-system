import Base from './Base.model'

export default class extends Base {
  public deviceID: string;
  public tokenFCM: string;
  public userID: number;

  public initTable (table) {
    super.initTable(table)
    table.string('deviceID')
    table.string('tokenFCM')
    table.uuid('userID')
  }
}
