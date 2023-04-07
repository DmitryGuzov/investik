import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const CommentComponent = ({
  comment,
  openEdit,
  openDelete,
}: any): JSX.Element => {
  return (
    <VStack width={'100%'} mb={'20px'} divider={<Divider />}>
      <HStack
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <HStack>
          <Avatar
            src={comment.image}
            width={'50px'}
            height={'50px'}
            borderRadius={'50%'}
            objectFit={'cover'}
          />
          <Text>{comment.name}</Text>
        </HStack>
        <ButtonGroup isAttached size='sm'>
          <Button
            leftIcon={<EditIcon />}
            colorScheme='blue'
            variant='outline'
            size='sm'
            onClick={openEdit(comment)}
          >
            Ред.
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme='red'
            variant='outline'
            size='sm'
            onClick={openDelete(comment)}
          >
            Удалить
          </Button>
        </ButtonGroup>
      </HStack>
      <HStack
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box
          border='1px solid lightgray'
          borderRadius={'4px'}
          p={3}
          width={'100%'}
        >
          <Text height='200px'>{comment.message}</Text>
        </Box>
      </HStack>
    </VStack>
  );
};

export default CommentComponent;
