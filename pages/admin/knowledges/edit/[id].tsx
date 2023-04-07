import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
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
import { LinkIcon } from '@chakra-ui/icons';

import 'react-image-picker-editor/dist/index.css';
import withAuth from '@/components/with-auth';
import MainLayout from '@/components/main-layout';
import { KnowledgeItem } from '@/models/knowledge';

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.params.id; // Get ID from slug `/book/1`

  async function getInvestment() {
    const db = getFirestore();
    const docRef = doc(db, 'knowledges', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
  }

  const knowledge = await getInvestment();

  if (!knowledge) {
    return {
      redirect: {
        destination: '/admin/knowledges',
        permanent: false,
      },
    };
  }
  return { props: { knowledge: knowledge } };
}

function EditInvestment(props: any) {
  const router = useRouter();
  const toast = useToast();
  const bg2 = useColorModeValue('gray.100', 'gray.700');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(props.knowledge.title ?? '');

  const [items, setItems] = useState(
    props.knowledge.items ?? [
      {
        title: '',
        url: '',
      },
    ]
  );

  const editInvestment = async () => {
    setLoading(true);
    const docData = {
      title: title,
      items: items,
    };
    await updateDoc(doc(db, 'knowledges', props.knowledge.id), docData);
    setLoading(false);
    toast({
      title: 'Проект изменен!',
      description: 'Вы изменили новый проект',
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
    await editInvestment();
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

export default withAuth(EditInvestment);
