import React from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  List,
  Flex,
  ListItem,
  ListIcon,
  Button,
  Stack,
  OrderedList,
} from '@chakra-ui/react';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import { FaTelegram } from 'react-icons/fa';
import { investments } from '@/lib/investments';
import { useRouter } from 'next/router';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
  link: string;
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  const handleTelegram = (e: any) => {
    e.stopPropagation();
    const telegramLink = e.target.getAttribute('data-link');
    window.open(telegramLink);
  };
  return (
    <Wrap spacing={'2'} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant='solid' colorScheme='orange' key={tag}>
            {tag}
          </Tag>
        );
      })}
      <Button
        marginTop='3'
        size='sm'
        variant='solid'
        colorScheme='telegram'
        leftIcon={<FaTelegram />}
        data-link={props.link}
        onClick={handleTelegram}
      >
        Telegram
      </Button>
    </Wrap>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop='2' spacing='2' display='flex' alignItems='center'>
      <Image
        borderRadius='full'
        boxSize='40px'
        src='https://100k-faces.glitch.me/random-image'
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight='medium'>{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

interface MainProps {
  investment?: any;
}

const Main = ({ investment }: MainProps): JSX.Element => {
  const router = useRouter();

  const handleNavigate = (id: string) => (e: any) => {
    e.stopPropagation();
    router.push(`/investments/${id}`);
  };
  const handleTelegram = (e: any) => {
    e.stopPropagation();
    const telegramLink = e.target.getAttribute('data-link');
    window.open(telegramLink);
  };

  return (
    <Container maxW={'7xl'} p='30px 0 30px 0'>
      <Flex direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}>
        <Box minWidth={'350px'}>
          <Wrap>
            <WrapItem
              width={{ base: '100%', sm: '100%', md: '95%', lg: '95%' }}
              bg='#fff'
              p={'3'}
              borderRadius={'8px'}
              boxShadow={'lg'}
            >
              <Box w='100%'>
                <Box borderRadius='lg' overflow='hidden'>
                  <Link
                    textDecoration='none'
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Image
                      transform='scale(1.0)'
                      src={investment.image}
                      alt='some text'
                      objectFit='contain'
                      width='100%'
                      transition='0.3s ease-in-out'
                      _hover={{
                        transform: 'scale(1.05)',
                      }}
                    />
                  </Link>
                </Box>

                <Wrap spacing={'2'} marginTop={3}>
                  <Tag size={'md'} variant='solid' colorScheme='orange'>
                    {investment?.status}
                  </Tag>
                  <Tag size={'md'} variant='solid' colorScheme='orange'>
                    <StarIcon mr={2} /> {investment?.rate}
                  </Tag>
                  <Button
                    marginTop='3'
                    size='sm'
                    variant='solid'
                    colorScheme='telegram'
                    leftIcon={<FaTelegram />}
                    data-link={investment?.link}
                    onClick={handleTelegram}
                  >
                    Telegram
                  </Button>
                </Wrap>

                <Heading as='h1' marginTop='2'>
                  {investment.title}
                </Heading>

                <Box>
                  <List spacing={3} p={2}>
                    {investment?.tags.map((tag: string, index: number) => {
                      return (
                        <ListItem key={index}>
                          <ListIcon as={CheckIcon} color='green.500' />
                          {tag}
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>

                <BlogAuthor
                  name='John Doe'
                  date={new Date('2021-04-06T19:01:27Z')}
                />
              </Box>
            </WrapItem>
            <Divider />
            <WrapItem
              display={{ base: 'none', md: 'block' }}
              order={{ base: '5', md: 'initial' }}
              width={{ base: '100%', sm: '100%', md: '95%', lg: '95%' }}
              bg='#fff'
              pb={3}
              pt={3}
              borderRadius={'8px'}
              boxShadow={'lg'}
            >
              <Box w='100%'>
                <Box borderRadius='lg' overflow='hidden'></Box>

                <Heading as='h4' pl={3} pr={3}>
                  Топ 5 проектов
                </Heading>

                <Box p={0}>
                  <VStack mt={5} p={0}>
                    {investments.map((item, index) => {
                      return (
                        <HStack
                          pl={3}
                          pr={3}
                          key={index}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          w={'100%'}
                          _hover={{ backgroundColor: 'gray.100' }}
                          cursor='pointer'
                          onClick={handleNavigate(item.id)}
                        >
                          <HStack>
                            <Text>{`#${index + 1}`}</Text>
                            <Image
                              src={
                                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                              }
                              alt='some text'
                              objectFit='cover'
                              width='40px'
                              height={'40px'}
                              borderRadius={'50%'}
                            />
                            <Text fontWeight={'semibold'}>{item.title}</Text>
                          </HStack>
                          <Tag size={'md'} variant='solid' colorScheme='orange'>
                            <StarIcon mr={2} /> {item.rate}
                          </Tag>
                        </HStack>
                      );
                    })}
                  </VStack>
                </Box>
              </Box>
            </WrapItem>
          </Wrap>
        </Box>
        <Box>
          <VStack
            paddingTop='40px'
            spacing='2'
            alignItems='flex-start'
            bg='#fff'
            p={'3'}
            borderRadius={'8px'}
            boxShadow={'lg'}
          >
            <Box>
              <Box
                float={{ base: 'none', md: 'right' }}
                m='3'
                alignItems={'center'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Image
                  transform='scale(1.0)'
                  src={
                    'https://telegram.org/file/464001806/2/ZdTEg4owdeU.196621/6b3f6ba6826440ae99'
                  }
                  alt='some text'
                  objectFit={{ base: 'contain', md: 'cover' }}
                  width={{ base: 'auto', md: '300px' }}
                  height={{ base: '500px', md: '500px' }}
                  borderRadius={'8px'}
                  transition='0.3s ease-in-out'
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Box>
              <Text as='p' fontSize='lg' p={2}>
                Vestel — бот в мессенджере Telegram, проект посвящен заработку с
                использования стратегии Pump&Dump. Как пользоваться Vestel и
                какие функции в нем доступны, расскажем в нашем обзоре.
                Разработкой занималась команда трейдеров, которые
                специализируются на пампах. Как утверждают разработчики проекта
                Вестел, большинство пампов длятся от 10 минут до нескольких
                часов. В столь небольших промежутках можно успеть заработать
                только при наличии автоматизированной программы. Именно такой
                софт и разработали создали проекта. Алгоритм действий проекта
                максимально простой:
              </Text>
              <OrderedList spacing={3} p={2}>
                <ListItem>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </ListItem>
                <ListItem>
                  Assumenda, quia temporibus eveniet a libero incidunt suscipit
                </ListItem>
                <ListItem>
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem>
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
              </OrderedList>
              <Text as='p' fontSize='lg' p={2}>
                После чего, создатели Vestel начинают выкупать монету, делают
                это плавно и постепенно, чтобы цена сразу не улетела вверх.
                Параллельно с этим в разных социальных сетях начинает выпускать
                заранее купленная реклама, про саму монету. Якобы рост, который
                она сейчас демонстрирует, чем-то обусловлен. После маркетинговой
                поддержки, актив начинают качать сильнее, вызывая быстрый рос.
                Видя новости, который подтверждаются ростов монеты в реальном
                времени, люди начинают скупать монету, а продают ее именно
                памперы, которые купили ее заранее, по более выгодной цене. Это
                краткое описание всего процесса работы, если вам интересно,
                более подробно можно почитать об этом в гугле.
              </Text>
              <Heading as='h5'>What we write about</Heading>
              <List spacing={3} p={2}>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />
                  «Pump Dump». Новички, которые впервые сталкиваются со
                  стратегией пампов, могут познакомиться с ее деталями и
                  историей возникновения.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />
                  «Наш робот». Описание и алгоритм работы программы.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />
                  «Участие в пампе». В меню можно ознакомиться с условиями
                  сотрудничества с проектом.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />
                  «Задать вопрос». Если у пользователя еще останутся вопросы, он
                  сможет их задать в личной переписке с администратором проекта.
                </ListItem>
              </List>
              <Text as='p' fontSize='lg' p={2}>
                Поучаствовать в пампе может любой желающий. Сама работа
                происходит по депозитной системе, что учитывая важную
                составляющую софта вполне логично. Руками такое провернуть
                практически невозможно. Инвесторам предлагается четыре уровня
                сотрудничества. Их условия и прибыльность зависит от уровня.
              </Text>
              <List spacing={3} p={2}>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />1 уровень,
                  депозит 4000, прибыль 7000 рублей.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />2 уровень,
                  депозит 11000, прибыль 24000 рублей.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />3 уровень,
                  депозит 27000, прибыль 70000 рублей.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.500' />4 уровень,
                  депозит 45000, прибыль 150000 рублей.
                </ListItem>
              </List>
              <Text as='p' fontSize='lg' p={2}>
                Принимаются и депозиты более 45 000 рублей, однако условия
                сотрудничества по таким инвестициям необходимо обсудить в личной
                переписке с администратором проекта.
              </Text>
            </Box>
            <Heading as='h2'>
              Vestel Bot в Телеграмм: отзывы пользователей о проекте
            </Heading>
            <Text as='p' fontSize='lg' p={2}>
              На тематических ресурсах отзывы о боте Вестел зачастую
              положительные. В отличие от мошеннических ресурсов, где
              администраторы проекта стараются казаться Робин Гудами от мира
              трейдинга и пытаются показать, что хотят помочь заработать любому
              желающему, руководство Vestel не скрывает, что имеет, в первую
              очередь, собственный интерес. Чем больше сторонних инвестиций, тем
              лучше. Но как нам удалось узнать, у людей которые давно занимаются
              подобными вещами, главное для чего нужны сторонние люди, это
              аккаунты с которых производится сам памп.
            </Text>
            <List spacing={3} p={2}>
              <ListItem>
                <ListIcon as={CheckIcon} color='green.500' />
                Памп это дело незаконное, любая биржа заметив неладное
                заблокирует покупку монеты и ограничит ее вывод. Для решения
                этой задачи и нужны люди со своими персональными данными.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color='green.500' />
                Под ваши платежные данные и генерируются аккаунты. Таким образом
                происходит всеобщая выгода, вам дают возможность заработать
                денег, а вы решаете проблему с аккаунтами. Насколько нам удалось
                узнать, именно это и является основной целью памперов, только
                для этого они становятся публичными.
              </ListItem>
            </List>
            <Text as='p' fontSize='lg' p={2}>
              Vestel — бот в мессенджере Telegram, посвященный заработку на
              пампах. Во время анализа проекта мы не нашли никаких мошеннических
              действий, проект работает давно и рекомендации в сети о нем только
              положительные. Мы пообщались опытными людьми в этом деле, они
              также не нашли нареканий. Работать или нет, решает каждый для себя
              сам, если вам интересен подобный формат инвестиций, советую
              ознакомиться с их продуктом, лишним не будет точно. Если вы уже
              пользовались услугами Vestel, отзывы о проекте можно оставить в
              комментариях под этим обзором. Ваши оценки влияют на репутацию
              проекта и его позицию в общем списке трейдеров.
            </Text>
          </VStack>
        </Box>
        <Divider />
        <Box mt={3} minWidth={'350px'} display={{ base: 'block', md: 'none' }}>
          <Wrap>
            <WrapItem
              order={{ base: '5', md: 'initial' }}
              width={{ base: '100%', sm: '100%', md: '95%', lg: '95%' }}
              bg='#fff'
              pb={3}
              pt={3}
              borderRadius={'8px'}
              boxShadow={'lg'}
            >
              <Box w='100%'>
                <Box borderRadius='lg' overflow='hidden'></Box>

                <Heading as='h4' pl={3} pr={3}>
                  Топ 5 проектов
                </Heading>

                <Box p={0}>
                  <VStack mt={5} p={0}>
                    {investments.map((item, index) => {
                      return (
                        <HStack
                          pl={3}
                          pr={3}
                          key={index}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          w={'100%'}
                          _hover={{ backgroundColor: 'gray.100' }}
                          cursor='pointer'
                          onClick={handleNavigate(item.id)}
                        >
                          <HStack>
                            <Text>{`#${index + 1}`}</Text>
                            <Image
                              src={
                                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                              }
                              alt='some text'
                              objectFit='cover'
                              width='40px'
                              height={'40px'}
                              borderRadius={'50%'}
                            />
                            <Text fontWeight={'semibold'}>{item.title}</Text>
                          </HStack>
                          <Tag size={'md'} variant='solid' colorScheme='orange'>
                            <StarIcon mr={2} /> {item.rate}
                          </Tag>
                        </HStack>
                      );
                    })}
                  </VStack>
                </Box>
              </Box>
            </WrapItem>
          </Wrap>
        </Box>
      </Flex>
    </Container>
  );
};

export default Main;
