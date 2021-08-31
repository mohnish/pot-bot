import { getBy } from '../repositories/pot.js';

export default async function(ctx, target, data) {
  const pot = await getBy({ _id: target });

  let msg = '';
  Object.keys(pot.outcomes).forEach((outcome) => {
    msg += `${outcome}: ${pot.outcomes[outcome].join(', ')}\n`;
  });

  return await ctx.replyWithMarkdownV2(`*${pot.event}*\n\n${msg}`);
}
