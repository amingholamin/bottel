exports.up = function(knex) {
    return knex.schema.table('group',(table)=>{
        table.dropColumn('userId');


    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('group');
  };
  