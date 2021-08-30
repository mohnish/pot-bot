import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { config } from 'dotenv';

import {
  ActiveHandler,
  CompletedHandler,
  EndHandler,
  InfoHandler,
  JoinHandler,
  LockHandler,
  NewHandler,
} from './commandHandlers/commandHandlers.js';

import {
  DestroyPotHandler,
  EndPotHandler,
  JoinPotHandler,
  LockPotHandler,
  SelectEndingPotHandler,
  SelectPotHandler,
  ViewPotHandler,
} from './callbackQueryHandlers/callbackQueryHandlers.js';

import createPotScene from './stage/createPotScene.js';
import { getBy, update, destroy } from './repositories/pot.js';

// Bootstrap ENV vars
config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// This is to just test out the basic command API behavior
bot.command('sup', async (ctx) => {
  ctx.reply(`Hello, @${ctx.update.message.from.username}!`);
});

bot.command('active', ActiveHandler);
bot.command('completed', CompletedHandler);
bot.command('end', EndHandler);
bot.command('join', JoinHandler);
bot.command('lock', LockHandler);
bot.command('info', InfoHandler);

bot.on('callback_query', async (ctx) => {
  // ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id);
  ctx.deleteMessage();

  const [action, target, ...data] = ctx.update.callback_query.data.split(':');

  switch (action) {
  case 'selectEndingPot':
    SelectEndingPotHandler(ctx, target, data);
    break;
  case 'destroyPot':
    DestroyPotHandler(ctx, target, data);
    break;
  case 'endPot':
    EndPotHandler(ctx, target, data);
    break;
  case 'viewPot':
    ViewPotHandler(ctx, target, data);
    break;
  case 'lockPot':
    LockPotHandler(ctx, target, data);
    break;
  case 'selectPot':
    SelectPotHandler(ctx, target, data);
    break;
  case 'joinPot':
    JoinPotHandler(ctx, target, data);
    break;
  default:
    console.log('Something went wrong!');
  }
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
