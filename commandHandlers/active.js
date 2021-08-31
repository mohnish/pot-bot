import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  const activePots = await getAllBy({ status: 'active' });

  if (activePots.length == 0) {
    return await ctx.reply('No pots available');
  }

  let msg = '*ACTIVE POTS*\n\n';

  activePots.forEach((activePot) => {
    let emoji = activePot.locked ? "⛔️" : "➡️";
    msg += `${emoji} *${activePot.event}* 💰*${activePot.buyIn}*💰\n`;
    msg += `${activePot.firstOutcome}: _*${activePot.outcomes[activePot.firstOutcome].join(', ')}*_\n`;
    msg += `${activePot.secondOutcome}: _*${activePot.outcomes[activePot.secondOutcome].join(', ')}*_\n\n`;
  });

  ctx.replyWithMarkdownV2(msg);
}
