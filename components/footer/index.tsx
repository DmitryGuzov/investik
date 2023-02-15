import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import Logo from '../logo';
import Logo2 from '../logo/logo2';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
        gap={{ base: 4, md: 2 }}
      >
        <Text order={{ base: 3, md: 1 }}>
          © 2023 - Все права защищены
        </Text>
        <Box order={{ base: 2, md: 2 }} display={{  md: 'flex' }}>
          <Logo />
        </Box>
        {/* <Stack
          direction={'row'}
          spacing={6}
          w={{ base: '100%', md: 'auto' }}
          order={{ base: 1, md: 3 }}
          display={{ base: 'flex', md: 'block' }}
          justifyContent={{ base: 'space-between', md: 'center' }}
        >
          <Box display={{ base: 'flex', md: 'none' }}>
            <Logo />
          </Box>
          <Box
            justifyContent={'space-around'}
            gap={4}
            display={'flex'}
            alignItems={'center'}
          >
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Box>
        </Stack> */}
      </Container>
    </Box>
  );
}
