import { Scenes } from 'telegraf';

const createPotScene = new Scenes.WizardScene('create-new-pot',
  async (ctx) => {
    await ctx.replyWithMarkdownV2(`*Enter the name of your pot*: _eg: Barca vs RMA_`);

    ctx.wizard.state.data = {
      userId: ctx.update.message.from.id
    };

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.event = ctx.message.text;

    await ctx.replyWithMarkdownV2(`Enter the 1st outcome for *${ctx.wizard.state.data.event}*: _eg: Barca wins_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.first = ctx.message.text;

    await ctx.replyWithMarkdownV2(`Enter the 2nd outcome for *${ctx.wizard.state.data.event}*: _eg: RMA wins_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.second = ctx.message.text;

    await ctx.replyWithMarkdownV2(`*How much is the Buy in?* _eg: $5_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.buyIn = ctx.message.text;

    await ctx.replyWithMarkdownV2(`*When does your pot activate?*`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.startAt = ctx.message.text;

    await ctx.replyWithMarkdownV2(`*When does your pot deactivate?*`);

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

    await ctx.replyWithMarkdownV2(`Successfully created the pot: *${db[counter].event}*`);

    await ctx.scene.leave();
  }
);

export default createPotScene;
