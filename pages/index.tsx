import Head from 'next/head';
import MainLayout from '@/components/main-layout';
import Carousel from '@/components/carousel';
import {
  Box,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import InvestmentList from '@/components/investment-list';
import QuestionsAccordion from '@/components/questions-accordion';
import { CheckIcon } from '@chakra-ui/icons';
import Fade from 'react-reveal';
import { getTopFiveInvestments } from '@/services/investments';
import KnowledgesBox from '@/components/knowledges';
import { getKnowledges } from '@/services/knowledges';

export async function getServerSideProps() {
  let investments: any = [];

  const topFiveInvestments = await getTopFiveInvestments();

  const knowledges = await getKnowledges();

  if (topFiveInvestments != null) {
    investments = topFiveInvestments;
  }

  return { props: { investments: investments, knowledges: knowledges } };
}

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Investik</title>
        <meta name='description' content='Investik app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <Fade top ssrFadeout>
          <Carousel />
        </Fade>
        <Box pb={5} pt={5} bg={useColorModeValue('gray.50', 'gray.900')}>
          <Stack
            align={'center'}
            display='flex'
            justifyContent={'center'}
            padding='10px 10px'
          >
            <Fade top ssrFadeout distance={'50%'}>
              <Heading
                textAlign={'center'}
                pl={'2'}
                pr={'2'}
                size={{ base: 'lg', md: 'xl' }}
              >
                <Text as={'span'} color='#dd6b20'>
                  Топ 5{' '}
                </Text>
                <Text as={'span'} color='#1A202C'>
                  проектов по инвестициям
                </Text>
              </Heading>
            </Fade>
          </Stack>
          <InvestmentList list={props.investments} />
        </Box>

        <Container maxW={'7xl'} as={Stack} p={0} mb={10}>
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
              <Heading
                as='h2'
                pl={'2'}
                pr={'2'}
                size={{ base: 'lg', md: 'xl' }}
              >
                ТОП-5 лучших высокодоходных инвестиций
              </Heading>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Инвестиции в интернете, в том числе с ежедневной выплатой – это
                не просто раскрутка денег. Это способ сохранить средства,
                предотвратить их обесценивание из-за инфляции, а также
                приумножить их количество. Как известно сейчас в России, да и во
                всем мире не лучшая экономическая обстановка. Цены растут, а
                зарплаты остаются преимущественно на прежнем уровне. Поэтому
                многие задумались о том, чтобы вложить деньги в инвестиции,
                чтобы деньги работали и не было проблем с доходом.
              </Text>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                В данном разделе нашего сайта вы найдете рейтинг ТОП 10
                инвестиций – лучших проектов, платформ, телеграмм каналов и
                других площадок, куда лучше вложить деньги в 2023 году. У нас
                публикуется и регулярно обновляется список, в который входят
                высокодоходные инвестиции, которые платят, платформы онлайн с
                ежедневной оплатой, инвестиционные телеграм каналы, чаты и т. д.
              </Text>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Изучите наш ТОП сайтов и телеграм каналов, которые вы можете
                использовать в инвестировании. У нас много проверенных ресурсов,
                которые помогут вам разобраться с вложениями в интернете с нуля.
              </Text>

              <Heading
                as='h2'
                pl={'2'}
                pr={'2'}
                size={{ base: 'lg', md: 'xl' }}
              >
                Самые выгодные проекты для инвестирования в России и Мире
              </Heading>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Надежные инвестиции в интернете имеют ряд преимуществ и
                недостатков. Начнем со списка плюсов:
              </Text>
              <OrderedList spacing={3} p={2}>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  Вложить деньги в инвест проекты в 2023 году в России очень
                  просто. Этим могут заниматься люди даже с минимальным опытом и
                  квалификацией. Несложно найти проверенные и надежные компании,
                  которые создают лучшие условия для получения пассивного
                  дохода. К примеру, можно посмотреть безопасные сайты для
                  вложения денег под проценты.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  Существуют варианты инвестирования на любой вкус и кошелек.
                  Можно вложить небольшие деньги и получать относительно
                  маленький, но стабильный профит. Или выбрать прибыльные
                  высокодоходные проекты, для которых требуется более
                  существенное финансирование.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  Можно заниматься вложением денег в краткосрочные либо
                  долгосрочные проекты. Выгодные быстрые инвестиции приносят
                  серьезный, но непродолжительный доход, часто это программы с
                  высоким коэффициентом риска. Популярные долгосрочные
                  инвестиционные проекты более надежны и безопасны, но могут
                  быть менее прибыльными.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  Для тех, кто занимается вложениями, есть много вспомогательных
                  инструментов и сервисов. К примеру, есть телеграмм бот, и не
                  один, при помощи которого можно получать аналитику и следить
                  за движением котировок.
                </ListItem>
              </OrderedList>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Коснемся недостатков – найти инвестиции без риска довольно
                сложно. Даже просматривая топ инвестиционных проектов, следует
                помнить, что завтра ситуация на рынке может поменяться, вы
                можете понести убытки. Нужно быть осторожным и не рисковать
                большими суммами на начальном этапе.
              </Text>
              <Heading
                as='h5'
                pl={'2'}
                pr={'2'}
                size={{ base: 'lg', md: 'xl' }}
              >
                Прибыльные и надежные каналы в телеграмме про инвестиции
              </Heading>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Какие первые шаги новичка в инвестировании в 2023:
              </Text>
              <List spacing={3} p={2}>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Выбрать лучшее предложение для себя – в канале телеграмм, на
                  сайте инвестиционной тематики и т. д. То есть понять, в какие
                  вкладывать акции или облигации, где лучше делать инвестиции,
                  какие активы вы хотите иметь и с какой перспективой. Хотите ли
                  сделать самые высокодоходные инвестиции используя популярные
                  сайты? Или вам интересны вклады в другие выгодные ресурсы с
                  ежедневной выплатой, к примеру, в telegram, где реальные
                  деньги, пусть и небольшие, регулярно поступают на ваш счет.
                </ListItem>

                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Иметь стартовый капитал, которым не жалко рискнуть, сделав
                  вложение. Вступить в выгодное предложение можно, имея всего
                  несколько тысяч рублей на руках. Но это должны быть не
                  последние деньги.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Развивать стрессоустойчивость. Вкладываясь в быстрые или
                  высокодоходные, лучшие и новые проекты, отключайте эмоции,
                  начинайте думать, как профессиональный инвестор. Даже если
                  проверенный ТОП проект начнет «проседать», не спешите сливать
                  активы. Оценивайте перспективу, взвешивайте «за» и «против»,
                  не впадайте в панику, азарт, эйфорию.
                </ListItem>
              </List>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Также немаловажно постоянно развивать знания в сфере
                инвестирования, которые помогут получить реальные доходы,
                предотвратить убытки и избежать элементарных ошибок.
              </Text>
              <List spacing={3} p={2}>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />1 уровень,
                  депозит 4000, прибыль 7000 рублей.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />2 уровень,
                  депозит 11000, прибыль 24000 рублей.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />3 уровень,
                  депозит 27000, прибыль 70000 рублей.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />4 уровень,
                  депозит 45000, прибыль 150000 рублей.
                </ListItem>
              </List>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Принимаются и депозиты более 45 000 рублей, однако условия
                сотрудничества по таким инвестициям необходимо обсудить в личной
                переписке с администратором проекта.
              </Text>
              <Heading
                as='h5'
                pl={'2'}
                pr={'2'}
                size={{ base: 'lg', md: 'xl' }}
              >
                Прибыльные и надежные каналы в телеграмме про инвестиции
              </Heading>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Какие первые шаги новичка в инвестировании в 2023:
              </Text>
              <List spacing={3} p={2}>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Выбрать лучшее предложение для себя – в канале телеграмм, на
                  сайте инвестиционной тематики и т. д. То есть понять, в какие
                  вкладывать акции или облигации, где лучше делать инвестиции,
                  какие активы вы хотите иметь и с какой перспективой. Хотите ли
                  сделать самые высокодоходные инвестиции используя популярные
                  сайты? Или вам интересны вклады в другие выгодные ресурсы с
                  ежедневной выплатой, к примеру, в telegram, где реальные
                  деньги, пусть и небольшие, регулярно поступают на ваш счет.
                </ListItem>

                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Иметь стартовый капитал, которым не жалко рискнуть, сделав
                  вложение. Вступить в выгодное предложение можно, имея всего
                  несколько тысяч рублей на руках. Но это должны быть не
                  последние деньги.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Развивать стрессоустойчивость. Вкладываясь в быстрые или
                  высокодоходные, лучшие и новые проекты, отключайте эмоции,
                  начинайте думать, как профессиональный инвестор. Даже если
                  проверенный ТОП проект начнет «проседать», не спешите сливать
                  активы. Оценивайте перспективу, взвешивайте «за» и «против»,
                  не впадайте в панику, азарт, эйфорию.
                </ListItem>
              </List>
              <Heading
                as='h5'
                pl={'2'}
                pr={'2'}
                size={{ base: 'lg', md: 'xl' }}
              >
                Проверенные инвестиции для вложений с ежедневной выплатой
              </Heading>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                Чтобы ваши деньги успешно работали, нужно не просто найти лучшие
                сайты для инвестиций, но и избегать распространенных ошибок,
                которые допускают новички:
              </Text>
              <List spacing={3} p={2}>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Инвестирование без стратегии. Лучшие ТОП инвесторы всегда
                  определяют стратегию и придерживаются ее.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Продажа на панике. Даже самые лучшие, стабильные и надежные
                  инвестиционные активы могут падать в цене из-за колебаний
                  рынка. Многие новички спешат продать такие позиции, чтобы
                  зафиксировать убытки. Но на следующий день проданные акции
                  могут так же резко вырасти в цене. Поэтому не стоит
                  действовать импульсивно, необдуманно, на эмоциях.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Отсутствие диверсификации. Проще говоря, самое недальновидное,
                  что можно сделать в сфере инвестирования – вложить все деньги
                  в один проект, к примеру, в раскрутку счета в телеграмме. Без
                  риска, конечно все равно не обойтись, но чем шире
                  рассредоточены ваши средства, тем меньше вероятность того, что
                  вы потеряете абсолютно все.
                </ListItem>
                <ListItem fontSize={{ base: 'md', md: 'lg' }}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  Вера в гарантированную высокую и постоянную доходность. Если
                  вам обещают самые выгодные инвестиции, вам не должны
                  гарантировать, что вложения 100% окупятся. А вы не должны
                  таким обещаниям верить. Честные телеграмм каналы про
                  инвестиции и другие тематические инвестиционные сайты, как
                  правило, сообщают о предполагаемой прибыли и предупреждают о
                  рисках.
                </ListItem>
              </List>
              <Text as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
                В целом, чтобы любой проект, куда можно вложить в 2023, принес
                прибыль, нужно просто быть осторожным и действовать по плану.
              </Text>
            </Box>
          </VStack>
        </Container>
        {props.knowledges?.length > 0 ? (
          <Container
            maxW={'7xl'}
            p={0}
            bg='#fff'
            mb={10}
            borderRadius={'8px'}
            boxShadow={'lg'}
          >
            <KnowledgesBox knowledges={props.knowledges} />
          </Container>
        ) : null}

        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
          <Fade bottom ssrFadeout distance={'30%'}>
            <QuestionsAccordion />
          </Fade>
        </Box>
      </MainLayout>
    </>
  );
}
