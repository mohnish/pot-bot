import { Markup } from 'telegraf';
import { getBy } from '../repositories/pot.js';
import CALLBACK_QUERY_ENUMS from '../helpers/callbackQueryEnums.js';

export default async function(ctx, target, data) {
  const pot = await getBy({ _id: target });
  const replyButtons = [];

  replyButtons.push(Markup.button.callback(pot.firstOutcome, `${CALLBACK_QUERY_ENUMS.END_POT}:${pot.id}:${ctx.update.callback_query.message.chat.username}:1`));
  replyButtons.push(Markup.button.callback(pot.secondOutcome, `${CALLBACK_QUERY_ENUMS.END_POT}:${pot.id}:${ctx.update.callback_query.message.chat.username}:2`));
  replyButtons.push(Markup.button.callback('🗑', `${CALLBACK_QUERY_ENUMS.DESTROY_POT}:${pot.id}:${ctx.update.callback_query.message.chat.username}`));

  return await ctx.telegram.sendMessage(ctx.update.callback_query.message.chat.id, 'Select final outcome', Markup.inlineKeyboard(replyButtons));
}
