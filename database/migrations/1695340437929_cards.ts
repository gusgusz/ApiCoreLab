import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class CreateCards extends BaseSchema {
  protected tableName = 'cards';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('title');
      table.string('text');
      table.enum('color', [
        '#BAE2FF',
        '#B4FFDD',
        '#FFEBAC',
        '#FFCAB9',
        '#F99494',
        '#9DD6FF',
        '#ECA1FF',
        '#DAFF8B',
        '#FFA285',
        '#CDCDCD',
        '#979797',
        '#A99A7C'
      ]);
      table.boolean('is_favorite');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
 
