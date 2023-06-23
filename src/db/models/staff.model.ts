import Base from './Base.model'

export default class extends Base {
  public fullName: string;
  public email: string;
  public phone: string;
  public type: string;
  public role: string;
  public status: boolean;
  public password: string;
  public salt: string;
  public avatar: string;
  protected indexes = ['email'];

  public initTable (table) {
    super.initTable(table)
    table.string('fullName').default('')
    table.string('email').default('')
    table.string('phone').default('')
    table.string('type').default('ADMIN')// ADMIN, STAFF
    table.uuid('role')
    table.boolean('status')
    table.string('password').default('')
    table.string('salt').default('')
    table.string('avatar').default('')
    table.string('system').default('')
  }
}
