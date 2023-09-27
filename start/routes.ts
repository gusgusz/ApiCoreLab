import 'reflect-metadata';

import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.post('register', "UsersController.store")

  Route.post('login', "UsersController.login")
 

  Route.post('cards', "CardsController.store").middleware('auth')
  Route.get('cards', "CardsController.show").middleware('auth')
  Route.put('cards/:id', "CardsController.update").middleware('auth')
  Route.delete('cards/:id', "CardsController.destroy").middleware('auth')
  Route.post('cards/search', "CardsController.search").middleware('auth')
  
 
}).prefix('/api')
