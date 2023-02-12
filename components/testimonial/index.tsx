import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      height={'auto'}
      maxWidth={{ base: '90%', sm: '90%', md: '95%', lg: '95%' }}
    >
      {children}
    </Box>
  );
};

export default Testimonial;
