'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imagene extends Model {

    usuario () {
        return this.belongsTo('App/Models/User')
      }

    mgs () {
      return this.hasMany('App/Models/Megusta')
    }

}

module.exports = Imagene
