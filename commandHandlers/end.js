import { Markup } from 'telegraf';
import { getAllBy } from '../repositories/pot.js';
import CALLBACK_QUERY_ENUMS from '../helpers/callbackQueryEnums.js';

export default async function(ctx) {
  if (ctx.update.message.chat.type != 'private') {
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
    replyButtons.push(Markup.button.callback(endablePot.event, `${CALLBACK_QUERY_ENUMS.SELECT_ENDING_POT}:${endablePot.id}:${ctx.update.message.from.username}`));
  });

  await ctx.telegram.sendMessage(ctx.update.message.chat.id, 'Which pot do you wish to end?', Markup.inlineKeyboard(replyButtons));
}
