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
  details?: any;
}

const Details = ({ details }: MainProps): JSX.Element => {
  const router = useRouter();

  const parseData = (data: any) => {
    switch (data.type) {
      case 'paragraph': {
        const paragraphs = data.value.split(/\r\n|\r|\n/gi);
        return paragraphs.map((p: string, index: number) => {
          return (
            <Text key={index} as='p' fontSize={{ base: 'md', md: 'lg' }} p={2}>
              {p}
            </Text>
          );
        });
      }
      case 'ordered-list': {
        const list = data.value.split(/\r\n|\r|\n/gi);
        return (
          <OrderedList spacing={3} p={2}>
            {list.map((item: string, index: number) => {
              return (
                <ListItem fontSize={{ base: 'md', md: 'lg' }} key={index}>
                  {item}
                </ListItem>
              );
            })}
          </OrderedList>
        );
      }
      case 'list': {
        const list = data.value.split(/\r\n|\r|\n/gi);
        return (
          <List spacing={3} p={2}>
            {list.map((item: string, index: number) => {
              return (
                <ListItem fontSize={{ base: 'md', md: 'lg' }} key={index}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  {item}
                </ListItem>
              );
            })}
          </List>
        );
      }
      case 'title': {
        return (
          <Heading as='h3' pl={'2'} pr={'2'} size={{ base: 'lg', md: 'xl' }}>
            {data.value}
          </Heading>
        );
      }
    }
  };

  return (
    <Box width={{ base: '100%' }}>
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
          {details?.image != null && details?.image.trim().length > 0 ? (
            <Box
              float={{ base: 'none', md: 'none', lg: 'right' }}
              m='3'
              alignItems={'center'}
              display={'flex'}
              justifyContent={'center'}
            >
              <Image
                transform='scale(1.0)'
                src={details?.image}
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
          ) : null}

          {details?.data?.map((detail: any, index: number) => {
            return (
              <React.Fragment key={index}>{parseData(detail)}</React.Fragment>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
};

export default Details;
