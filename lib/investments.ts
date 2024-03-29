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
    details: details[1],
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
    details: details[1],
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
    details: details[1],
  },
];
