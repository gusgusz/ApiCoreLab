import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ToDo from 'App/Models/ToDo'

enum ColorEnum {
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
 
}

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public text: string

  @column()
  public color: ColorEnum;

  @column()
  public isFavorite: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

 
  @hasMany(() => ToDo, {
    foreignKey: 'cardId',
  })
  public todos: HasMany<typeof ToDo>

  constructor() {
    super()
    this.isFavorite = false

  }

}

