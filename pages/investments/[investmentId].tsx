import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '@/components/main-layout';
import { Box, Flex, useColorModeValue, Wrap } from '@chakra-ui/react';
import Main from '@/components/main';
import TestimonialsSlider, {
  TestimonialAvatar,
  TestimonialContent,
  TestimonialText,
} from '@/components/testimonials-slider';
import React, { useEffect } from 'react';
import Fade from 'react-reveal';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { db } from '@/config/firebase';
import {
  getInvestmentById,
  getTopFiveInvestments,
} from '@/services/investments';
import Testimonial from '@/components/testimonial';
import { getAllInvestmentComments } from '@/services/comments';
import investments from '../admin/investments';

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.params.investmentId; // Get ID from slug `/book/1`

  const investment = await getInvestmentById(id);
  const comments = await getAllInvestmentComments(id);
  const topFiveInvestments = await getTopFiveInvestments();

  if (!investment) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      investment: investment ? investment : [],
      investments: topFiveInvestments ? topFiveInvestments : [],
      comments: comments ? comments : [],
    },
  };
}

export default function Investment(props: any) {
  const bg1 = useColorModeValue('gray.50', 'gray.900');
  const bg2 = useColorModeValue('gray.100', 'gray.700');

  return (
    <>
      <Head>
        <title>{props.investment?.title}</title>
        <meta name='description' content='Investment' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <Box bg={bg1} w='100%'>
          <Main investment={props.investment} investments={props.investments} />
        </Box>
        {props?.comments?.length > 0 ? (
          <Box bg={bg2}>
            {props?.comments?.length < 3 ? (
              <Flex
                p={5}
                alignItems={'center'}
                justifyContent={'space-around'}
                flexWrap={'wrap'}
                gap={5}
              >
                {props.comments.map((t: any, index: number) => {
                  return (
                    <Testimonial key={index}>
                      <TestimonialContent>
                        <TestimonialText>{t.message}</TestimonialText>
                      </TestimonialContent>
                      <TestimonialAvatar
                        src={t.image}
                        name={t.name}
                        title={'CEO at ABC Corporation'}
                      />
                    </Testimonial>
                  );
                })}
              </Flex>
            ) : (
              <>
                <Fade bottom ssrFadeout distance={'10%'}>
                  <TestimonialsSlider list={props?.comments} />
                </Fade>
              </>
            )}
          </Box>
        ) : null}
      </MainLayout>
    </>
  );
}
