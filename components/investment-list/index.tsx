import { Container, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import InvestmentCard from '../investment-card';
import Fade from 'react-reveal';
interface InvestmentListProps {
  list: Array<any>;
}

const InvestmentList = ({ list }: InvestmentListProps): JSX.Element => {
  return (
    <Container maxW={'5xl'} p={5} as={Stack} spacing={3}>
      <Fade bottom cascade ssrFadeout distance={'10%'}>
        <Flex flexDirection={'column'} gap={3}>
          {list?.map((item, index) => {
            return <InvestmentCard key={index} index={index} item={item} />;
          })}
        </Flex>
      </Fade>
    </Container>
  );
};

export default InvestmentList;
