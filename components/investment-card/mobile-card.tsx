import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaTelegram } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';

interface MobileCardProps {
  index: number;
  item: any;
}

const MobileCard = ({ index, item }: MobileCardProps): JSX.Element => {
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
    <Card display={{ base: 'none', md: 'flex' }} onClick={handleNavigate}>
      <CardBody p={0}>
        <Stack
          direction='row'
          textAlign='center'
          justifyContent={'space-between'}
        >
          <Box display={'flex'} flexDirection={'row'}>
            <Box
              width={'50px'}
              height={'auto'}
              bg='telegram'
              textAlign={'center'}
              alignItems='center'
              display={'flex'}
              justifyContent={'center'}
              padding={2}
            >
              <Text height={'auto'} textAlign={'center'} fontWeight={'bold'}>
                {`#${index + 1}`}
              </Text>
            </Box>
            <Box
              textAlign={'center'}
              alignItems='center'
              display={'flex'}
              justifyContent={'center'}
            >
              <Avatar
                borderRadius={'50%'}
                w={'60px'}
                height={'60px'}
                objectFit={'cover'}
                src={item.image}
              />
            </Box>
            <Stack ml='10px' direction={'column'}>
              <Heading
                size='sm'
                as='h2'
                textTransform='uppercase'
                textAlign={'left'}
              >
                {item.title}
              </Heading>
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
          </Box>

          <Stack direction={'row'} alignItems={'center'}>
            <Tag
              size={'md'}
              p={2}
              variant='outline'
              colorScheme='orange'
              minW={'120px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {item.status}
            </Tag>
            <Tag
              size={'md'}
              p={2}
              variant='solid'
              colorScheme='green'
              width={'50px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <StarIcon mr={2} /> {item.rate}
            </Tag>
            <ButtonGroup spacing='2' marginRight={{ base: 0, md: 5 }}>
              <Button
                variant='solid'
                colorScheme='telegram'
                leftIcon={<FaTelegram />}
                data-link={item.link}
                onClick={handleTelegram}
              >
                Telegram
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MobileCard;
