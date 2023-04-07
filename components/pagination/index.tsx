import React, { useMemo } from 'react';

import { Box, HStack, Button, IconButton, Select } from '@chakra-ui/react';

import { BsChevronRight, BsChevronLeft, BsThreeDots } from 'react-icons/bs';

const DotsItem = () => {
  return (
    <Button
      size='sm'
      w='32px'
      h='32px'
      border='1px solid #D9E2EC;'
      backgroundColor='#ffffff'
      _hover={{
        color: '#ffffff',
      }}
    >
      <BsThreeDots />
    </Button>
  );
};

const Pagination = ({
  page,
  total,
  size,
  onChangePage,
  onChangeLimit,
  disabled,
}: any) => {
  const pageCount = useMemo(() => {
    if (total && size) {
      return Math.ceil(total / size);
    } else {
      return 1;
    }
  }, [total, size]);

  const handleChangeLimit = (event: any) => {
    if (onChangeLimit) onChangeLimit(event.target.value);
  };

  const handleNextPage = () => {
    if (page < pageCount) {
      onChangePage(page + 1);
    }
  };
  const handleChangePage = (p: number) => {
    onChangePage(p);
  };
  const handlePrevPage = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };
  return (
    <Box
      display={'flex'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      flexWrap={'wrap'}
    >
      <HStack spacing='10px'>
        <IconButton
          size='sm'
          width='32px'
          height='32px'
          backgroundColor='transparent'
          aria-label='prev page button'
          icon={
            <BsChevronLeft
              fill={page === 1 || disabled ? '#758391' : '#5755FF'}
            />
          }
          disabled={page === 1 || disabled}
          onClick={handlePrevPage}
        />
        <Button
          size='sm'
          height='32px'
          minW='32px'
          borderRadius='4px'
          border='1px solid #D9E2EC;'
          backgroundColor={page === 1 ? '#5755FF' : '#ffffff'}
          fontSize='14px'
          fontWeight='400'
          lineHeight='24px'
          color={page === 1 ? '#FFFFFF' : '#354052'}
          _hover={{
            backgroundColor: '#5755FF',
            color: '#FFFFFF',
          }}
          onClick={() => {
            handleChangePage(1);
          }}
          disabled={disabled}
        >
          {1}
        </Button>
        {page > 3 && <DotsItem />}

        {page === pageCount && pageCount > 3 && (
          <Button
            size='sm'
            height='32px'
            minW='32px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='400'
            lineHeight='24px'
            border='1px solid #D9E2EC;'
            backgroundColor={page === 1 ? '#5755FF' : '#ffffff'}
            color={page === 1 ? '#FFFFFF' : '#354052'}
            _hover={{
              backgroundColor: '#5755FF',
              color: '#FFFFFF',
            }}
            onClick={() => handleChangePage(page - 2)}
            disabled={disabled}
          >
            {page - 2}
          </Button>
        )}
        {page > 2 && (
          <Button
            size='sm'
            height='32px'
            minW='32px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='400'
            lineHeight='24px'
            border='1px solid #D9E2EC;'
            backgroundColor={page === page - 1 ? '#5755FF' : '#ffffff'}
            color={page === page - 1 ? '#FFFFFF' : '#354052'}
            _hover={{
              backgroundColor: '#5755FF',
              color: '#FFFFFF',
            }}
            onClick={() => handleChangePage(page - 1)}
            disabled={disabled}
          >
            {page - 1}
          </Button>
        )}
        {page !== 1 && page !== pageCount && (
          <Button
            size='sm'
            height='32px'
            minW='32px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='400'
            lineHeight='24px'
            backgroundColor={page === page ? '#5755FF' : '#ffffff'}
            color={page === page ? '#FFFFFF' : '#354052'}
            border='1px solid #D9E2EC;'
            _hover={{
              backgroundColor: '#5755FF',
              color: '#FFFFFF',
            }}
            onClick={() => handleChangePage(page)}
            disabled={disabled}
          >
            {page}
          </Button>
        )}
        {page < pageCount - 1 && (
          <Button
            size='sm'
            height='32px'
            minW='32px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='400'
            lineHeight='24px'
            border='1px solid #D9E2EC;'
            backgroundColor={page === page + 1 ? '#5755FF' : '#ffffff'}
            color={page === page + 1 ? '#FFFFFF' : '#354052'}
            _hover={{
              backgroundColor: '#5755FF',
              color: '#FFFFFF',
            }}
            onClick={() => handleChangePage(page + 1)}
            disabled={disabled}
          >
            {page + 1}
          </Button>
        )}
        {page === 1 && pageCount > 3 && (
          <Button
            size='sm'
            height='32px'
            minW='32px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='400'
            lineHeight='24px'
            border='1px solid #D9E2EC;'
            backgroundColor={page === page + 2 ? '#5755FF' : '#ffffff'}
            color={page === page + 2 ? '#FFFFFF' : '#354052'}
            _hover={{
              backgroundColor: '#5755FF',
              color: '#FFFFFF',
            }}
            onClick={() => handleChangePage(page + 2)}
            disabled={disabled}
          >
            {page + 2}
          </Button>
        )}
        {page < pageCount - 2 && <DotsItem />}
        {pageCount !== 1 && (
          <Button
            size='sm'
            height='32px'
            minW='32px'
            borderRadius='4px'
            fontSize='14px'
            fontWeight='400'
            lineHeight='24px'
            border='1px solid #D9E2EC;'
            backgroundColor={page === pageCount ? '#5755FF' : '#ffffff'}
            color={page === pageCount ? '#FFFFFF' : '#354052'}
            _hover={{
              backgroundColor: '#5755FF',
              color: '#FFFFFF',
            }}
            onClick={() => handleChangePage(pageCount)}
            disabled={disabled}
          >
            {pageCount}
          </Button>
        )}
        <IconButton
          width='32px'
          height='32px'
          size='sm'
          backgroundColor='transparent'
          aria-label='next page button'
          icon={
            <BsChevronRight
              fill={page === pageCount || disabled ? '#758391' : '#5755FF'}
            />
          }
          onClick={handleNextPage}
          disabled={page === pageCount || disabled}
        />
      </HStack>
    </Box>
  );
};

export default Pagination;
