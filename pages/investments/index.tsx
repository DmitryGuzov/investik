import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import MainLayout from '@/components/main-layout';
import InvestmentList from '@/components/investment-list';
// import { investments } from '@/lib/investments';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { getAllInvestments } from '@/services/investments';

const inter = Inter({ subsets: ['latin'] });

// This gets called on every request
export async function getServerSideProps() {
  let investments: any = [];

  let res = await getAllInvestments();
  if (res != null) {
    investments = res;
  }

  return { props: { investments: investments ? investments : [] } };
}

function Investments(props: any) {
  return (
    <>
      <Head>
        <title>Все проекты</title>
        <meta name='description' content='Investments' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <InvestmentList list={props.investments} />
      </MainLayout>
    </>
  );
}

// Investments.getInitialProps = async () => {
//   let investments: any = [];

//   let res = await getAllInvestments();
//   if (res != null) {
//     investments = res;
//   }

//   return { props: { investments: investments ? investments : [] } };
//   }
  

export default Investments;
