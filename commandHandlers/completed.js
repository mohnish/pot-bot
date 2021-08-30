import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  // FIXME (MT): Also add date filter to limit to past 2 days
  const pastPots = await getAllBy({ status: 'completed' });
  console.log(pastPots);

  let msg = '*Completed Pots*\n\n';
  let counter = 0;

  pastPots.forEach((pastPot) => {
    msg += `*${++counter}* ${pastPot.event}\n`;
  });

  ctx.replyWithMarkdownV2(msg);
}
