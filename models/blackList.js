const { CRUDOperation } = require("./Crud");
class blackListModel {
  constructor() {}
  static async createBlackList(data) {
    try {
      await CRUDOperation.Create("blacklist", data);
      
      return true;
    } catch (error) {
      return false;
    }
  }
  static async getWords(data){
    return await CRUDOperation.GetAll("blacklist",data) 
  }
  static async delete(data){
    await CRUDOperation.Delete("blacklist",data)
  }
 
 
}

module.exports = {
    blackListModel,
};
