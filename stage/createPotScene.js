import { Scenes } from 'telegraf';
import { save as savePot } from '../repositories/pot.js';

const createPotScene = new Scenes.WizardScene('create-new-pot',
  async (ctx) => {
    await ctx.replyWithMarkdownV2(`*Enter the name of your pot*: _eg: Barca vs RMA_`);

    ctx.wizard.state.data = {
      userId: ctx.update.message.from.id,
      username: ctx.update.message.from.username,
    };

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.event = ctx.message.text.replace(/[^A-Za-z\s]+/g, '');

    await ctx.replyWithMarkdownV2(`Enter the *1st outcome* for *${ctx.wizard.state.data.event}*: _eg: Barca wins_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.firstOutcome = ctx.message.text.replace(/[^A-Za-z\s]+/g, '');

    await ctx.replyWithMarkdownV2(`Enter the *2nd outcome* for *${ctx.wizard.state.data.event}*: _eg: RMA wins_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.secondOutcome = ctx.message.text.replace(/[^A-Za-z\s]+/g, '');

    await ctx.replyWithMarkdownV2(`*How much is the Buy in?* _a numeric value_`);

    await ctx.wizard.next();
  },
  async (ctx) => {
    let buyIn = Number(ctx.message.text.replace(/[^0-9.-]+/g, ''));

    if (buyIn == 0) {
      return await ctx.reply('Please enter a numeric value');
    }

    ctx.wizard.state.data.buyIn = String(buyIn);

    ctx.wizard.state.data.outcomes = {
      [ctx.wizard.state.data.firstOutcome]: [],
      [ctx.wizard.state.data.secondOutcome]: [],
    };

    ctx.wizard.state.data.status = 'active';
    ctx.wizard.state.data.locked = false;
    ctx.wizard.state.data.creatorId = ctx.wizard.state.data.userId;
    ctx.wizard.state.data.createdAt = new Date();

    try {
      await savePot(ctx.wizard.state.data);
      await ctx.replyWithMarkdownV2(`Successfully created the pot: *${ctx.wizard.state.data.event}*`);
    } catch (e) {
      console.log(e);
      await ctx.replyWithMarkdownV2('Starting the pot failed, please try again');
    }

    await ctx.scene.leave();
  }
);

export default createPotScene;
