'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      
      table
        .integer("company_id")  //todo tweet pertence a um usuário - FK aqui começa o relacionamento -  precisa estar referenciada na tabela users
        .unsigned()  //significa que valor nao pode ser abaixo de zero
        .notNullable() //diz que nao pode ter empresa sem usuario vinculado
        .references("id")//qual o campo que quero referenciar
        .inTable("companies") //de atualiza tbm referenciar
        .onUpdate("CASCADE") //atualiza todas as tbaelas q se relacionam
        .onDelete("CASCADE");//deleta  todas as tbaelas q se relacionam
    
    });
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserSchema
