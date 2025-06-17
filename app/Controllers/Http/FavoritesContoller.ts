import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorite from 'App/Models/Favorite'

export default class FavoritesController {
  public async index({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user) return response.unauthorized({ error: 'User not authenticated' })

    const favorites = await user.related('favorites').query()
    return response.ok(favorites)
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user) return response.unauthorized({ error: 'User not authenticated' })

    const { pokemonName, data } = request.only(['pokemonName', 'data'])

    try {
      const existing = await Favorite.query()
        .where('user_id', user.id)
        .andWhere('pokemon_name', pokemonName)
        .first()

      if (existing) {
        return response.badRequest({ error: 'Pokémon já favoritado' })
      }

      const favorite = await user.related('favorites').create({
        pokemonName,
        data: data ?? {},
      })

      return response.created(favorite)
    } catch (err) {
      return response.status(500).send({ error: 'Erro interno ao favoritar' })
    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user) return response.unauthorized({ error: 'User not authenticated' })

    try {
      const favorite = await Favorite.query()
        .where('user_id', user.id)
        .andWhere('pokemon_name', params.name)
        .firstOrFail()

      await favorite.delete()
      return response.ok({ message: 'Favorito removido com sucesso' })
    } catch {
      return response.notFound({ error: 'Favorito não encontrado' })
    }
  }
}
