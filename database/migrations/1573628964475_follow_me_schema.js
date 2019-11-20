'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowMeSchema extends Schema {
  up () {
    this.create('follow_mes', (table) => {
      table.increments()
      // table.integer('user_id').unsigned()
      // table.integer('fm_id').unsigned()
      // table.foreign('user_id').reference('users.id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      // table.foreign('fm_id').reference('users.id')
      table.integer('fm_id').unsigned().references('id').inTable('users')

      
      table.timestamps()
    })
  }

  down () {
    this.drop('follow_mes')
  }
}

module.exports = FollowMeSchema
