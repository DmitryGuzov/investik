import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tag,
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
import DetailsItem from '@/components/admin/details-item';
import withAuth from '@/components/with-auth';
import MainLayout from '@/components/main-layout';

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
        destination: '/admin/investments',
        permanent: false,
      },
    };
  }
  return { props: { investment: investment },   };
}

function EditInvestment(props: any) {
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

  const [type, selectType] = useState('title');
  const [isTopFive, setIsTopFive] = useState(
    props.investment.isTopFive ? props.investment.isTopFive : false
  );
  const [detailsImage, setDetailsImage] = useState(
    props.investment.details.image ?? ''
  );
  const [data, setData] = useState(
    props.investment.details.data ?? [
      {
        type: 'title',
        value: 'Тестовый заголовокas das dasdasd',
      },
      {
        type: 'paragraph',
        value: '',
      },
    ]
  );

  const editInvestment = async () => {
    setLoading(true);
    const docData = {
      title: title,
      status: status,
      link: telegramLink,
      rate: rate,
      image: image,
      tags: tags,
      isTopFive: isTopFive,
      comments: props.investment.comments,
      details: {
        image: detailsImage,
        data: data,
      },
    };
    await updateDoc(doc(db, 'investments', props.investment.id), docData);
    setLoading(false);
    toast({
      title: 'Проект изменен!',
      description: 'Вы изменили новый проект',
      status: 'success',
      position: 'top-right',
      duration: 5000,
      isClosable: true,
    });
    router.replace('/admin/investments');
  };
  const handleAddDetail = (type: string) => () => {
    let datas = data.slice();
    const obj = parseTypeData(type);
    datas.push(obj);
    setData(datas);
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
        return { type: 'paragraph', value: '' };
      }
      case 'ordered-list': {
        return { type: 'ordered-list', value: '' };
      }
      case 'list': {
        return { type: 'list', value: '' };
      }
      default: {
        return { type: 'title', value: '' };
      }
    }
  };

  const handleChangeTop = (e: any) => {
    setIsTopFive(e.target.checked);
  };
  const handleSelectType = (e: any) => {
    selectType(e.target.value);
  };

  const handleChangeData = (idx: number) => (e: any) => {
    let datas = data.slice();
    datas[idx].value = e.target.value;
    setData(datas);
  };
  const handleRemoveData = (idx: number) => () => {
    let datas = data.slice();
    datas.splice(idx, 1);
    setData(datas);
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
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <ReactImagePickerEditor
              config={config2}
              imageSrcProp={image}
              imageChanged={(newDataUri: any) => {
                if (newDataUri == null) {
                  setImage('');
                } else {
                  setImage(newDataUri);
                }
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
          <Box mt={2} mb={2} display={'flex'} justifyContent={'flex-start'}>
            <Tag
              size={{ base: 'sm', md: 'md' }}
              variant='solid'
              colorScheme={isTopFive ? 'green' : 'pink'}
              p={2}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Checkbox
                defaultChecked={props.investment.isTopFive}
                checked={isTopFive}
                onChange={handleChangeTop}
              >
                {isTopFive ? 'Топ 5' : 'Не Топ 5'}
              </Checkbox>
            </Tag>
          </Box>
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
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <ReactImagePickerEditor
                config={config2}
                imageSrcProp={detailsImage ?? ''}
                imageChanged={(newDataUri: any) => {
                  if (newDataUri == null) {
                    setDetailsImage('');
                  } else {
                    setDetailsImage(newDataUri);
                  }
                }}
              />
            </Box>

            <Heading>Инфа</Heading>
            <Box mt={2} mb={2}>
              <Box>
                {data.map((detail: any, index: number) => {
                  return (
                    <Box key={index}>
                      <DetailsItem
                        type={detail.type}
                        value={detail.value}
                        handleChange={handleChangeData(index)}
                        handleRemove={handleRemoveData(index)}
                      />
                    </Box>
                  );
                })}
              </Box>
              <ButtonGroup>
                <Select placeholder='Select option' onChange={handleSelectType}>
                  <option value='title'>Заголовок</option>
                  <option value='list'>Список</option>
                  <option value='ordered-list'>Нумерованый Список</option>
                  <option value='paragraph'>Параграфы</option>
                </Select>
                <Button onClick={handleAddDetail(type)}>Добавить</Button>
              </ButtonGroup>
            </Box>
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
      </MainLayout>
    </>
  );
}

export default withAuth(EditInvestment);
