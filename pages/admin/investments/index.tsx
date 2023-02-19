import InvestmentsTable from '@/components/admin/investments-table';
import MainLayout from '@/components/main-layout';
import withAuth from '@/components/with-auth';
import useInvestments from '@/hooks/useInvestments';
import Head from 'next/head';

const Dashboard = () => {
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
        {/* <Flex justify='end' align='center' mt='20px' flexWrap='wrap'>
          <Box w='80px' mr='10px'>
            <Select size='sm' value={limit} onChange={setTake}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Select>
          </Box>
          <Pagination
            page={page}
            disabled={loading}
            total={total}
            size={limit}
            onChangePage={setPage}
          />
        </Flex> */}
      </MainLayout>
    </>
  );
};

export default withAuth(Dashboard);
