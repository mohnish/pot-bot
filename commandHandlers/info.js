export default async function(ctx) {
  const [_, id] = ctx.update.message.text.split(' ');

  if (!id) {
    ctx.reply('Usage: /info POT_ID\n\nUse /upcoming to see a list of pots you can join or create one yourself by using /new');
    return;
  }

  let str = `Pot: *${db[id].event}*\n\n`;

  Object.keys(db[id].outcomes).forEach((outcome) => {
    let members = db[id].outcomes[outcome];
    str += `*${outcome}*: ${members.join(', ')}\n`
  });

  ctx.replyWithMarkdownV2(str);
}
