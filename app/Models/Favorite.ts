import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Favorite extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pokemonName: string

  @column()
  public data: object

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
