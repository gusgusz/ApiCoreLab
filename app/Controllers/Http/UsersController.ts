import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
 
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const newUserSchema = schema.create({
      username: schema.string([
        rules.minLength(3)
      ]),
      email: schema.string([
        rules.email()
      ]),
      password: schema.string([
        rules.confirmed(),
        rules.minLength(6)
      ])
    })
  
    await request.validate({ schema: newUserSchema })
   
    const email = await User.findBy('email', body.email)
    if (email) {
      return response.badRequest('email já cadastrado')
    }

    const user = await User.create(body)

    response.status(201)

    return {
      message: 'usuário criado com sucesso!',
      data: user,
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findBy('email', email)

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30mins',
        name: user?.serialize().email,
      })
      return { token, user: user?.serialize() }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
