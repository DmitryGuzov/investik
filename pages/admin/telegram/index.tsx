import MainLayout from '@/components/main-layout';

import config from '@/config/config';
import withAuth from '@/components/with-auth';
import { auth } from '@/config/firebase';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Textarea,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import React from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';

const TelegramPage = () => {
  const toast = useToast();
  const [file, setFile] = React.useState<any>(null);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [password, setPassword] = React.useState('');
  const color = useColorModeValue('gray.50', 'gray.800');
  const handleChangeEmail = (e: any) => {
    setMessage(e.target.value);
  };
  const handleClick = () => setShow(!show);

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const sendTelegramMessage = async () => {
    console.log(config);
    return await fetch(
      `${config.TELEGRAM_API_URL}/api/telegram/message`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
        }),
      }
    );
  };
  function isFileImage(file: any) {
    const acceptedImageTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/bmp',
    ];
    return file && acceptedImageTypes.includes(file.type);
  }
  function isFileVideo(file: any) {
    return file && file.type.includes('video');
  }
  function checkFileType(file: File) {
    const isImage = isFileImage(file);
    const isVideo = isFileVideo(file);

    if (isImage) {
      return 'image';
    }
    if (isVideo) {
      return 'video';
    }
    return null;
  }
  const handleChangeFile = (event: any) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };
  const sendTelegramMessageWithPhoto = async () => {
    if (file) {
      let data = new FormData();
      data.append('file', file);
      data.append('message', message);
      console.log(data);
      return await fetch(
        `${config.TELEGRAM_API_URL}/api/telegram/photo`,
        {
          method: 'POST',

          body: data,
        }
      );
    }
  };
  const sendTelegramMessageWithVideo = async () => {
    if (file) {
      let data = new FormData();
      data.append('file', file);
      data.append('message', message);
      console.log(data);
      return await fetch(
        `${config.TELEGRAM_API_URL}/api/telegram/video`,
        {
          method: 'POST',

          body: data,
        }
      );
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (file) {
      const type = checkFileType(file);
      if (!type) {
        sendTelegramMessage()
          .then((userCredential) => {
            setLoading(false);
            toast({
              title: 'Сообщение отправлено!',
              description: '',
              status: 'success',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            toast({
              title: `${error.toString()}`,
              description: '',
              status: 'error',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          });
      } else {
      }
      if (type && type === 'image') {
        sendTelegramMessageWithPhoto()
          .then((userCredential) => {
            setLoading(false);
            toast({
              title: 'Сообщение отправлено!',
              description: '',
              status: 'success',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            toast({
              title: `${error.toString()}`,
              description: '',
              status: 'error',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          });
      }
      if (type && type === 'video') {
        sendTelegramMessageWithVideo()
          .then((userCredential) => {
            setLoading(false);
            toast({
              title: 'Сообщение отправлено!',
              description: '',
              status: 'success',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            toast({
              title: `${error.toString()}`,
              description: '',
              status: 'error',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          });
      }
    } else {
      sendTelegramMessage()
        .then(() => {
          setLoading(false);
          toast({
            title: 'Сообщение отправлено!',
            description: '',
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          toast({
            title: `${error.toString()}`,
            description: '',
            status: 'error',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  React.useEffect(() => {
    console.log(file);
  }, [file]);
  return (
    <>
      <Head>
        <title>Admin вход</title>
        <meta name='description' content='Investments' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={color}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Отправить сообщение в телеграм
              </Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id='email'>
                  <Input
                    id='upload'
                    type='file'
                    hidden
                    accept='image/*, video/mp4'
                    onChange={handleChangeFile}
                  />
                  <FormLabel htmlFor='upload'>
                    {file ? 'Изменить файл' : 'Выбрать файл'}
                  </FormLabel>

                  {file ? (
                    <Button
                      bg={'red.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      size='sm'
                      isLoading={loading}
                      onClick={() => {
                        setFile(null);
                      }}
                    >
                      X
                    </Button>
                  ) : null}
                  {file ? (
                    <List>
                      <ListItem>
                        <ListIcon
                          as={BsFillFileEarmarkTextFill}
                          color='black.500'
                        />
                        {file.name}
                      </ListItem>
                    </List>
                  ) : null}
                </FormControl>
                <FormControl id='email'>
                  <Textarea value={message} onChange={handleChangeEmail} />
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    isLoading={loading}
                    onClick={handleSubmit}
                  >
                    Отправить
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </MainLayout>
    </>
  );
};

export default withAuth(TelegramPage);
