import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  const activePots = await getAllBy({ status: 'active' });

  console.log(activePots);

  ctx.replyWithMarkdownV2('hi');
}
