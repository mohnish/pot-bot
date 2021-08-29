export default async function(ctx) {
  // DB: Update outcome array of Pot with the ID
  const [_, id] = ctx.update.message.text.split(' ');

  if (ctx.update.message.chat.type == 'group') {
    ctx.reply("Let's continue in private...");

    ctx.telegram.sendMessage(ctx.update.message.from.id, "Usage: /join POT_ID\n\nUse /upcoming to see a list of pots you can join or create one yourself by using /new");
    return;
  }

  if (!id) {
    ctx.reply('Usage: /join POT_ID\n\nUse /upcoming to see a list of pots you can join or create one yourself by using /new');
    return;
  }

  // let outcomes = Object.keys(db[id].outcomes);

  // TODO (MT): Switch to use Markup.inlineKeyboard()
  // ctx.telegram.sendMessage(ctx.update.message.from.id, 'What outcome are you rooting for?', {
  //   reply_markup: {
  //     inline_keyboard: [[{ text: outcomes[0], callback_data: `${id},${outcomes[0]}` }, { text: outcomes[1], callback_data: `${id},${outcomes[1]}` }]]
  //   }
  // });
}
