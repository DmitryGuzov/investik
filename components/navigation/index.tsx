import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Container,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import Logo2 from '../logo/logo2';
import React from 'react';
import { auth } from '@/config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navigation() {
  const { isOpen, onToggle } = useDisclosure();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const [isAuth, setIsAuth] = React.useState(false);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        const uid = user.uid;
      } else {
        setIsAuth(false);
      }
    });
  }, []);
  return (
    <Container maxW={'7xl'} as={Stack} spacing={12}>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Logo2 />

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav isAuth={isAuth} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            {isAuth ? (
              <Button
                as={'a'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'#'}
                _hover={{
                  bg: 'pink.300',
                }}
                onClick={handleSignOut}
              >
                Выйти
              </Button>
            ) : null}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav isAuth={isAuth} />
        </Collapse>
      </Box>
    </Container>
  );
}

const DesktopNav = ({ isAuth }: any) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = 'gray.800';
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const firstBg = 'green.50'; //useColorModeValue('green.50', 'gray.900');
  const color1 = 'green.50';
  const secondBg = 'blue.50'; //useColorModeValue('blue.50', 'gray.900');
  const thirdBg = 'yellow.50'; // useColorModeValue('yellow.50', 'gray.900');
  const fourBg = 'blue.50';
  return (
    <Stack direction={'row'} spacing={4}>
      {DESKTOP_NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} alignItems={'center'} display={'flex'}>
          <Link
            href={navItem.href ?? '#'}
            fontSize={'md'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
      {isAuth ? (
        <Box alignItems={'center'} display={'flex'}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                // p={2}
                href={'#'}
                fontSize={'md'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                Админка
              </Link>
            </PopoverTrigger>

            <PopoverContent
              border={0}
              boxShadow={'xl'}
              bg={popoverContentBgColor}
              p={4}
              rounded={'xl'}
              minW={'sm'}
            >
              <Stack>
                <DesktopSubNav
                  label='Проекты'
                  subLabel='Настройка проектов'
                  href='/admin/investments'
                  bg={firstBg}
                  color={color1}
                />
                <DesktopSubNav
                  label='База знаний'
                  subLabel='Настройка базы знаний'
                  href='/admin/knowledges'
                  bg={thirdBg}
                  color={'green.50'}
                />
                 <DesktopSubNav
                  label='Телеграм'
                  subLabel='Отправление сообщений'
                  href='/admin/telegram'
                  bg={fourBg}
                  color={'blue.50'}
                />
              </Stack>
            </PopoverContent>
          </Popover>
        </Box>
      ) : null}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, bg, color }: NavItem) => {
  const defaultBg = 'pink.50';
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: bg ? bg : defaultBg }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            // _groupHover={{ color: color ? color : 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'black.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ isAuth }: any) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {MOBILE_NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        // href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  bg?: string;
  color?: string;
}

const DESKTOP_NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Главная',
    href: '/',
  },
  {
    label: 'Проекты',
    href: '/investments',
  },
];

const MOBILE_NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Главная',
    href: '/',
  },
  {
    label: 'Проекты',
    href: '/investments',
  },
  {
    label: 'Админка',

    children: [
      {
        label: 'Проекты',
        subLabel: 'Настройка проектов',
        href: '/admin/investments',
      },
      {
        label: 'База знаний',
        subLabel: 'Настройка базы знаний',
        href: '/admin/knowledges',
      },
      {
        label: 'Телеграмм',
        subLabel: 'Настройка базы знаний',
        href: '/admin/telegram',
      },
    ],
  },
];
