import AdminLayout from '@/components/admin-layout';
import InvestmentsTable from '@/components/admin/investments-table';
import Pagination from '@/components/pagination';
import useInvestments from '@/hooks/useInvestments';
import { Box, Container, Flex, Select, Stack } from '@chakra-ui/react';
import Head from 'next/head';

const Dashboard = () => {
  const {
    investments,
    page,
    setPage,
    loading,
    limit,
    setTake,
    deleteInvestment,
    deleteLoading,
  } = useInvestments();
  return (
    <>
      <Head>
        <title>Investments</title>
        <meta name='description' content='Investments' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AdminLayout>
        <InvestmentsTable
          investments={investments}
          loading={loading}
          deleteLoading={deleteLoading}
          deleteInvestment={deleteInvestment}
        />
        {/* <Flex justify='end' align='center' mt='20px' flexWrap='wrap'>
          <Box w='80px' mr='10px'>
            <Select size='sm' value={limit} onChange={setTake}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </Select>
          </Box>
          <Pagination
            page={page}
            disabled={loading}
            total={investments.length}
            size={limit}
            onChangePage={setPage}
          />
        </Flex> */}
      </AdminLayout>
    </>
  );
};

export default Dashboard;
