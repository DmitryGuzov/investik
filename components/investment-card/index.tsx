import { Box } from '@chakra-ui/react';
import React from 'react';
import MobileCard from './mobile-card';
import DesktopCard from './desktop-card';

interface InvestmentCardProps {
  index: number;
  item: any;
}

const InvestmentCard = ({ index, item }: InvestmentCardProps): JSX.Element => {
  return (
    <>
      <DesktopCard index={index} item={item} />
      <MobileCard index={index} item={item} />
    </>
  );
};

export default InvestmentCard;
