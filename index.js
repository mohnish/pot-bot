import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { config } from 'dotenv';
import express from 'express';

import {
  ActiveHandler,
  CompletedHandler,
  EndHandler,
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

import CALLBACK_QUERY_ENUMS from './helpers/callbackQueryEnums.js';
import createPotScene from './stage/createPotScene.js';
import { getBy, update, destroy } from './repositories/pot.js';

// Bootstrap ENV vars
config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const app = express();

// This is to just test out the basic command API behavior
bot.command('sup', async (ctx) => {
  ctx.reply(`Hello, @${ctx.update.message.from.username}!`);
});

bot.command('active', ActiveHandler);
bot.command('completed', CompletedHandler);
bot.command('end', EndHandler);
bot.command('join', JoinHandler);
bot.command('lock', LockHandler);

bot.on('callback_query', async (ctx) => {
  // ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id);
  ctx.deleteMessage();

  const [action, target, ...data] = ctx.update.callback_query.data.split(':');

  switch (action) {
  case CALLBACK_QUERY_ENUMS.SELECT_ENDING_POT:
    SelectEndingPotHandler(ctx, target, data);
    break;
  case CALLBACK_QUERY_ENUMS.DESTROY_POT:
    DestroyPotHandler(ctx, target, data);
    break;
  case CALLBACK_QUERY_ENUMS.END_POT:
    EndPotHandler(ctx, target, data);
    break;
  case CALLBACK_QUERY_ENUMS.VIEW_POT:
    ViewPotHandler(ctx, target, data);
    break;
  case CALLBACK_QUERY_ENUMS.LOCK_POT:
    LockPotHandler(ctx, target, data);
    break;
  case CALLBACK_QUERY_ENUMS.SELECT_POT:
    SelectPotHandler(ctx, target, data);
    break;
  case CALLBACK_QUERY_ENUMS.JOIN_POT:
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
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.get('/', (req, res) => {
  res.send('Welcome to Pot Bot!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
