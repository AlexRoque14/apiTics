'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageneSchema extends Schema {
  up () {
    this.create('imagenes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('description', 80).notNullable()
      table.string('url', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('imagenes')
  }
}

module.exports = ImageneSchema
