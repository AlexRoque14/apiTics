'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Megusta extends Model {

    mg () {
        return this.belongsTo('App/Models/Imagene')
      }

    mgss (){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Megusta
