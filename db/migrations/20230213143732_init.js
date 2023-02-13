exports.up = function(knex) {
    return knex.schema.table('user',(table)=>{
        table.dropColumn('type')

    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  
