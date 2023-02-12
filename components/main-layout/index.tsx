import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from '../footer';
import Navigation from '../navigation';

interface MainLayoutProps {
  children?: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Navigation />
      <Box minHeight={'100vh'}>{children}</Box>
      <Footer />
    </>
  );
}

export default MainLayout;
