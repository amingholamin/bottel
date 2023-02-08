exports.up = function(knex) {
    return knex.schema.table('group',(t)=>{
        t.bigint('userId').references('userId').inTable('user')
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('group');
  };
  