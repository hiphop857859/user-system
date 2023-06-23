import Base from './Base.model'

export default class extends Base {
  public name: string;
  public key: string;
  public permissions: JSON;

  public initTable (table) {
    super.initTable(table)
    table.string('name').default('')
    table.string('key').default('')
    table.string('system')
    table.text('description').default('')
    table.json('permissions')
    table.boolean('isBlock').default(false)
  }
}
