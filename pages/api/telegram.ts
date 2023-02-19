// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import config from '@/config/config';
import type { NextApiRequest, NextApiResponse } from 'next';

const TelegramBot = require('node-telegram-bot-api');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      ['🗂Наша История', '🤝Подписки', '🆓Бесплатный Канал'],
      ['🎓Обучение', '📣Задать Вопрос'],
    ],
  },
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg: any, match: any) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  //   bot.sendMessage(chatId, resp);
  bot.sendPhoto(chatId, 'https://i.stack.imgur.com/wfCdc.png');
});

// Listener (handler) for callback data from /label command
bot.on('callback_query', (callbackQuery: any) => {
  const message = callbackQuery.message;
  const category = callbackQuery.data;

  // URLLabels.push({
  //     url: tempSiteURL,
  //     label: category,
  // });

  // tempSiteURL = '';

  bot.sendMessage(
    message.chat.id,

    `URL has been labeled with category "${category}"`
  );
});

bot.onText(/\/start/, (msg: any, [source, match]: any) => {
  const {
    chat: { id },
  } = msg;
  bot.sendMessage(
    id,
    `
  👊Давайте знакомиться

Как вы уже поняли, мы занимается инвестициями в криптовалюты.
Наша команда создала этот Бот для удобства работы с подписчиками.
⬇️Ниже вы видите ключевые разделы нашего проекта

Советуем продолжить знакомство с истории нашей команды🗂`,
    {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          ['🗂Наша История', '🤝Подписки', '🆓Бесплатный Канал'],
          ['🎓Обучение', '📣Задать Вопрос'],
        ],
      },
    }
  );
});
bot.onText(/\/menu/, (msg: any) => {
  const requestPhoneKeyboard = {
    reply_markup: {
      // one_time_keyboard: true,
      resize_keyboard: true,
      keyboard: [
        ['🗂Наша История', '🤝Подписки', '🆓Бесплатный Канал'],
        ['🎓Обучение', '📣Задать Вопрос'],
      ],
    },
  };
  bot.sendMessage(msg.chat.id, 'Вот наше меню', requestPhoneKeyboard);
});

// Listen for any kind of message. There are different kinds of
// messages.
// Listener (handler) for showcasing different keyboard layout
bot.onText(/🗂Наша История/, (msg: any) => {
  bot.sendMessage(
    msg.chat.id,
    `
    👋Привет, хотим немного рассказать о себе, чтобы вы понимали кто мы и чем занимаемся. 

Мы команда, которая на данный момент специализируется на криптовалютах и всем, что связано с ними. Пришли мы в этот рынок, после 12 лет опыта на фондовом рынке, осознав две простые закономерности:

♻️Все рынки похожи и развиваются одинаково. 
💲Чем моложе рынок, тем больше на нем можно заработать. 

Наш опыт фондового рынка позволяет нам анализировать и распределять наш капитал с максимальной выгодой для нас. У нас в команде 8 человек, каждый из которых занимается своим направление и полностью погружен в него. Никто из нас по отдельности не может принять решение о покупке или продаже активов, любое решение должно быть согласовано со всеми членами команды, это значительно снижает риски.

Работаем с 3 направлениями⬇️

1️⃣Спотовая Торговля - подразумевает непосредственную покупку и продажу финансовых инструментов и активов. При торговле на спотовых рынках используются только те активы, которыми вы владеете — без кредитного плеча или маржи.

2️⃣Фьючерсная Торговля - подразумевает сделки без покупки самого актива, с возможным наличием кредитного плеча, что увеличивает как скорость заработка, так и скорость потери активов. 

🔜IDO/IEO/ICO - Coming Soon

🛑Сейчас крипто-рынок находится в самом начале своего развития и наш долг на этом заработать. Если вы хотите развиваться и зарабатывать с нами, то присоединяйтесь❗️

Приятно познакомиться😉
    `,
    {}
  );
});
bot.onText(/🤝Подписки/, (msg: any) => {
  bot.sendMessage(
    msg.chat.id,
    `
    На данный момент в нашем проекте есть 2 варианта подписки. 
Узнать про каждую подписку более подробно, можно нажав кнопки ниже⬇️
    `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Development',
              callback_data: 'development',
            },
          ],
          [
            {
              text: 'Other',
              callback_data: 'other',
            },
          ],
        ],
      },
    }
  );
});
bot.onText(/🆓Бесплатный Канал/, (msg: any) => {
  bot.sendMessage(
    msg.chat.id,
    `
  🔥Тут вы сможете найти самые актуальные новости, разборы монет, различные инвестиционные идеи и многое другое. 

🤫Также именно в канале вы сможете узнать о запуске новых подписок, скидок и остальных бонусов для нашего комьюнити.

Подписывайтесь, не пожалеете - https://t.me/+osqaV7WB3JZhOWVk`,
    {}
  );
});
bot.onText(/🎓Обучение/, (msg: any) => {
  bot.sendMessage(
    msg.chat.id,
    `
    😏Мы знаем что многие из вас разочарованы в рынке, разочарованы в крипте, в левых телеграмм каналах и так далее….

Многие теряют деньги на рынке, теряют много денег, но все это по большей части из-за необразованности на рынке и не понимании базовых вещей которые могут привести вас к успеху либо уберечь от потерь. Большая часть участников пришла на рынок в этом году в булл ран, в надежде на вечный рост, но к сожалению рынок не падает и не растет вечно, рынок движется циклами. 

Но давайте наша команда постарается вам помочь разобраться в базовых вещах

1️⃣Трудолюбие

Трейдинг - это не легко, но немного легче чем за заводе. Деньги с неба Вам не упадут. Вам нужно работать, работать в первую очередь над собой и своими знаниями. Если ты готов выделять все свое свободное время на изучение материалов, анализ графиков,   постоянно учится, тогда ты сможешь найти себя в трейдинге.

2️⃣Разочарование

Если ты пришёл в трейдинг, и думаешь что тут ты сразу заработаешь на первую Ламбу, обеспечишь жизнь себе и своим подругам. Нет, для того что бы начать зарабатывать деньги, нужно набить руку, и получить хороший опыт.

3️⃣Психика

Ты будешь временами переживать сильнейший стресс, ты должен быть готов что рынок будет давить на тебя психически и выжимать все соки. От трейдинга нужно переодически хорошо отдыхать.

4️⃣Казино

Трейдинг Криптовалюты - это не казино, это не ставки на спорт. Это немного иное что ты можешь контролировать и предугадать в 70% случаев.

5️⃣Стратегия

Для того что бы начать торговать успешно, нужно выработать в себе некую стратегию торговли. В которую будут включён строгий Риск Менеджмент. Когда ты будешь ее строго соблюдать, у тебя все все получится.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Development',
              callback_data: 'development',
            },
          ],
          [
            {
              text: 'Lifestyle',
              callback_data: 'lifestyle',
            },
          ],
          [
            {
              text: 'Other',
              callback_data: 'other',
            },
          ],
          [
            {
              text: 'Development',
              callback_data: 'development',
            },
          ],
          [
            {
              text: 'Lifestyle',
              callback_data: 'lifestyle',
            },
          ],
          [
            {
              text: 'Other',
              callback_data: 'other',
            },
          ],
        ],
      },
    }
  );
});
bot.onText(/📣Задать Вопрос/, (msg: any) => {
  bot.sendMessage(
    msg.chat.id,
    `⏰Мы осуществляем работу практически 24/7.
  Вы можете писать и задавать все интересующие вас вопросы, в любое время суток. 
  📲Наш менеджер - @Crypto_Object`,
    {}
  );
});

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}
