exports.up = function(knex) {
    return knex.schema.table('user',(table)=>{
        table.dropColumn('userId')
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  