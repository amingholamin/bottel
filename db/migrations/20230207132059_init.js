exports.up = function(knex) {
    return knex.schema.table('user',(table)=>{
        table.bigint('userId').unique().notNullable()
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  