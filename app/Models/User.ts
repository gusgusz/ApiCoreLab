import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import Card from './Card';
import Favorite from './Favorite'
import Hash from '@ioc:Adonis/Core/Hash';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;
  
  @column()
  public password: string;

  @hasMany(() => Favorite)
public favorites: HasMany<typeof Favorite>

  

  @hasMany(() => Card, {
    foreignKey: 'userId', 
  })
  public cards: HasMany<typeof Card>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }

}
}
