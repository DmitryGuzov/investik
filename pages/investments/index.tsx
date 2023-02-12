import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import MainLayout from '@/components/main-layout';
import InvestmentList from '@/components/investment-list';
import { investments } from '@/lib/investments';

const inter = Inter({ subsets: ['latin'] });

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: { investments: investments } };
}

export default function Investments() {
  return (
    <>
      <Head>
        <title>Investments</title>
        <meta name='description' content='Investments' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <InvestmentList list={investments} />
      </MainLayout>
    </>
  );
}
