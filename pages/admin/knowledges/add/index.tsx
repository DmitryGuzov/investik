import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tag,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { CheckIcon, LinkIcon, StarIcon } from '@chakra-ui/icons';
import { FaTelegram } from 'react-icons/fa';

import dynamic from 'next/dynamic';

const ReactImagePickerEditor = dynamic(
  () => import('react-image-picker-editor'),
  {
    ssr: false,
  }
);

import 'react-image-picker-editor/dist/index.css';
import { uuidv4 } from '@firebase/util';
import DetailsItem from '@/components/admin/details-item';
import withAuth from '@/components/with-auth';
import MainLayout from '@/components/main-layout';
import { KnowledgeItem } from '@/models/knowledge';
// import DetailsItem from '@/components/admin/details-item';

const config2: any = {
  borderRadius: '8px',
  language: 'en',
  width: '330px',
  height: '250px',
  objectFit: 'contain',
};

function AddInvestment(props: any) {
  const router = useRouter();
  const toast = useToast();
  const bg2 = useColorModeValue('gray.100', 'gray.700');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const [items, setItems] = useState([
    {
      title: 'title',
      url: 'Тестовый заголовокas das dasdasd',
    },
    {
      title: 'paragraph',
      url: '',
    },
  ]);

  const addInvestment = async () => {
    setLoading(true);
    const docData = {
      title: title,
      items: items,
    };
    await setDoc(doc(db, 'knowledges', uuidv4()), docData);
    setLoading(false);
    toast({
      title: 'База добавлена!',
      description: 'Вы добавили новую базу',
      status: 'success',
      position: 'top-right',
      duration: 5000,
      isClosable: true,
    });
    router.replace('/admin/knowledges');
  };

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleChangeItemTitle = (idx1: number) => (e: any) => {
    const newTags = items.slice();
    newTags[idx1].title = e.target.value;
    setItems(newTags);
  };
  const handleChangeItemUrl = (idx1: number) => (e: any) => {
    const newTags = items.slice();
    newTags[idx1].url = e.target.value;
    setItems(newTags);
  };
  const handleAddItem = (e: any) => {
    const newTags = items.slice();
    newTags.push({ title: '', url: '' });
    setItems(newTags);
  };
  const handleRemoveItem = (idx1: number) => (e: any) => {
    const newTags = items.slice();
    newTags.splice(idx1, 1);
    setItems(newTags);
  };

  const handleSubmit = async () => {
    await addInvestment();
  };

  return (
    <>
      <Head>
        <title>{props.investment?.title}</title>
        <meta name='description' content='Investment' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <Container maxW='3xl' bg={bg2} pt='20px' pb='20px'>
          <FormControl isRequired>
            <FormLabel>Название</FormLabel>
            <Input
              placeholder='Название'
              value={title}
              variant={'filled'}
              onChange={handleChangeTitle}
            />
          </FormControl>

          <Box mt={2} mb={2}>
            <FormLabel>Ссылки</FormLabel>
            {items.map((item: KnowledgeItem, index: number) => {
              return (
                <HStack key={index} display='flex' alignItems={'center'}>
                  <Box
                    width={'100%'}
                    border='1px solid lightgray'
                    borderRadius={'4px'}
                  >
                    <FormControl key={index} isRequired>
                      <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                          <LinkIcon color='pink.500' />
                        </InputLeftElement>
                        <Input
                          placeholder='Название'
                          variant={'filled'}
                          value={item.title}
                          onChange={handleChangeItemTitle(index)}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl key={index} isRequired>
                      <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                          <LinkIcon color='pink.500' />
                        </InputLeftElement>
                        <Input
                          placeholder='Ссылка'
                          variant={'filled'}
                          value={item.url}
                          onChange={handleChangeItemUrl(index)}
                        />
                      </InputGroup>
                    </FormControl>
                  </Box>
                  <ButtonGroup isAttached size='sm'>
                    <Button
                      variant={'solid'}
                      size='sm'
                      colorScheme={'green'}
                      onClick={handleAddItem}
                    >
                      +
                    </Button>
                    <Button
                      variant={'solid'}
                      size='sm'
                      colorScheme={'pink'}
                      onClick={handleRemoveItem(index)}
                    >
                      -
                    </Button>
                  </ButtonGroup>
                </HStack>
              );
            })}
          </Box>
          <Button
            mt={4}
            isLoading={loading}
            loadingText='Добавление'
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        </Container>
      </MainLayout>
    </>
  );
}

export default withAuth(AddInvestment);
