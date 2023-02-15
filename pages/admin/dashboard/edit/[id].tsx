import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import { FaTelegram } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const ReactImagePickerEditor = dynamic(
  () => import('react-image-picker-editor'),
  {
    ssr: false,
  }
);

import 'react-image-picker-editor/dist/index.css';

const config2: any = {
  borderRadius: '8px',
  language: 'en',
  width: '330px',
  height: '250px',
  objectFit: 'contain',
};

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.params.id; // Get ID from slug `/book/1`

  async function getInvestment() {
    const db = getFirestore();
    const docRef = doc(db, 'investments', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
  }

  const investment = await getInvestment();

  // Pass data to the page via props
  // investments.forEach((invest) => {
  //   if (invest.id === id) {
  //     investment = invest;
  //   }
  // });
  if (!investment) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false,
      },
    };
  }
  return { props: { investment: investment } };
}

export default function EditInvestment(props: any) {
  const router = useRouter();
  const toast = useToast();
  const bg1 = useColorModeValue('gray.50', 'gray.900');
  const bg2 = useColorModeValue('gray.100', 'gray.700');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(props.investment.image);
  const [title, setTitle] = useState(props.investment.title);
  const [status, setStatus] = useState(props.investment.status);
  const [telegramLink, setTelegramLink] = useState(props.investment.link);
  const [rate, setRate] = useState(props.investment.rate ?? 0);
  const [tags, setTags] = useState(props.investment.tags ?? []);
  const [testimonials, setTestimonials] = useState(
    props.investment.testimonials ?? []
  );
  const [details, setDetails] = useState(
    props.investment.details ?? {
      image: '',
      data: [
        {
          type: 'title',
          value: 'Тестовый заголовокas das dasdasd',
        },
        {
          type: 'paragraph',
          value: [
            'А это тестовый параграф. А это тестовый параграф . А это тестовый параграфaojdanskdj . А это тестовый параграфakjsdnakj sd, А это тестовый параграф',
            'А это тестовый параграф. А это тестовый параграф . А это тестовый параграфaojdanskdj . А это тестовый параграфakjsdnakj sd, А это тестовый параграф',
            'А это тестовый параграф. А это тестовый параграф . А это тестовый параграфaojdanskdj . А это тестовый параграфakjsdnakj sd, А это тестовый параграф',
          ],
        },
      ],
    }
  );

  const editInvestment = async () => {
    setLoading(true);
    const docData = {
      title: title,
      status: status,
      link: telegramLink,
      rate: rate,
      image: image,
      testimonials: testimonials,
      tags: tags,
      details: details,
    };
    await updateDoc(doc(db, 'investments', props.investment.id), docData);
    setLoading(false);
    toast({
      title: 'Проект изменен!',
      description: 'Вы изменили новый проект',
      status: 'success',
      position: 'top-right',
      duration: 9000,
      isClosable: true,
    });
    router.replace('/admin/dashboard');
  };

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };
  const handleChangeRate = (e: any) => {
    setRate(e.target.value);
  };
  const handleChangeTelegramLink = (e: any) => {
    setTelegramLink(e.target.value);
  };

  const handleChangeTag = (idx1: number) => (e: any) => {
    const newTags = tags.slice();
    newTags[idx1] = e.target.value;
    setTags(newTags);
  };
  const handleAddTag = (e: any) => {
    const newTags = tags.slice();
    newTags.push('');
    setTags(newTags);
  };
  const handleRemoveTag = (idx1: number) => (e: any) => {
    const newTags = tags.slice();
    newTags.splice(idx1, 1);
    setTags(newTags);
  };

  const handleSubmit = async () => {
    await editInvestment();
  };

  const parseTypeData = (type: string) => {
    switch (type) {
      case 'title': {
        return {
          type: 'title',
          value: '',
        };
      }
      case 'paragraph': {
        return { type: 'title', value: '' };
      }
      case 'ordered-list': {
        return { type: 'ordered-list', value: [''] };
      }
      case 'list': {
        return { type: 'list', value: [''] };
      }
      default: {
        return { type: 'title', value: '' };
      }
    }
  };
  const parseTypeComponent = (type: string) => {
    switch (type) {
      case 'title': {
        return (
          <FormControl isRequired>
            <FormLabel>Заголовок</FormLabel>
            <Input
              placeholder='Заголовок'
              variant={'filled'}
              value={status}
              onChange={handleChangeStatus}
            />
          </FormControl>
        );
      }
      case 'paragraph': {
        return <>Paragraph</>;
      }
      case 'ordered-list': {
        return <>Ordered List</>;
      }
      case 'list': {
        return <>List</>;
      }
      default: {
        return <>Title</>;
      }
    }
  };
  const handleAddDetail = (type: string) => {
    let data = details.data.slice();
    data.push(parseTypeData(type));
    setDetails((prev: any) => {
      return { ...prev, data: data };
    });
  };
  const handleRemoveDetails = (idx: number) => () => {
    let data = details.data.slice();
    data.splice(idx, 1);
    setDetails((prev: any) => {
      return { ...prev, data: data };
    });
  };

  return (
    <>
      <Head>
        <title>{props.investment?.title}</title>
        <meta name='description' content='Investment' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container maxW='3xl' bg={bg2} pt='20px' pb='20px'>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <ReactImagePickerEditor
            config={config2}
            imageSrcProp={image}
            imageChanged={(newDataUri: any) => {
              setImage(newDataUri);
            }}
          />
        </Box>

        <FormControl isRequired>
          <FormLabel>Название</FormLabel>
          <Input
            placeholder='Название'
            value={title}
            variant={'filled'}
            onChange={handleChangeTitle}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Статус</FormLabel>
          <Input
            placeholder='Статус'
            variant={'filled'}
            value={status}
            onChange={handleChangeStatus}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Рейтинг</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <StarIcon color='orange.500' />
            </InputLeftElement>
            <Input
              placeholder='Рейтинг'
              type={'number'}
              variant={'filled'}
              value={rate}
              onChange={handleChangeRate}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Ссылка на телеграм</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <FaTelegram color='blue.500' />
            </InputLeftElement>
            <Input
              placeholder='Телеграм'
              variant={'filled'}
              value={telegramLink}
              onChange={handleChangeTelegramLink}
            />
          </InputGroup>
        </FormControl>
        <Box mt={2} mb={2}>
          <FormLabel>Теги</FormLabel>
          {tags.map((tag: string, index: number) => {
            return (
              <HStack key={index} display='flex' alignItems={'center'}>
                <FormControl key={index} isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <CheckIcon color='green.500' />
                    </InputLeftElement>
                    <Input
                      placeholder='Тег'
                      variant={'filled'}
                      value={tag}
                      onChange={handleChangeTag(index)}
                    />
                  </InputGroup>
                </FormControl>
                <ButtonGroup isAttached size='sm'>
                  <Button
                    variant={'solid'}
                    size='sm'
                    colorScheme={'green'}
                    onClick={handleAddTag}
                  >
                    +
                  </Button>
                  <Button
                    variant={'solid'}
                    size='sm'
                    colorScheme={'pink'}
                    onClick={handleRemoveTag(index)}
                  >
                    -
                  </Button>
                </ButtonGroup>
              </HStack>
            );
          })}
        </Box>

        <Heading>Подробности</Heading>
        <Box mt={2} mb={2}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <ReactImagePickerEditor
              config={config2}
              imageSrcProp={details.image ?? ''}
              imageChanged={(newDataUri: any) => {
                setDetails((prev: any) => {
                  return { ...prev, image: newDataUri };
                });
              }}
            />
          </Box>

          <Heading>Инфа</Heading>
          <Box mt={2} mb={2}></Box>
        </Box>

        <Button
          mt={4}
          isLoading={loading}
          loadingText='Сохранение...'
          colorScheme='teal'
          onClick={handleSubmit}
        >
          Сохранить изменения
        </Button>
      </Container>
    </>
  );
}
