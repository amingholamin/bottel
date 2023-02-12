const { userModel } = require("./models/user");

async function DeleteButtonMurkUp(UserId, ctx) {
  let message = await userModel.getUser({ userId: UserId });
  await userModel.changeUser({userId:UserId},{messageID:null})
  try {
    if (message != 0) {
      await ctx.telegram.editMessageReplyMarkup(UserId, message.messageID, "");
    }
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  DeleteButtonMurkUp,
};
