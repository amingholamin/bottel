const { blackListModel } = require("./models/blackList");
const { groupModel } = require("./models/group");
const { userModel } = require("./models/user");

const fun = require("./publickFunctions");

class ButtonBot {
  static async RepleyMarkupGroupAdmin(bot, ctx, type) {
    const userGroup = await groupModel.getGroupUser({
      userId: ctx.from.id,
      type: type,
    });

    const options = userGroup.map((x) => [
      { text: x.title, callback_data: x.id },
    ]);
    userGroup.forEach((element) => {
      bot.action(`${element.id}`, async (ctx) => {
        await fun.DeleteButtonMurkUp(ctx.from.id, ctx);
        ctx.answerCbQuery("گروه شما انتخاب شد");
        await userModel.changeUser(
          { userId: ctx.from.id },
          { groupState: element.groupId }
        );

        let blackList = await blackListModel.getWords({
          groupId: element.groupId,
        });
        let b = [];
        for (var i = 0; i < blackList.length; ++i) {
          let r = [];
          let bg = {};
          bg.text = blackList[i].word;
          bg.callback_data = `${blackList[i].text}-${blackList[i].id}`;
          r.push(bg);
          b.push(r);
          let bo = blackList[i].id;
          bot.action(`${blackList[i].text}-${blackList[i].id}`, async (ctx) => {
            await fun.DeleteButtonMurkUp(ctx.from.id, ctx);

            await blackListModel.delete({ id: bo });
            await userModel.defaultUser({ userId: ctx.from.id });

            await ctx.reply(`با موفقیت خذف شد`, {
              reply_markup: JSON.stringify({
                inline_keyboard: options,
              }),
            });
          });
        }

        let a = await ctx.reply(
          "کلمات شما به شرح زیر است اگر بر روی هر کدام کلیک کنید به منظور خذف خواهد بود و با تگ زیر میتوانید کلمه جدید را اضافه کنید /addBlackWord",
          {
            reply_markup: JSON.stringify({
              inline_keyboard: b,
            }),
          }
        );

        await userModel.changeUser(
          { userId: ctx.from.id },
          { messageID: a.message_id }
        );

        return a;

        //  messageid = MessageIdForDelete.message_id;
      });
    });
    return options;
  }

  static async RepleyMarkupUserAdmin(bot, ctx, type) {
    const users = await userModel.getAllUser({ isActive: type });
    console.log("999999");
    console.log(type);
    const options = users.map((x) => [
      { text: `${x.firstName}_${x.lastName}`, callback_data: x.userId },
    ]);
    users.forEach((element) => {
      bot.action(`${element.userId}`, async (ctx) => {
        await fun.DeleteButtonMurkUp(ctx.from.id, ctx);
        let isActiveate;
        let userState = element.isActive;
        console.log("0000000000");
        console.log(element.userId);
        console.log(userState);
        if (userState == true) {
          isActiveate = false;
        } else {
          isActiveate = true;
        }
        console.log("1111111111");
        console.log(isActiveate);
        await userModel.changeUser(
          { userId: element.userId },
          { isActive: isActiveate }
        );
        let a = await ctx.reply("با موفقیت وضعیت کاربر تغییر کرد");

        await userModel.changeUser(
          { userId: ctx.from.id },
          { messageID: a.message_id }
        );

        return a;

        //  messageid = MessageIdForDelete.message_id;
      });
    });
    return options;
  }
}

module.exports = {
  ButtonBot,
};
