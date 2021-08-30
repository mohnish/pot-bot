import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  const activePots = await getAllBy({ status: 'active' });

  console.log(activePots);

  let msg = '*Active Pots*\n\n';
  let counter = 0;

  activePots.forEach((activePot) => {
    msg += `*${++counter}* ${activePot.event}`;
  });

  ctx.replyWithMarkdownV2(msg);
}
