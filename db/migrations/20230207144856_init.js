exports.up = function(knex) {
    return knex.schema.table('user',(table)=>{
        table.bigint('groupState');
        table.boolean('addBlackList').default(false);

    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  