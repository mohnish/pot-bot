import { getBy, update } from '../repositories/pot.js';

export default async function(ctx, target, data) {
  const [username, selectedOutcomeInNumeric] = data;
  const pot = await getBy({ _id: target });

  const selectedOutcome = selectedOutcomeInNumeric == '1' ? pot.firstOutcome : pot.secondOutcome;

  const outcomes = pot.outcomes;

  Object.keys(outcomes).forEach((outcome) => {
    outcomes[outcome] = new Set(outcomes[outcome]);
    outcomes[outcome].delete(username);
  });

  outcomes[selectedOutcome].add(username);

  Object.keys(outcomes).forEach((outcome) => {
    outcomes[outcome] = Array.from(outcomes[outcome]);
  });

  pot.outcomes = outcomes;

  await update(pot);

  let msg = '';

  Object.keys(outcomes).forEach((outcome) => {
    msg += `${outcome}: ${Array.from(outcomes[outcome]).join(', ')}\n`;
  });

  return await ctx.replyWithMarkdownV2(`Joined pot successfully:\n${msg}`);
}
