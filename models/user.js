const { CRUDOperation } = require("./Crud");
class userModel {
  constructor() {}
  static async createUser(data) {
    try {
      await CRUDOperation.Create("user", data);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getUser(data) {
    return await CRUDOperation.getSpecial("user", data);
  }
  static async isUserExit(data) {
    let user = await CRUDOperation.getSpecial("user", data);
    if (user) {
      if (user.isActive) {
        return "ok";
      }
      return "no";
    } else {
      return "notUser";
    }
  }
  static async changeUser(where, data) {
    await CRUDOperation.Update("user", where, data);
  }

  static async defaultUser(where) {
    await CRUDOperation.Update("user", where, {
      isLogin: false,
      groupState: null,
      addBlackList: false,
    });
  }
}

module.exports = {
  userModel,
};
