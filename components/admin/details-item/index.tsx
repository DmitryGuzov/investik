import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

const DetailsItem = ({
  type,
  index,
  value,
  handleChange,
  handleRemove,
}: any): JSX.Element => {
  const parseTypeComponent = (type: string) => {
    switch (type) {
      case 'title': {
        return (
          <FormControl isRequired>
            <FormLabel>Заголовок</FormLabel>
            <Input
              placeholder='Заголовок'
              variant={'filled'}
              value={value}
              onChange={handleChange}
            />
          </FormControl>
        );
      }
      case 'paragraph': {
        return (
          <FormControl isRequired>
            <FormLabel>Параграфы</FormLabel>
            <Textarea
              placeholder='Параграфы'
              variant={'filled'}
              value={value}
              onChange={handleChange}
              height={'200px'}
            />
          </FormControl>
        );
      }
      case 'ordered-list': {
        return (
          <FormControl isRequired>
            <FormLabel>Пронумерованный список</FormLabel>
            <Textarea
              placeholder='Пронумерованный список'
              variant={'filled'}
              value={value}
              onChange={handleChange}
              height={'200px'}
            />
          </FormControl>
        );
      }
      case 'list': {
        return (
          <FormControl isRequired>
            <FormLabel>Список</FormLabel>
            <Textarea
              placeholder='Список'
              variant={'filled'}
              value={value}
              onChange={handleChange}
              height={'200px'}
            />
          </FormControl>
        );
      }
      default: {
        return (
          <FormControl isRequired>
            <FormLabel>Заголовок</FormLabel>
            <Input
              placeholder='Заголовок'
              variant={'filled'}
              value={value}
              onChange={handleChange}
            />
          </FormControl>
        );
      }
    }
  };
  return (
    <Box display={'flex'} alignItems='center' justifyContent={'space-between'}>
      <Box width={'100%'} display='flex' alignItems={'center'}>
        {parseTypeComponent(type)}
      </Box>
      <ButtonGroup>
        <Button
          variant='solid'
          size='sm'
          colorScheme={'pink'}
          onClick={handleRemove}
        >
          -
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default DetailsItem;
