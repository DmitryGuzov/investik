import MainLayout from '@/components/main-layout';
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
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import React from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

export default function SignIn() {
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleClick = () => setShow(!show);

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        toast({
          title: 'Вы вошли в систему!',
          description: '',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        const user = userCredential.user;
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({
          title: `${errorCode}: ${errorMessage}`,
          description: '',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Head>
        <title>Admin вход</title>
        <meta name='description' content='Investments' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Войдите в свой аккаунт</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id='email'>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type='email'
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      type={show ? 'text' : 'password'}
                      value={password}
                      onChange={handleChangePassword}
                    />
                    <InputRightElement>
                      <IconButton
                        variant='outline'
                        colorScheme='telegram'
                        aria-label='Search database'
                        icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
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
                    Войти
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </MainLayout>
    </>
  );
}
