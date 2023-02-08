exports.up = function(knex) {
    return knex.schema.table('group',(t)=>{
        t.dropColumn('userId')
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('group');
  };
  