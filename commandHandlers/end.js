import { Markup } from 'telegraf';
import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  if (ctx.update.message.chat.type == 'group') {
    await ctx.reply("This command works only in a private...");

    await ctx.telegram.sendMessage(ctx.update.message.from.id, "Run the /end command here");

    return;
  }

  const endablePots = await getAllBy({ status: 'active', creatorId: ctx.update.message.from.id });

  if (endablePots.length == 0) {
    return ctx.reply('No pots available');
  }

  const replyButtons = [];

  endablePots.forEach((endablePot) => {
    replyButtons.push(Markup.button.callback(endablePot.event, `selectEndingPot:${endablePot.id}:${ctx.update.message.from.username}`));
  });

  await ctx.telegram.sendMessage(ctx.update.message.chat.id, 'Which pot do you wish to end?', Markup.inlineKeyboard(replyButtons));
}
