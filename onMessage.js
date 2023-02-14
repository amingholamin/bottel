const { userModel } = require("./models/user");
const { blackListModel } = require("./models/blackList");
const { groupModel } = require('./models/group');
async function onMessageBot(bot, ctx) {
  const user = await userModel.getUser({ userId: ctx.message.from.id });
  if (user) {
    if (user.addBlackList && user.groupState != null) {
      await blackListModel.createBlackList({
        groupId: user.groupState,
        word: ctx.message.text,
      });
      return await ctx.reply(
        "با موفقیت اضافه شد میتوانید کلمه بعدی را وارد کنید و در صورت بازگشت دکمه /back بزنید"
      );
    }else if(user.addChannel){
      await userModel.defaultUser({userId:ctx.message.from.id})
      await groupModel.createGroup({userId:ctx.message.from.id,title:ctx.message.text,type:'channel'})
      return await ctx.reply(
       "با موفقیت اضافه شد جهت تکمیل کار به کانال مد نظر رقته و تگ /complate را بزنید و همچنین میتوانید جهت  جهت مدیرت گروه های خود تگ /manageGroup و جهت مدیریت کانال های خود تگ /manageChannel را بزنی"
      );
    }
  }  
  if (ctx.message.chat.type != "private") {
    let blackList = await blackListModel.getWords({
      groupId: ctx.message.chat.id,
    });
    let words = [];
    for (var i = 0; i < blackList.length; ++i) {
      words.push(blackList[i].word);
    }
    if (words.length) {
      if (ctx.message.text) {
        for (var i = 0; i < words.length; ++i) {
          if (ctx.message.text.includes(words[i])) {
            return ctx.telegram.deleteMessage(
              ctx.message.chat.id,
              ctx.message.message_id
            );
          }
        }
      } else if (ctx.message.caption) {
        for (var i = 0; i < words.length; ++i) {
          if (ctx.message.caption.includes(words[i])) {
            return ctx.telegram.deleteMessage(
              ctx.message.chat.id,
              ctx.message.message_id
            );
          }
        }
      }
    }
  }else{
  }
}

module.exports = {
  onMessageBot,
};

// bot.on("message", async (ctx) => {
//     if (ctx.message.chat.type == "private") {
//       if (admin.forAdmin) {
//         admin.forAdmin = false;
//         if (ctx.message.text == admin.password) {
//           admin.adminlogin = true;
//           admin.time = Date.now;
//           return await ctx.reply("ورود با موفقیت انجام شد", {
//             reply_markup: JSON.stringify({
//               inline_keyboard: [
//                 [
//                   { text: "مشاهده لیست سیاه", callback_data: "see-blackList" },
//                   {
//                     text: "افزودن کلمه به لیست سیاه ",
//                     callback_data: "addToBlackList",
//                   },
//                 ],
//               ],
//             }),
//           });
//         } else {
//           await ctx.reply("رمز وارد شده نادرست است دوباره تلاش کنید");
//         }
//       } else if (admin.addWorld) {
//         admin.addWorld = false;
//         words.push(ctx.message.text);
//         ctx.reply("با موفقیت اضافه شد", {
//           reply_markup: JSON.stringify({
//             inline_keyboard: [
//               [
//                 { text: "مشاهده لیست سیاه", callback_data: "see-blackList" },
//                 {
//                   text: "افزودن کلمه به لیست سیاه ",
//                   callback_data: "addToBlackList",
//                 },
//               ],
//             ],
//           }),
//         });
//       }
//     } else {
//       if (words.length) {
//         if (ctx.message.text) {
//           for (var i = 0; i < words.length; ++i) {
//             if (ctx.message.text.includes(words[i])) {
//               return ctx.telegram.deleteMessage(
//                 ctx.message.chat.id,
//                 ctx.message.message_id
//               );
//             }
//           }
//         }else if(ctx.message.caption){
//           for (var i = 0; i < words.length; ++i) {
//             if (ctx.message.caption.includes(words[i])) {
//               return ctx.telegram.deleteMessage(
//                 ctx.message.chat.id,
//                 ctx.message.message_id
//               );
//             }
//           }
//         }
//       }
//     }
//   });
