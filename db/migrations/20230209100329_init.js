exports.up = function(knex) {
    return knex.schema.table('user',(table)=>{
        table.bigint('messageID');
        table.boolean('isAdmin').default(false);

    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  