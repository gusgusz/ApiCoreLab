import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Card from 'App/Models/Card'
import ToDo from 'App/Models/ToDo'

export default class CardsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ error: 'User not authenticated' })
    }

    const body = request.body()

    try {
      if (body.color === undefined || body.color === null) {
        body.color = '#BAE2FF'
      }

      const card = await user?.related('cards').create(body)

      if (body.todos && body.todos.length > 0) {
        await card.related('todos').createMany(body.todos)
      }

      return card
    } catch (error) {
      return response.status(500).send({ error: 'Internal Server Error' })
    }
  }

  public async search({ auth, request, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ error: 'User not authenticated' })
    }

    const body = request.body()
    if(!body.search) return response.badRequest({ error: 'Search is required' });

    try {
      const cards = await user
        ?.related('cards')
        .query()
        .where('title', 'like', `%${body.search}%`)
        .orWhere('text', 'like', `%${body.search}%`)
    

      return cards
    } catch (error) {
      return response.status(500).send({ error: 'Internal Server Error' })
    }
  }

  public async show({ auth, response }: HttpContextContract) {
    const user = auth.user
    const card = await user?.related('cards').query().where('user_id', user.id)
    return response.ok(card)
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ error: 'User not authenticated' })
    }

    const cardId = params.id
    const body = request.body()

    try {
      const card = await Card.query().where('id', cardId).where('user_id', user.id).firstOrFail()

      card.merge(body)
      await card.save()

      if (body.todos && body.todos.length > 0) {
        for (const todo of body.todos) {
          await ToDo.query()
            .where('card_id', card.id)
            .where('id', todo.id)
            .update({ text: todo.text, isDone: todo.isDone })
        }
      }

      return card
    } catch (error) {
      return response.status(500).send({ error: 'Internal Server Error' })
    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    const card = await user?.related('cards').query().where('id', params.id).firstOrFail()
    if (!card) {
      return response.notFound({ error: 'Card not found' })
    }
    await card.delete()
    return card
  }
}
