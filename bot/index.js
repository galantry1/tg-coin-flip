const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Заменить на свой токен от @BotFather
const token = '8367302122:AAFF4M2Z_6QGPY1cZwzbHnjJy7QMxTqkDJM';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Играть в Coin Flip 🎮',
            web_app: { url: 'https://tg-coin-flip.vercel.app/' },
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, 'Добро пожаловать в игру Coin Flip! 🎉', opts);
});

// Express для хоста (на будущее, например для WebApp данных)
app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
