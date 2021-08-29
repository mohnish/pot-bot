export default async function(ctx) {
  // DB: Create new Pot with the params
  // Respond with custom keyboard

  if (ctx.update.message.chat.type == 'group') {
    ctx.reply("Let's continue in private...");

    ctx.telegram.sendMessage(ctx.update.message.from.id, "Click or Tap /new to get started");
  } else {
    ctx.scene.enter('create-new-pot');
  }
}
