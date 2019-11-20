'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with imagenes
*/
const Imagen = use('App/Models/Imagene');
const USER = use('App/Models/User');
const Helpers = use('Helpers')

class ImageneController {
  /**
   * Show a list of all imagenes.
   * GET imagenes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const img = await Imagen.query().with('usuario').fetch();
    return img;

  }

  /**
   * Render a form to be used for creating a new imagene.
   * GET imagenes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {



  }

  /**
   * Create/save a new imagene.
   * POST imagenes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    
    // const img = await Imagen.create(request.all);   /*crear un objeto */
    // return response.send({Imagen:img})

    try {

      const fecha = new Date();

      const data = request.all();
      const imagen = new Imagen()
      const image = request.file('url')
      imagen.description = data.description
      imagen.user_id = data.user_id
      console.log(data.description);
      console.log(data.url);
      imagen.url =  fecha + '.' + image.subtype 

      await image.move(Helpers.publicPath('imagenes/'+ data.user_id), {
        name: imagen.url
      })

      imagen.url = '/imagenes/' + data.user_id + '/'+ imagen.url
      console.log(imagen.url)
      console.log(imagen.description)
      await imagen.save();
      return response.status(201).send({message: {message: "File Upload"}, imagen: imagen});
    } catch (error) {
      return response.send(error);
    }

  }

  /**
   * Display a single imagene.
   * GET imagenes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const img = await Imagen.findBy('id', params.id)
    // const imgus = await img.usuario().fetch()
    const like = await img.mgs().fetch()

    return response.send({img, like})

  }

  /**
   * Render a form to update an existing imagene.
   * GET imagenes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update imagene details.
   * PUT or PATCH imagenes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const img = await Imagen.findBy('id', params.id)

      img.merge(request.all());
      await img.save()

      return response.status(201).send(img);
    } catch (error) {
      return response.status(error)
    }

  }

  /**
   * Delete a imagene with id.
   * DELETE imagenes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    try {
      const img = await Imagen.findBy('id', params.id)

      img.delete()
      return response.send({message: {status: "La imagen se eliminó correctamente"}, img})
      
    } catch (error) {
      return response.send(error)
    }
  }
}

module.exports = ImageneController
