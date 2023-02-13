const { userModel } = require("./models/user");
const { groupModel } = require("./models/group");
const MarkupBtn = require('./markupButton');
const fun = require("./publickFunctions");


const command = [
  {
    commandName: "register",
    commandAction: async function (ctx, bot) {
      let user = await userModel.getUser({ userId: ctx.message.from.id });
      if (user) {
        return await ctx.reply("شما قبلا ثبت نام کردید");
      }
      await userModel.createUser({
        userId: ctx.message.from.id,
        firstName: ctx.message.from.first_name,
        lastName: ctx.message.from.last_name,
        userName: ctx.message.from.username,
        isLogin: false,
        isActive: false,
      });
      return await ctx.reply(
        "با موفقیت ثبت نام شدید لطفا در انتظار تایید مدیر بمانید"
      );
    },
  },
  {
    commandName: "addGroup",
    commandAction: async function (ctx, bot) {
      console.log("888888888888");
      console.log(ctx);
      if (ctx.message.chat.type == "private") {
        return ctx.reply(
          "این کامند را باید درگروهی بزنید که بات مدیر ان گروه باشد"
        );
      
      }
      let user = await userModel.getUser({userId:ctx.message.from.id})
      if(!user||!user.isActive){
        return ctx.reply(
          "ابتدا باید ثبت نام کنید"
        );
      }
      let group = await groupModel.getGroup({groupId:ctx.message.chat.id})
      if(group){
        return ctx.reply("این گروه قبلا ثبت شده است")
      }
      await groupModel.createGroup({
        groupId: ctx.message.chat.id,
        title: ctx.message.chat.title,
        isActive: false,
        userId: ctx.message.from.id,
        type:'group'
      });
    return  ctx.reply("با موفقیت گروه اضافه شد");
    },
  },
  {
    commandName: "addBlackWord",
    commandAction: async function (ctx, bot) {
      await userModel.changeUser({userId: ctx.message.from.id },{addBlackList:true})
      let user = await userModel.getUser({userId: ctx.message.from.id })
      if(!user||!user.groupState){
       return ctx.reply('لطفا ابتدا گروه را انتخاب کنید')
      }
      return ctx.reply('لطفا کلمات مد نظر خود را وارد کنید و اگر قصد ادامه ندارید رو تگ زیر بزنید  /back')
    },
  },
  {
    commandName: "back",
    commandAction: async function (ctx, bot) {
      await userModel.defaultUser({userId: ctx.message.from.id })
      console.log(ctx.message.from.id);
      await fun.DeleteButtonMurkUp(ctx.message.from.id, ctx);
      let a = await ctx.reply("   جهت مدیرت گروه های خود تگ /manageGroup و جهت مدیریت کانال های خود تگ /manageChannel را بزنید" )
      await userModel.changeUser({userId:ctx.message.from.id},{isLogin:true,messageID:a.message_id})

     
      return a;
      // let a =  await ctx.reply('گروه مدنظر خود را انتخاب کنید',{
      //   reply_markup: JSON.stringify({
      //     inline_keyboard: await MarkupBtn.ButtonBot.RepleyMarkupGroupAdmin(
      //       bot,ctx
      //     ),
      //   }),
      // })
      // await userModel.changeUser({userId:ctx.message.from.id },{messageID:a.message_id})

      // return a;
    },
  },
  {
    commandName: "manageGroup",
    commandAction: async function (ctx, bot) {
      await fun.DeleteButtonMurkUp(ctx.message.from.id, ctx);

      let a = await ctx.reply(" گروه های شما به شرح زیر است"   ,
    {
        reply_markup: JSON.stringify({
          inline_keyboard: await MarkupBtn.ButtonBot.RepleyMarkupGroupAdmin(
            bot,ctx,'group'
          ),
        }),
      }
      )
      await userModel.changeUser({userId:ctx.message.from.id },{isLogin:true,messageID:a.message_id})

     
      return a;
    },
  },
  {
    commandName: "manageChannel",
    commandAction: async function (ctx, bot) {
      await fun.DeleteButtonMurkUp(ctx.message.from.id, ctx);

      let a = await ctx.reply(" کانال های شما به شرح زیر است جهت اضافه کردن کانال جدید تگ /addChannel را بزنید"    ,
    {
        reply_markup: JSON.stringify({
          inline_keyboard: await MarkupBtn.ButtonBot.RepleyMarkupGroupAdmin(
            bot,ctx,'channel'
          ),
        }),
      }
      )
      await userModel.changeUser({userId:ctx.message.from.id },{isLogin:true,messageID:a.message_id})

     
      return a;
    },
  },
  {
    commandName: "addChannel",
    commandAction: async function (ctx, bot) {
      await fun.DeleteButtonMurkUp(ctx.message.from.id, ctx);
      await userModel.changeUser({userId:ctx.message.from.id },{addChannel:true,groupState:null})
      let a = await ctx.reply("نام دقیق کانال خود را وارد کنید"    ,
  
      )
      await userModel.changeUser({userId:ctx.message.from.id },{isLogin:true,messageID:a.message_id})

     
      return a;
    },
  },

  {
    commandName: "admin",
    commandAction: async function (ctx, bot) {
      await fun.DeleteButtonMurkUp(ctx.message.from.id, ctx);
      await userModel.defaultUser({userId:ctx.message.from.id})
      let a = await ctx.reply("به مدیریت خوش امدید جهت مدیریت افراد فعال تگ /activeUser و جهت مدیریت افراد غیر فعال تگ /unActiveUser را بزنید"    ,
      )
      await userModel.changeUser({userId:ctx.message.from.id },{isLogin:true,messageID:a.message_id})

     
      return a;
    },
  },
  {
    commandName: "activeUser",
    commandAction: async function (ctx, bot) {
      await fun.DeleteButtonMurkUp(ctx.message.from.id, ctx);
      await userModel.defaultUser({userId:ctx.message.from.id})
      let a = await ctx.reply("افراد فعال به شرح زیر هستند"  ,
      {
        reply_markup: JSON.stringify({
          inline_keyboard: await MarkupBtn.ButtonBot.RepleyMarkupUserAdmin(
            bot,ctx,true
          ),
        }),
      }  
      )
      await userModel.changeUser({userId:ctx.message.from.id },{isLogin:true,messageID:a.message_id})

     
      return a;
    },
  },
  {
    commandName: "unActiveUser",
    commandAction: async function (ctx, bot) {
      await fun.DeleteButtonMurkUp(ctx.message.from.id, ctx);
      await userModel.defaultUser({userId:ctx.message.from.id})
      let a = await ctx.reply("افراد غیر فعال به شرح زیر هستند"  ,
      {
        reply_markup: JSON.stringify({
          inline_keyboard: await MarkupBtn.ButtonBot.RepleyMarkupUserAdmin(
            bot,ctx,false
          ),
        }),
      }  
      )
      await userModel.changeUser({userId:ctx.message.from.id },{isLogin:true,messageID:a.message_id})

     
      return a;
    },
  },

  
];

module.exports = {
  command,
};
