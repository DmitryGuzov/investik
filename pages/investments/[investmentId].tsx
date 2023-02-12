import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '@/components/main-layout';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Main from '@/components/main';
import TestimonialsSlider from '@/components/testimonials-slider';
import React from 'react';

import { investments } from '@/lib/investments';

// This gets called on every request
export async function getServerSideProps(context: any) {
  console.log();
  const id = context.params.investmentId; // Get ID from slug `/book/1`
  console.log(context.params);
  console.log(id);
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  let investment = null;
  // Pass data to the page via props
  investments.forEach((invest) => {
    if (invest.id === id) {
      investment = invest;
    }
  });
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
  console.log(props);
  const bg1 = useColorModeValue('gray.50', 'gray.900');
  const bg2 = useColorModeValue('gray.100', 'gray.700');
  // const { investmentId } = router.query;
  const router = useRouter();
  if (props.investment == null) {
    router.push('/');
  }
  // const [data, setData] = React.useState(null);
  // const [isLoading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   setLoading(true);

  //   new Promise((res) => {
  //     setTimeout(() => {
  //       res('');
  //     }, 2000);
  //   }).then(() => {
  //     setData(data);
  //     setLoading(false);
  //   });
  // }, []);

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
        <Box bg={bg2}>
          <TestimonialsSlider list={props?.investment?.testimonials} />
        </Box>
      </MainLayout>
    </>
  );
}
