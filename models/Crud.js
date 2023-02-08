const db = require("../db/db");

class CRUDOperation {
 static async Create(tableName, object) {
 try {
  
    await db(tableName).insert(object);
 } catch (error) {
  console.log(error);
 }
  }
  static async Delete(tableName, object) {
   try{
   
   return await db(tableName).where(object).first().del();
   }catch(err){
console.log(err);
   }
  }

  static async GetAll(tableName,object) {

    return await db(tableName).where(object).select();
    
  }
  static async getSpecial(tableName,object){
    return await db(tableName).where(object).select().first();
  }
 

  static async IsExist(tableName, object) {
    let isExist = await db(tableName).where(object);
    return isExist;
  }

  static async Update(tableName, objectFirst, objectSecound) {
    await db(tableName).where(objectFirst).first().update(objectSecound);
  }
}

module.exports = {
  CRUDOperation,
};
