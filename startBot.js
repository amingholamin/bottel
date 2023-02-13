const {userModel} = require('./models/user');
const MarkupBtn = require('./markupButton');

async function Start(bot,ctx){
    let userId = ctx.message.from.id;
  await userModel.defaultUser({userId:userId})
    let result = await userModel.isUserExit({userId});
    if(result=="notUser"){
    await ctx.reply('/register  شما هنوز ثبت نام نکردید جهت ثبت نام    کلیک کنید')
    }
    else if(result=="ok"){

    let a = await ctx.reply("  خوش آمدید جهت مدیرت گروه های خود تگ /manageGroup و جهت مدیریت کانال های خود تگ /manageChannel را بزنید" )
      await userModel.changeUser({userId},{isLogin:true,messageID:a.message_id})

     
      return a;
    }
    else{
    await ctx.reply("هنوز شما تایید نشده اید")
    }
}


module.exports={
    Start
}