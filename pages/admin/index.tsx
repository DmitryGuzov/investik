import AdminLayout from '@/components/admin-layout';
import InvestmentsTable from '@/components/admin/investments-table';
import MainLayout from '@/components/main-layout';
import Pagination from '@/components/pagination';
import withAuth from '@/components/with-auth';
import useInvestments from '@/hooks/useInvestments';
import { Box, Container, Flex, Select, Stack } from '@chakra-ui/react';
import Head from 'next/head';

const Admin = () => {
  const { investments, loading, deleteInvestment, deleteLoading } =
    useInvestments();
  return (
    <>
      <Head>
        <title>Проекты</title>
        <meta name='description' content='Investments' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <InvestmentsTable
          investments={investments}
          loading={loading}
          deleteLoading={deleteLoading}
          deleteInvestment={deleteInvestment}
        />
      </MainLayout>
    </>
  );
};

export default withAuth(Admin);
