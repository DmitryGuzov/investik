import React, { ReactNode } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Flex,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import Testimonial from '../testimonial';

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
  touchThreshold: 1000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
      // maxW="250px"
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
      </Stack>
    </Flex>
  );
};

interface TestimonialsSliderProps {
  list: Array<any>;
}

export default function TestimonialsSlider({
  list,
}: TestimonialsSliderProps): JSX.Element {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  return (
    <Box
      position={'relative'}
      padding='20px'
      p={'50px 0px 50px 0px'}
      width={'full'}
      overflow={'hidden'}
    >
      <link
        rel='stylesheet'
        type='text/css'
        charSet='UTF-8'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
      />
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
      />

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {list.map((item, index) => {
          return (
            <Box
              key={index}
              w={'100%'}
              maxW='1200px'
              gap='5'
              height='auto'
              position='relative'
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                height={'100%'}
              >
                <Testimonial key={index}>
                  <TestimonialContent>
                    <TestimonialHeading>{item.name}</TestimonialHeading>
                    <TestimonialText>{item.message}</TestimonialText>
                  </TestimonialContent>
                  <TestimonialAvatar
                    src={item.image}
                    name={'Jane Cooper'}
                    title={'CEO at ABC Corporation'}
                  />
                </Testimonial>
              </Box>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}
