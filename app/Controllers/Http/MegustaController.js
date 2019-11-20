'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with megustas
 */
const MG = use('App/Models/Megusta');

class MegustaController {
  /**
   * Show a list of all megustas.
   * GET megustas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const mg = await MG.query().with('mg').with('mgss').fetch();
    return mg;
  }

  /**
   * Render a form to be used for creating a new megusta.
   * GET megustas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new megusta.
   * POST megustas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const M_G = await MG.create(request.all());   /*crear un objeto */
      return response.status(201).send({message: {message: "M_G registrado correctamente"}, M_G: M_G});
      } catch (error) {
        return response.send(error)
      }
  }

  /**
   * Display a single megusta.
   * GET megustas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const likes = await MG.findBy('imagene_id', params.id)
    
    return response.send({likes})
  }

  /**
   * Render a form to update an existing megusta.
   * GET megustas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update megusta details.
   * PUT or PATCH megustas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a megusta with id.
   * DELETE megustas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MegustaController
