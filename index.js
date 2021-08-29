import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

// Setup access to all ENV vars
config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// temp db

const db = {
  1: {
      event: 'Barca vs Madrid',
      outcomes: {
        'Barca': [],
        'Madrid': [],
      },
      buyIn: '$5',
      startAt: new Date(),
      stopAt: new Date(),
      status: 'active',
      creatorId: '@TheZenBull',
      createdAt: new Date()
    }
};

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

bot.command('new', (ctx) => {
  // DB: Create new Pot with the params
  // Respond with custom keyboard
  ctx.reply('response to new');
});

bot.command('join', (ctx) => {
  // DB: Update outcome array of Pot with the ID
  const [_, id] = ctx.update.message.text.split(' ');

  if (!id) {
    let msg = 'Usage: /join POT_ID\n\nUse /upcoming to see a list of pots you can join or create one yourself by using /new';
    ctx.reply(msg);
    return;
  }

  let outcomes = Object.keys(db[id].outcomes);

  ctx.telegram.sendMessage(ctx.message.chat.id, 'What outcome are you rooting for?', {
    reply_markup: {
      inline_keyboard: [[{ text: outcomes[0], callback_data: `${id},${outcomes[0]}` }, { text: outcomes[1], callback_data: `${id},${outcomes[1]}` }]]
    }
  });
});

bot.command('info', (ctx) => {
  const [_, id] = ctx.update.message.text.split(' ');

  if (!id) {
    ctx.reply('Usage: /info POT_ID');
    return;
  }

  let str = '';

  Object.keys(db[id].outcomes).forEach((outcome) => {
    let members = db[id].outcomes[outcome];
    str += `${outcome} wins: ${members}`
  });

  ctx.reply(str);
});

bot.on('callback_query', (ctx) => {
  // // Explicit usage
  // ctx.telegram.answerCbQuery(ctx.callbackQuery.id)
  // // Using context shortcut
  // ctx.answerCbQuery()

  ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id);

  const [id, outcome] = ctx.update.callback_query.data.split(',');

  db[id].outcomes[outcome].push(ctx.update.callback_query.from.username);

  ctx.replyWithMarkdownV2(`You're now rooting for *${outcome}* in *${db[id].event}* 🎉`);
});

bot.on('inline_query', (ctx) => {
  // const result = [];
  // // Explicit usage
  // ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // // Using context shortcut
  // ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
