import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('quit', async (ctx) => {
    console.log(1);
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id);
  
    // Using context shortcut
    await ctx.leaveChat();
});



bot.on('text', async (ctx) => {
    console.log(2);
    // Explicit usage
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state}`);
});

bot.on('callback_query', async (ctx) => {
    console.log(3);
    // Explicit usage
    await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

    // Using context shortcut
    await ctx.answerCbQuery();
});

bot.on('inline_query', async (ctx) => {
    console.log(4);
    const result = [];
    // Explicit usage
    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

    // Using context shortcut
    await ctx.answerInlineQuery(result);
});

console.log("Bot has successfully launched")
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));