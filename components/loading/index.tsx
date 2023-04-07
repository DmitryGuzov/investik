import React from 'react';

import { Spinner, Flex } from '@chakra-ui/react';

const Loading = (): JSX.Element => {
  return (
    <Flex align='center' justify='center' w='100%' h='100%'>
      <Spinner size='sm' />
    </Flex>
  );
};

export default Loading;
