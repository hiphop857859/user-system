import knex from '../configs/db-connector'
export interface Index {
  columns: string | [string];
  name?: string;
  type?: string;
  useRaw?: boolean;
}

export default class BaseModel {
  public tableName;
  public id: number;
  public isDeleted: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  protected indexes: (string | Index | string[])[] = [];

  constructor (tableName) {
    this.tableName = tableName
  }

  public createIndexes (table) {
    for (const index of this.indexes) {
      if (index instanceof Object && !Array.isArray(index)) {
        table.index(index.columns, index.name, index.type)
      } else { table.index(index) }
    }
  }

  public initTable (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.boolean('isDeleted').default(false)
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'))
    this.createIndexes(table)
  }
}
