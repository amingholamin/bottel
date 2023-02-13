exports.up = function(knex) {
    return knex.schema.table('user',(table)=>{
        table.boolean('addChannel').default(false);
        table.string('type').default('group');

    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  
