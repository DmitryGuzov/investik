import InvestmentsTable from '@/components/admin/investments-table';
import KnowledgesTable from '@/components/knowledges/knowledges-table';
import MainLayout from '@/components/main-layout';
import Pagination from '@/components/pagination';
import withAuth from '@/components/with-auth';
import useInvestments from '@/hooks/useInvestments';
import useKnowledges from '@/hooks/useKnowledges';
import Head from 'next/head';

const Dashboard = () => {
  const { knowledges, loading, deleteKnowledge, deleteLoading } =
    useKnowledges();
  return (
    <>
      <Head>
        <title>База знаний</title>
        <meta name='description' content='Investments' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <KnowledgesTable
          knowledges={knowledges}
          loading={loading}
          deleteLoading={deleteLoading}
          deleteInvestment={deleteKnowledge}
        />
      </MainLayout>
    </>
  );
};

export default withAuth(Dashboard);
