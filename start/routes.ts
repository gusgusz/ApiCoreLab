import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import UsersController from 'App/Controllers/Http/UsersController'




Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.post('register', "UsersController.store")

  Route.post('login', "UsersController.login")
 
}).prefix('/api')
