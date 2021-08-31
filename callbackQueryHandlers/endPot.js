import { getBy, update } from '../repositories/pot.js';

export default async function(ctx, target, data) {
  const pot = await getBy({ _id: target });
  const [_, finalOutcomeInNumeric] = data;
  const finalOutcome = finalOutcomeInNumeric == '1' ? pot.firstOutcome : pot.secondOutcome;

  pot.finalOutcome = finalOutcome;
  pot.status = 'completed';
  pot.locked = true;

  await update(pot);
  return await ctx.replyWithMarkdownV2(`*${pot.event}* has been marked as complete`);
}
