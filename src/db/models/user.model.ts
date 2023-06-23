import Base from './Base.model'

export default class extends Base {
  public fullName: string;
  public accountID: string;
  public email: string;
  public phone: string;
  public status: boolean;
  public password: string;
  public salt: string;
  public avatar: string;
  public position: string;
  public linkSocial: string;
  public bio: string;
  public teamID: number;
  public documentCode: string;
  public qrCode: string;
  public balanceScoreCard: number;
  protected indexes = ['emailAcb', 'accountID']

  public initTable (table) {
    super.initTable(table)
    table.string('fullName').default('')
    table.string('accountID').default('') // Google account id
    table.string('accountMsID').default('') // Microsoft account id
    table.string('email').default('') // Email Google
    table.string('emailAcb').default('') // Email Acb (Microsoft)
    table.string('phone').default('')
    table.boolean('status').default(true)
    table.string('password').default('')
    table.string('salt').default('')
    table.string('avatar').default('')
    table.string('position').default('')
    table.string('linkSocial').default('')
    table.string('bio').default('')
    table.string('team').default('')
    table.string('documentCode').default('')
    table.string('qrCode').default('')
    table.integer('balanceScoreCard').default(0)
    table.string('department').default('')
    table.string('description').default('')
    table.timestamp('birthday')
    table.timestamp('workingDay')
    table.specificType('unit', 'JSON')
  }
}
