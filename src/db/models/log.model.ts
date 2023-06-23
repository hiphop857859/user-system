import Base from './Base.model'

export default class extends Base {
  public userID: number;
  public type: string;
  public group: string;
  public detail: JSON;

  public initTable (table) {
    super.initTable(table)
    table.integer('userID')
    table.string('type').default('')
    table.string('group').default('') // USER / ADMIN
    table.json('detail').default('{}')
  }
}
