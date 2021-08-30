import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { Agenda } from 'agenda';
import { config } from 'dotenv';
import {
  ActiveHandler,
  EndHandler,
  InfoHandler,
  JoinHandler,
  NewHandler,
  PastHandler,
  UpcomingHandler,
} from './commandHandlers/commandHandlers.js';
import createPotScene from './stage/createPotScene.js';

const agenda = new Agenda({ db: { address: process.env.DB_CONN_URL_DEV } });

agenda.define('test sup command', async (job) => {
    const { msg, ctx } = job.attrs.data;

    try {
      await ctx.reply(msg);
    } catch (e) {
      console.log('errrrrrr', e);
    }

  }
);

// Bootstrap ENV vars
config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// TODO (MT): Include db middleware here

// This is to just test out the basic command API behavior
bot.command('sup', async (ctx) => {
  await agenda.start();

  agenda.schedule('in 3 seconds', 'test sup command', {
    msg: `task scheduled at ${new Date}`,
    ctx
  });

  ctx.reply(`<3 @${ctx.update.message.from.username}`);
});

bot.command('active', ActiveHandler);
bot.command('past', PastHandler);
bot.command('upcoming', UpcomingHandler);
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
