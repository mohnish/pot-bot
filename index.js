import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

// Setup access to all ENV vars
config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.command('quit', (ctx) => {
  // Explicit usage
  // ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  // ctx.leaveChat()

  ctx.reply('Not yet!');
});

bot.command('sup', (ctx) => {
  // Explicit usage
  // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  ctx.reply(`<3 @${ctx.update.message.from.username}`);
});

bot.command('active', (ctx) => {
  // Respond with list of active pots
  ctx.reply('response to active');
});

bot.command('past', (ctx) => {
  // Respond with list of past pots with a date limit
  ctx.reply('response to past');
});

bot.command('upcoming', (ctx) => {
  // Respond with list of upcoming pots
  ctx.reply('response to upcoming');
});

bot.command('start', (ctx) => {
  // DB: Create new Pot with the params
  // Respond with custom keyboard
  ctx.reply('response to start');
});

bot.command('join', (ctx) => {
  // DB: Update outcome array of Pot with the ID
  const [_, id, outcome] = ctx.update.message.text.split(' ');

  ctx.reply(`You're joining ${id} and rooting for ${outcome}`);
});

bot.command('info', (ctx) => {
  ctx.reply('response to info');
});

// bot.on('callback_query', (ctx) => {
//   // Explicit usage
//   ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

//   // Using context shortcut
//   ctx.answerCbQuery()
// })

// bot.on('inline_query', (ctx) => {
//   const result = []
//   // Explicit usage
//   ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

//   // Using context shortcut
//   ctx.answerInlineQuery(result)
// })

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
