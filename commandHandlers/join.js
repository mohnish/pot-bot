import { Markup } from 'telegraf';
import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  if (ctx.update.message.chat.type == 'group') {
    ctx.reply("Let's continue in private...");

    ctx.telegram.sendMessage(ctx.update.message.from.id, "Run /join command here\n\n");
    return;
  }

  const joinablePots = await getAllBy({ status: 'active', locked: false });
  const replyButtons = [];

  joinablePots.forEach((joinablePot) => {
    replyButtons.push(Markup.button.callback(joinablePot.event, `selectPot:${joinablePot.id}:${ctx.update.message.from.username}`));
  });

  // TODO (MT): Switch to use Markup.inlineKeyboard()
  // ctx.telegram.sendMessage(ctx.update.message.from.id, 'Which outcome are you rooting for?', {
  //   reply_markup: {
  //     inline_keyboard: [[{ text: outcomes[0], callback_data: `${id},${outcomes[0]}` }, { text: outcomes[1], callback_data: `${id},${outcomes[1]}` }]]
  //   }
  // });
  // await ctx.replyWithMarkdownV2(`hi [${ctx.update.message.from.first_name}](tg://user?id=${ctx.update.message.from.id})`);
  await ctx.telegram.sendMessage(ctx.update.message.from.id, 'Which pot do you wish to join?', Markup.inlineKeyboard(replyButtons));
}
