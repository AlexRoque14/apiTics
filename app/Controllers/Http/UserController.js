'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const Users = use('App/Models/User');

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    
    const us = Users.all();
    return us
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

      try {
        
      const usuario = await Users.create(request.all());   /*crear un objeto */
   
      return response.status(201).send({message: {message: "Usuario registrado correctamente"}, usuario: usuario});

      } catch (error) {
        return response.send(error)
      }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    
    const us = await Users.findBy('id', params.id)

    const usimg = await us.imagen().fetch()

    return response.send({us, usimg})
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const usu = await Users.findBy('id', params.id)

      usu.merge(request.all());
      await usu.save()

      return response.status(201).send(usu);
    } catch (error) {
      return response.status(error)
    }

  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const usu = await Users.findBy('id', params.id)

    usu.delete();
    return response.send({message: {status: "El usuario se eliminó correctamente"}, usu})
  }

  async followMe ({ request, response, params }){
    const user = await Users.findBy('id', params.id)
    if (request.fm_id && request.fm_id > 0){
      await user.follow_me().attach(request.fm_id)
      user.fm_id = await user.follow_me().fetch()
    }

    return response.send({message: {status: "Siguiendo correctamente"}, user})

  }

  async login({request,response,auth }){
    const data = request.all();
    const user = await Users.findBy('email', data.email)
    const token = await auth.attempt(data.email,data.password);
    if(user){
      user.token_nav = data.token_nav;
      await user.save();
      return response.send({token, user, status: 202})
    }
    return response.send({message:{error:'This user does not exist! or your password is incorrect, please try again.', status: 203}})
  }


}



module.exports = UserController
