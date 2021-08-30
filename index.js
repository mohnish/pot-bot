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
import { getBy } from './repositories/pot.js';

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

bot.on('callback_query', async (ctx) => {
  // ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id);
  ctx.deleteMessage();

  const [action, target, ...data] = ctx.update.callback_query.data.split(':');

  switch (action) {
  case 'selectPot':
    const selectedPot = await getBy({ _id: target });
    const replyButtons = [];

    Object.keys(selectedPot.outcomes).forEach((outcome) => {
      replyButtons.push(Markup.button.callback(outcome, `joinPot:${selectedPot.id}:${ctx.update.callback_query.message.chat.username}:${outcome}`));
    });

    await ctx.telegram.sendMessage(ctx.update.callback_query.message.chat.id, 'Choose an outcome', Markup.inlineKeyboard(replyButtons));

    break;
  case 'joinPot':
    const [username, selectedOutcome] = data;
    const joiningPot = await getBy({ _id: target });
    const outcomes = joiningPot.outcomes;

    Object.keys(outcomes).forEach((outcome) => {
      outcomes[outcome] = new Set(outcomes[outcome]);
      outcomes[outcome].delete(username);
    });

    outcomes[selectedOutcome].add(username);

    joiningPot.outcomes = outcomes;

    await joiningPot.save();

    let msg = '';
    Object.keys(outcomes).forEach((outcome) => {
      msg += `${outcome}: ${Array.from(outcomes[outcome]).join(', ')}\n`;
    });

    await ctx.replyWithMarkdownV2(`Pot outcome:\n${msg}`);
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
