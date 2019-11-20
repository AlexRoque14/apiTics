'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MegustaSchema extends Schema {
  up () {
    this.create('megustas', (table) => {
      table.increments()
      table.integer('imagene_id').unsigned().references('id').inTable('imagenes')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('megustas')
  }
}

module.exports = MegustaSchema
