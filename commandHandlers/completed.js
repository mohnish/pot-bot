import { getAllBy } from '../repositories/pot.js';

export default async function(ctx) {
  const completedPots = await getAllBy({ status: 'completed' });

  let msg = '*COMPLETED POTS*\n\n';

  completedPots.forEach((completedPot) => {
    let buyIn = Number(completedPot.buyIn.replace(/[^0-9.-]+/g, ''));;
    let totalWinners = completedPot.outcomes[completedPot.finalOutcome].length;
    let losingOutcome = completedPot.finalOutcome == completedPot.firstOutcome ? completedPot.secondOutcome : completedPot.firstOutcome;
    let totalLosers = completedPot.outcomes[losingOutcome].length;
    let totalWinningsPerHead = (buyIn * totalLosers) / totalWinners;
    let victoryEmoji = totalWinningsPerHead == 0 ? '🙈' : '🎉';
    let winningMsg = '';

    if (totalWinners == 0) {
      winningMsg = '🙅 Nobody won';
    } else if (totalWinners == 1) {
      winningMsg = `${victoryEmoji} *${completedPot.outcomes[completedPot.finalOutcome].join(', ')}* has won *$${totalWinningsPerHead}*\n\n`
    } else {
      winningMsg = `${victoryEmoji} *${completedPot.outcomes[completedPot.finalOutcome].join(', ')}* have each won *$${totalWinningsPerHead}*\n\n`
    }

    msg += `☑️ *${completedPot.event}*\n`;
    msg += winningMsg;
  });

  ctx.replyWithMarkdownV2(msg);
}
