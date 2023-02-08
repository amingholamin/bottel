const { CRUDOperation } = require("./Crud");
class groupModel {
  constructor() {}
  static async createGroup(data) {
    try {
      await CRUDOperation.Create("group", data);
      
      return true;
    } catch (error) {
      return false;
    }
  }
  static async getGroup(data){
    return await CRUDOperation.getSpecial("group",data)
  }
  static async getGroupUser(data){
    return await CRUDOperation.GetAll("group",data)
  }
 
}

module.exports = {
    groupModel,
};
