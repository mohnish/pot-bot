import { Markup } from 'telegraf';
import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  const activePots = await getAllBy({ status: 'active' });
  const replyButtons = [];

  if (activePots.length == 0) {
    return ctx.reply('No pots available');
  }

  activePots.forEach((activePot) => {
    replyButtons.push(Markup.button.callback(activePot.event, `viewPot:${activePot.id}:${ctx.update.message.from.username}`));
  });

  await ctx.telegram.sendMessage(ctx.update.message.from.id, 'Select a pot to view?', Markup.inlineKeyboard(replyButtons));
}
