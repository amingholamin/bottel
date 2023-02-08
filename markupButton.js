const{blackListModel} = require('./models/blackList');
const{groupModel} = require('./models/group');
const{userModel} = require('./models/user');



class ButtonBot {

   
static async  RepleyMarkupGroupAdmin(bot,ctx) {
    const userGroup = await groupModel.getGroupUser({userId:ctx.from.id})

    const options = userGroup.map((x) => [{ text: x.title, callback_data: x.id }]);
    console.log("777777777777");
    console.log(userGroup);
    userGroup.forEach((element) => {
      bot.action(`${element.id}`, async (ctx) => {
      console.log("888888888888888888888");
        ctx.answerCbQuery('گروه شما انتخاب شد');

        let blackList = await blackListModel.getWords({groupId:element.groupId});
        let b = [];
        console.log("555555555555");
        for(var i=0;i<blackList.length;++i){
            let r =[]
            let bg ={};
            bg.text=blackList[i].word
            bg.callback_data=blackList[i].id
            r.push(bg)
            b.push(r)
        }
        console.log(b);
  
        ctx.reply("کلمات شما به شرح زیر است اگر بر روی هر کدام کلیک کنید به منظور خذف خواهد بود و با تگ زیر میتوانید کلمه جدید را اضافه کنید /addBlackWord", {
            reply_markup: JSON.stringify({
              inline_keyboard:b
            }),
          });
  
      //  messageid = MessageIdForDelete.message_id;
      });
    });
    return options;
  }
      

    
}

module.exports = {
  ButtonBot,
};
