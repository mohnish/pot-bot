import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { config } from 'dotenv';

// Setup access to all ENV vars
config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// primary key lol
let counter = 1;

// in-mem db
const db = {
  [counter]: {
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

bot.command('sup', (ctx) => {
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

bot.command('conclude', (ctx) => {
  // DB: Update a pot and mark it as complete
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

  // TODO (MT): Switch to use Markup.inlineKeyboard()
  ctx.telegram.sendMessage(ctx.update.message.from.id, 'What outcome are you rooting for?', {
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
  ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id);

  const [id, outcome] = ctx.update.callback_query.data.split(',');

  db[id].outcomes[outcome].push(ctx.update.callback_query.from.username);

  ctx.replyWithMarkdownV2(`You're now rooting for *${outcome}* in *${db[id].event}* 🎉`);
});

const createNewPotWizard = new Scenes.WizardScene('create-new-pot',
  async (ctx) => {
    await ctx.replyWithMarkdownV2(`*Enter the name of your pot*: _eg: FC Barcelona vs Real Madrid_`);

    ctx.wizard.state.data = {
      userId: ctx.update.message.from.id
    };

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.event = ctx.message.text;

    await ctx.replyWithMarkdownV2(`Enter the 1st outcome for *${ctx.wizard.state.data.event}*: _eg: FC Barcelona wins_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.first = ctx.message.text;

    await ctx.replyWithMarkdownV2(`Enter the 2nd outcome for *${ctx.wizard.state.data.event}*: _eg: Real Madrid wins_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.second = ctx.message.text;

    await ctx.replyWithMarkdownV2(`How much is the Buy in? _eg: $5_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.buyIn = ctx.message.text;

    await ctx.replyWithMarkdownV2(`When do you want to start the pot?`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.startAt = ctx.message.text;

    await ctx.replyWithMarkdownV2(`When do you want to stop the pot?`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.stopAt = ctx.message.text;

    console.log('Pot data', ctx.wizard.state.data);

    db[++counter] = {
      event: ctx.wizard.state.data.event,
      outcomes: {
        [ctx.wizard.state.data.first]: [],
        [ctx.wizard.state.data.second]: [],
      },
      buyIn: ctx.wizard.state.data.buyIn,
      startAt: ctx.wizard.state.data.startAt,
      stopAt: ctx.wizard.state.data.stopAt,
      status: 'scheduled',
      creatorId: `@${ctx.message.from.username}`,
      createdAt: new Date()
    }

    await ctx.reply('Done!');

    await ctx.scene.leave();
  }
);

const stage = new Scenes.Stage([createNewPotWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.command('new', async (ctx) => {
  // DB: Create new Pot with the params
  // Respond with custom keyboard

  if (ctx.update.message.chat.type == 'group') {
    ctx.reply("Let's switch to private chat...");

    ctx.telegram.sendMessage(ctx.update.message.from.id, "Click or Tap /new to get started");
  } else {
    ctx.scene.enter('create-new-pot');
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
