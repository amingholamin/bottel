const { Telegraf } = require("telegraf");
const {userModel} = require('./models/user');
const {Start} = require('./startBot');
const commandBot = require("./commandBot");
const actionBot = require("./actionBot");
const onMessageBot = require('./onMessage');
const onMessageChannelBot = require('./onMessageChannel');

require("dotenv").config();

const bot = new Telegraf(process.env.KEY, {
  telegram: {
    apiRoot: process.env.API_ROOT,
  }
});
commandBot.command.forEach((e) => {
  bot.command(e.commandName, async (ctx) => {
    await e.commandAction(ctx, bot);
  });
});

actionBot.actionBot.forEach((e) => {
  bot.action(e.actionName, (ctx) => {
    e.actions(ctx, bot);
  });
});


bot.start(async(ctx) => {
await Start(bot,ctx);
});

bot.on('channel_post',async (ctx, next) => {
 await onMessageChannelBot.onMessageChannelBot(bot,ctx)

})

bot.on("message", async (ctx) => {
  await onMessageBot.onMessageBot(bot, ctx);
});














// bot.action("see-blackList", async (ctx) => {
//   await ctx.reply(`this is black list `,
  
//   {
//     reply_markup: JSON.stringify({
//       inline_keyboard: [
//         [
//           { text: "مشاهده لیست سیاه", callback_data: "see-blackList" },
//           {
//             text: "افزودن کلمه به لیست سیاه ",
//             callback_data: "addToBlackList",
//           },
//         ],
//       ],
//     }),
//   }
  
//   );
// });
// bot.action("addToBlackList", async (ctx) => {
//   admin.addWorld = true;
//   ctx.reply("کلمه یا عبارت جدید را وارد کنید");
// });



// bot.command("/admin", async (ctx) => {
//   admin.forAdmin = true;
//   await ctx.reply("لطفا رمز عبور را وارد کنید");
// });



bot.launch();