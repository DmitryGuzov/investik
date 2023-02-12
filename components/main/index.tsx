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
import Details from '../details';

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
    <Container maxW={'7xl'} p={{ base: 0, sm: '20px 10px', md: '30px 0x' }}>
      <Flex direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}>
        <Box minWidth={'350px'}>
          <Wrap pb='20px'>
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
                      src={investment?.image}
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

                <Heading
                  as='h1'
                  marginTop='2'
                  pl={'2'}
                  pr={'2'}
                  size={{ base: 'lg', md: 'xl' }}
                >
                  {investment?.title}
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

                {/* <BlogAuthor
                  name='John Doe'
                  date={new Date('2021-04-06T19:01:27Z')}
                /> */}
              </Box>
            </WrapItem>
            <Divider />
            <WrapItem
              display={{ base: 'none', md: 'block' }}
              width={{ base: '100%', sm: '100%', md: '95%', lg: '95%' }}
              bg='#fff'
              pb={3}
              pt={3}
              borderRadius={'8px'}
              boxShadow={'lg'}
            >
              <Box w='100%'>
                <Box borderRadius='lg' overflow='hidden'></Box>

                <Heading
                  as='h4'
                  pl={'2'}
                  pr={'2'}
                  size={{ base: 'lg', md: 'xl' }}
                >
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
                              src={item.image}
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
        <Details details={investment?.details} />
        <Box display={{ base: 'block', md: 'none' }}>
          <Divider />
          <Box
            mt={3}
            // mb={3}
            minWidth={'350px'}
            display={{ base: 'block', md: 'none' }}
          >
            <Box
              width={{ base: '100%', sm: '100%', md: '95%', lg: '95%' }}
              bg='#fff'
              pb={3}
              pt={3}
              borderRadius={'8px'}
              boxShadow={'lg'}
            >
              <Box w='100%'>
                <Box borderRadius='lg' overflow='hidden'></Box>

                <Heading
                  as='h4'
                  pl={'2'}
                  pr={'2'}
                  size={{ base: 'lg', md: 'xl' }}
                >
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
                              src={item.image}
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
            </Box>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Main;
