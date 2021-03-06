import { Markup } from 'telegraf';
import { getAllBy } from '../repositories/pot.js';
import CALLBACK_QUERY_ENUMS from '../helpers/callbackQueryEnums.js';

export default async function(ctx) {
  const activePots = await getAllBy({ status: 'active', locked: false, creatorId: ctx.update.message.from.id });
  const replyButtons = [];

  if (activePots.length == 0) {
    ctx.reply('No pots available to lock!');
    return;
  }

  activePots.forEach((activePot) => {
    replyButtons.push(Markup.button.callback(activePot.event, `${CALLBACK_QUERY_ENUMS.LOCK_POT}:${activePot.id}:${ctx.update.message.from.username}`));
  });

  await ctx.telegram.sendMessage(ctx.update.message.from.id, 'Select a pot to lock?', Markup.inlineKeyboard(replyButtons));
}
