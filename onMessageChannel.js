const { userModel } = require("./models/user");
const { blackListModel } = require("./models/blackList");
const { groupModel } = require("./models/group");
async function onMessageChannelBot(bot, ctx) {
  if (ctx.channelPost.text == "/complate") {
    let group = await groupModel.getGroup({
      title: ctx.channelPost.chat.title,
      groupId: null,
    });
    if (!group) {
     return ctx.reply("موردی یافت نشد");
    }
    await groupModel.Change(
      { title: ctx.channelPost.chat.title, groupId: null },
      { groupId: ctx.channelPost.chat.id }
    );
    return ctx.reply("با موفقیت فعال شد");
  } else {
    let blackList = await blackListModel.getWords({
      groupId: ctx.channelPost.chat.id,
    });
    let words = [];
    for (var i = 0; i < blackList.length; ++i) {
      words.push(blackList[i].word);
    }
    if (words.length) {
      
      if (ctx.channelPost.text) {
        for (var i = 0; i < words.length; ++i) {
          if (ctx.channelPost.text.includes(words[i])) {
            return ctx.telegram.deleteMessage(
              ctx.channelPost.chat.id,
              ctx.channelPost.message_id
            );
          }
        }

      }
      
      else if (ctx.channelPost.caption) {
        for (var i = 0; i < words.length; ++i) {
          if (ctx.channelPost.caption.includes(words[i])) {
            return ctx.telegram.deleteMessage(
              ctx.channelPost.chat.id,
              ctx.channelPost.message_id
            );
          }
        }
      }
    }
  }

}

module.exports = {
  onMessageChannelBot,
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
