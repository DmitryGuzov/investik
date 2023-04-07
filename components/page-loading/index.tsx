import React from 'react';

import { Spinner, Flex } from '@chakra-ui/react';

const PageLoading = (): JSX.Element => {
  return (
    <Flex align='center' justify='center' w='100vw' h='100vh'>
      <Spinner size='lg' />
    </Flex>
  );
};

export default PageLoading;
