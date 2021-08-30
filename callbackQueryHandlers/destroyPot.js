import { getBy, destroy } from '../repositories/pot.js';

export default async function(ctx, target, data) {
  const pot = await getBy({ _id: target });

  await destroy(target);

  return await ctx.replyWithMarkdownV2(`*${pot.event}* has been deleted`);
}
