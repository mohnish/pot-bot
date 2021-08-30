import { Markup } from 'telegraf';
import { getAllBy } from '../repositories/pot.js';
import CALLBACK_QUERY_ENUMS from '../helpers/callbackQueryEnums.js';

export default async function(ctx) {
  if (ctx.update.message.chat.type == 'group') {
    ctx.reply("Let's continue in private...");

    ctx.telegram.sendMessage(ctx.update.message.from.id, "Run /join command here\n\n");
    return;
  }

  const joinablePots = await getAllBy({ status: 'active', locked: false });

  if (joinablePots.length == 0) {
    return ctx.reply('No pots available');
  }

  const replyButtons = [];

  joinablePots.forEach((joinablePot) => {
    replyButtons.push(Markup.button.callback(joinablePot.event, `${CALLBACK_QUERY_ENUMS.SELECT_POT}:${joinablePot.id}:${ctx.update.message.from.username}`));
  });

  await ctx.telegram.sendMessage(ctx.update.message.from.id, 'Which pot do you wish to join?', Markup.inlineKeyboard(replyButtons));
}
