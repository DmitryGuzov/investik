import { details } from './details';
import { testimonials } from './testimonials';

export const investments = [
  {
    id: '1',
    title: 'Vestel',
    status: 'ПРИБЫЛЬНЫЙ',
    rate: 8.7,
    tags: ['Связан с трейдингом', 'Необходимы базовые знания'],
    description: 'Investment description',
    link: 'https://t.me/vestel_robot?start=nbf2',
    image: 'https://s3-symbol-logo.tradingview.com/vestel--600.png',
    testimonials: testimonials,
    details: details[0],
  },
  {
    id: '2',
    title: 'Lexar',
    status: 'ПРИБЫЛЬНЫЙ',
    rate: 8.4,
    tags: ['Связан с трейдингом', 'Начальные знания не нужны'],
    description: 'Investment description',
    link: 'https://t.me/vestel_robot?start=nbf2',
    image:
      'data:image/png;base64,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',
    testimonials: testimonials,
    details: details[1],
  },
  {
    id: '3',
    title: 'Фрикономика',
    status: 'ПРИБЫЛЬНЫЙ',
    description: 'Investment description',
    rate: 8.3,
    tags: ['Связан с трейдингом', 'Начальные знания не нужны'],
    link: 'https://t.me/vestel_robot?start=nbf2',
    image: 'https://public.bnbstatic.com/static/images/common/ogImage.jpg',
    testimonials: testimonials,
    details: details[2],
  },
  {
    id: '4',
    title: 'Binancelady',
    status: 'ПРИБЫЛЬНЫЙ',
    description: 'Investment description',
    rate: 7.2,
    tags: ['Связан с трейдингом', 'Необходимы базовые знания'],
    link: 'https://t.me/vestel_robot?start=nbf2',
    image: 'https://public.bnbstatic.com/static/images/common/ogImage.jpg',
    testimonials: testimonials,
    details: details[3],
  },
  {
    id: '5',
    title: 'WM Trading',
    status: 'ПРИБЫЛЬНЫЙ',
    description: 'Investment description',
    rate: 7,
    tags: ['Связан с трейдингом', 'Подходит только для опытных'],
    link: 'https://t.me/vestel_robot?start=nbf2',
    image: 'https://public.bnbstatic.com/static/images/common/ogImage.jpg',
    testimonials: testimonials,
    details: details[4],
  },
  {
    id: '6',
    title: 'CryptoStorm Team',
    status: 'ОПАСНЫЙ',
    description: 'Investment description',
    rate: 4.4,
    tags: [
      'Связан с трейдингом',
      'Необходимы базовые знания',
      'Стоимость неизвестна',
    ],
    link: 'https://t.me/joinchat/ArNqJ_Pr5ERhNzJi',
    image: '/images/cryptostorm-team/main.webp',
    testimonials: [
      {
        name: 'ФокусПокус',
        message: `Покупка сигналов приведет только к убытку. Это я понял, когда наблюдал три дня за каналом. Прямо по волшебству какому-то убыточные сигналы пропадают из постов. Вот такие кундштюки выкидывает трейдер.`,
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Носоломов',
        message: `Если нет отзывов, то я напишу кратко. Отстой.`,
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Постулат',
        message: `Всем советую канал. Много хорошей информации.`,
        image: null,
        createdAt: new Date().toISOString(),
      },
    ],
    details: {
      image: '/images/cryptostorm-team/details.webp',
      data: [
        { type: 'title', value: 'КриптоШторм Тим, Телеграмм канал Мошенника?' },
        {
          type: 'paragraph',
          value: [
            'Телеграмм канал CryptoStorm Team появился весной 2022 г. К концу лета он набрал всего 470 подписчиков. Но более половины из них интересуется свежими постами.',
          ],
        },
        {
          type: 'list',
          value: [
            'Автор публикует преимущественно сигналы для трейдинга с целевыми уровнями и отчетами об отработке. Но приводимые им результаты не верифицированы.',
            'Иногда в группе появляются обзоры перспективных проектов, новости, прогнозы по дальнейшему движению котировок биткоина.',
          ],
        },
        {
          type: 'paragraph',
          value: [
            'Информация о том, что автор телеграм канала «КриптоШторм Тим» торгует платными услугами, в сообществе пока не появлялась. Очевидно, что с такой незначительной аудиторией продавать инфопродукт нереально.',
          ],
        },
        {
          type: 'paragraph',
          value: [
            'Сомнительно, что это telegram сообщество наберет большую аудиторию. Для ценителей торговых сигналов здесь слишком много посторонней информации. Человеку, который сам строит свою стратегию инвестиций, аналитические посты автора покажутся поверхностными.',
          ],
        },
      ],
    },
  },
  {
    id: '7',
    title: 'Stop Loss Academy',
    status: 'ОПАСНЫЙ',
    description: 'Investment description',
    rate: 4.7,
    tags: [
      'Связан с трейдингом',
      'Необходимы базовые знания',
      'Стоимость неизвестна',
    ],
    link: 'https://t.me/joinchat/Uz8yIWtgVec3NjYy',
    image: '/images/stop-loss-academy/main.webp',
    testimonials: [
      {
        name: 'Cерго',
        message: 'Мошенники конченый гандоны',
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Олег',
        message: 'Законченные мошенники, не ведитесь не в коем случае',
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Джеральд',
        message:
          'Я пользовался сигналами этого канала. Ощущение, что часть постов с сигналами удаляется из канала. По итогу недели у меня получился неслабый убыток. По-ходу это мошеннический проект, нацеленный на развод клиентов.',
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Шайтан',
        message:
          'Никому не советую брать сигналы этого деятеля. Он их тырит у других каналов с сомнительной репутацией.',
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Таня',
        message:
          'Мошенники!! Кидают людей на деньги, будьте осторожны. Создают липовые проекты.',
        image: null,
        createdAt: new Date().toISOString(),
      },
    ],
    details: {
      image: '/images/stop-loss-academy/details.webp',
      data: [
        {
          type: 'title',
          value: 'Стоп Лосс Академия. Телеграмм канал Мошенника?',
        },
        {
          type: 'paragraph',
          value: [
            'Телеграмм канал Stop Loss Academy появился в конце июля 2022 г. К середине августа он набрал свыше 8 тыс. подписчиков. Но свежие публикации читает менее половины из них.',
          ],
        },
        {
          type: 'list',
          value: [
            'Группа посвящена заработку на инвестициях в криптовалюту. Большая часть постов – это сигналы для трейдинга.',
            'Авторы сообщества предлагают торговать рыночными заявками и указывают только уровни тейк-профит. Стоп-лоссы подписчики должны ставить самостоятельно.',
          ],
        },
        {
          type: 'paragraph',
          value: [
            'Упоминаний платных услуг в telegram канале «Стоп Лосс Академия» пока нет. Вероятнее всего, это связано исключительно с молодостью группы. Администрация также не приводит сводную статистику проходимости сигналов, хотя отчитывается о результатах каждой сделки.',
          ],
        },
        {
          type: 'paragraph',
          value: [
            'Stop Loss Academy привлечет внимание людей, которые ищут бесплатные торговые сигналы для криптовалюты. Но пока слишком рано оценивать доходность предлагаемой здесь торговой стратегии и утверждать, что этот канал более эффективен, чем его конкуренты.',
          ],
        },
      ],
    },
  },
  {
    id: '8',
    title: 'PROFIT WHALE',
    status: 'ОПАСНЫЙ',
    description: 'Investment description',
    rate: 4.2,
    tags: [
      'Связан с трейдингом',
      'Необходимы базовые знания',
      'Стоимость неизвестна',
    ],
    link: 'https://t.me/joinchat/kU2Xw9bPn_EwZTBi',
    image: '/images/profit-whale/main.webp',
    testimonials: [
      {
        name: 'Вова',
        message:
          'НЕ работайте с ними по индивидуальной торговле. Рекомендуют входить на большой процент и не используют стоп-лосс. Моя личная потеря -70% от депозита. Но Сигналы из бесплатной выборки имеют хорошую проходимость!',
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Gringo',
        message:
          'Сам канал ничего из себя не представляет. Гораздо хуже, что он рекламирует мошенников.',
        image: null,
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Gringo 2',
        message:
          'Сам канал ничего из себя не представляет. Гораздо хуже, что он рекламирует мошенников.',
        image: null,
        createdAt: new Date().toISOString(),
      },
    ],
    details: {
      image: '/images/profit-whale/details.webp',
      data: [
        {
          type: 'title',
          value: 'PROFIT WHALE. Телеграмм канал Мошенника?',
        },
        {
          type: 'paragraph',
          value: [
            'Телеграмм канал PROFIT WHALE посвящен операциям с криптовалютой. Проект работает только 2 недели. Он объединил свыше 3 тысяч подписчиков с хорошей активностью. Половина участников ежедневно посещает посты.',
          ],
        },
        {
          type: 'list',
          value: [
            'В Телеграм канале размещаются материалы, посвященные трейдингу на крипторынке. Новости, обзоры, прогнозы.',
            'Участникам предлагаются бесплатные сигналы на точки входа для заключения выгодных сделок.',
          ],
        },
        {
          type: 'paragraph',
          value: [
            'Трейдер указывает вид криптовалюты, цель, позицию стоп-лосс. На каждую сделку даются советы по распределению депозита. Выкладываются отчеты по закрытым контрактам. Инвестиции приносят только прибыль. Нет данных об убытках.',
          ],
        },
        {
          type: 'paragraph',
          value: [
            'Эксперт торгует без убытков. Им размещаются отчеты только по прибыльным сделкам. Такие результаты не внушают доверия. Рекламируемые автором проекта ресурсы, предлагают сомнительные услуги. Обучение трейдингу, гарантирующее заработок. Раскрутка счета на криптоплощадке. Посетители паблика должны быть бдительны.',
          ],
        },
      ],
    },
  },
];
