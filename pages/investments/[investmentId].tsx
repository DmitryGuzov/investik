import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '@/components/main-layout';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Main from '@/components/main';
import TestimonialsSlider from '@/components/testimonials-slider';
import React, { useEffect } from 'react';
import Fade from 'react-reveal';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { db } from '@/config/firebase';

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.params.investmentId; // Get ID from slug `/book/1`

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
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { investment: investment } };
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
          <Main investment={props.investment} />
        </Box>
        {props?.investment?.testimonials.length > 0 ? (
          <Box bg={bg2}>
            <Fade bottom ssrFadeout distance={'10%'}>
              <TestimonialsSlider list={props?.investment?.testimonials} />
            </Fade>
          </Box>
        ) : null}
      </MainLayout>
    </>
  );
}
