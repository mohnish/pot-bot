import { Markup } from 'telegraf';
import { getBy } from '../repositories/pot.js';

export default async function(ctx, target, data) {
  const pot = await getBy({ _id: target });
  const replyButtons = [];

  Object.keys(pot.outcomes).forEach((outcome) => {
    replyButtons.push(Markup.button.callback(outcome, `endPot:${pot.id}:${ctx.update.callback_query.message.chat.username}:${outcome}`));
  });

  replyButtons.push(Markup.button.callback('DELETE', `destroyPot:${pot.id}:${ctx.update.callback_query.message.chat.username}`));

  return await ctx.telegram.sendMessage(ctx.update.callback_query.message.chat.id, 'Select final outcome', Markup.inlineKeyboard(replyButtons));
}
