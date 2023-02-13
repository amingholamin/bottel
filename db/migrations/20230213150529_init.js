exports.up = function(knex) {
    return knex.schema.table('group',(table)=>{
        table.bigint("userId").notNullable();


    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('group');
  };
  