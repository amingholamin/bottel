const actionBot = [
    {
      actionName: "return-usertag",
      actions: async function (ctx, bot) {
        await DataBaseFunction.BackInAdmin(ctx.from.id);
  
        const MessageIdForDelete = await ctx.reply(
          Message.Manage.Other.Return,
          MarkupBtn.ButtonBot.MarkupButtonFunction()
        );
        await DataBaseFunction.upMessageId([
          ctx.from.id,
          MessageIdForDelete.message_id,
        ]);
      },
    }
  ];
  
  module.exports = {
    actionBot,
  };
  