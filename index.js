import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { config } from 'dotenv';
import {
  ActiveHandler,
  EndHandler,
  InfoHandler,
  JoinHandler,
  NewHandler,
  CompletedHandler,
} from './commandHandlers/commandHandlers.js';
import createPotScene from './stage/createPotScene.js';

// Bootstrap ENV vars
config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// TODO (MT): Include db middleware here

// This is to just test out the basic command API behavior
bot.command('sup', async (ctx) => {
  ctx.reply(`Hello, @${ctx.update.message.from.username}!`);
});

bot.command('active', ActiveHandler);
bot.command('completed', CompletedHandler);
bot.command('end', EndHandler);
bot.command('join', JoinHandler);
bot.command('info', InfoHandler);

bot.on('callback_query', (ctx) => {
  // `ctx.deleteMessage()` should suffice at this point
  ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id);

  // const [id, outcome] = ctx.update.callback_query.data.split(',');

  // ctx.replyWithMarkdownV2(`You're now rooting for *${outcome}* in *${db[id].event}* 🎉`);
  ctx.replyWithMarkdownV2('Inside callback_query callback');
});

const stage = new Scenes.Stage([createPotScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('new', NewHandler);

bot.launch();

// Enable graceful stop
// TODO (MT): Also handle db connection close if pool is active
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
