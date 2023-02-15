import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from '../footer';
import Navigation from '../navigation';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  return (
    <>
      <Navigation />
      <Box>{children}</Box>
      <Footer />
    </>
  );
}

export default AdminLayout;
