exports.up = function(knex) {
    return knex.schema.table('users',(table)=>{
      table.boolean('isLogin').notNullable();
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  