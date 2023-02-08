const { userModel } = require("./models/user");
const { groupModel } = require("./models/group");

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
];

module.exports = {
  command,
};
