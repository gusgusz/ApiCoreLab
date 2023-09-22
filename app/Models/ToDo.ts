import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Card from './Card';

export default class ToDo extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public text: string;

  @column()
  public isDone: boolean;

  @column()
  public cardId: number;

  @belongsTo(() => Card, {
    localKey: 'id',
    foreignKey: 'cardId',
  })
  public card: BelongsTo<typeof Card>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
