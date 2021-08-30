import { Markup } from 'telegraf';
import { getBy } from '../repositories/pot.js';

export default async function(ctx, target, data) {
  const pot = await getBy({ _id: target });
  const replyButtons = [];

  Object.keys(pot.outcomes).forEach((outcome) => {
    replyButtons.push(Markup.button.callback(outcome, `joinPot:${pot.id}:${ctx.update.callback_query.message.chat.username}:${outcome}`));
  });

  return await ctx.telegram.sendMessage(ctx.update.callback_query.message.chat.id, 'Choose an outcome', Markup.inlineKeyboard(replyButtons));
}
