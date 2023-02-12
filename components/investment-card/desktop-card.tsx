import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Box,
  Tag,
  List,
  ListItem,
  ListIcon,
  VStack,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaTelegram } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';

interface DesktopCardProps {
  index: number;
  item: any;
}

const DesktopCard = ({ index, item }: DesktopCardProps): JSX.Element => {
  const router = useRouter();

  const handleNavigate = (e: any) => {
    e.stopPropagation();
    router.push(`/investments/${item.id}`);
  };
  const handleTelegram = (e: any) => {
    e.stopPropagation();
    const telegramLink = e.target.getAttribute('data-link');
    window.open(telegramLink);
  };

  return (
    <Card
      direction={{ base: 'column', md: 'row' }}
      display={{ base: 'flex', md: 'none' }}
      overflow='hidden'
      variant='outline'
      onClick={handleNavigate}
    >
      <Box
        height={'auto'}
        bg='telegram'
        textAlign={'center'}
        alignItems='center'
        display={'flex'}
        justifyContent={'center'}
        padding={2}
      >
        <Text height={'100%'} fontWeight={'bold'}>
          {`#${index + 1}`}
        </Text>
      </Box>
      <Box height={'auto'} bg='telegram' padding={2}>
        <HStack>
          <Image
            objectFit='cover'
            maxW={{ base: '60px', md: '200px' }}
            height={'60px'}
            src={item.image}
            borderRadius='50%'
            alt='Caffe Latte'
          />
          <HStack>
            <CardBody pb={0}>
              <Heading size='lg'>{item.title}</Heading>
              <Stack direction={'column'}>
                <List>
                  {item.tags.map((tag: string, index: number) => {
                    return (
                      <ListItem key={index} textAlign='left'>
                        <ListIcon as={CheckIcon} color='green.500' />
                        {tag}
                      </ListItem>
                    );
                  })}
                </List>
              </Stack>
            </CardBody>
          </HStack>
        </HStack>
      </Box>

      <Stack>
        <CardFooter display={'flex'} justifyContent={'space-around'}>
          <Tag
            size={{ base: 'sm', md: 'md' }}
            variant='solid'
            colorScheme='orange'
          >
            {item.status}
          </Tag>
          <Tag
            size={{ base: 'sm', md: 'md' }}
            variant='solid'
            colorScheme='orange'
          >
            <StarIcon mr={1} /> {item.rate}
          </Tag>
          <Button
            variant='solid'
            size={{ base: 'sm', md: 'md' }}
            colorScheme='telegram'
            leftIcon={<FaTelegram />}
            data-link={item.link}
            onClick={handleTelegram}
          >
            Telegram
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default DesktopCard;
