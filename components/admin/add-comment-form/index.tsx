import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { uuidv4 } from '@firebase/util';
import { BsPeopleFill } from 'react-icons/bs';
import dynamic from 'next/dynamic';

const ReactImagePickerEditor = dynamic(
  () => import('react-image-picker-editor'),
  {
    ssr: false,
  }
);

const config2: any = {
  borderRadius: '50%',
  language: 'en',
  width: '80px',
  height: '80px',
  objectFit: 'cover',
};

interface CreateCommentFormProps {
  isOpen: boolean;
  createLoading: boolean;
  onOpen?: () => void;
  onClose: () => void;
  handleCreate?: (newComment: any) => Promise<any>;
}

function CreateCommentForm({
  isOpen,
  createLoading,
  onOpen,
  onClose,
  handleCreate,
}: CreateCommentFormProps): JSX.Element {
  const [image, setImage] = React.useState('');
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleChangeImage = (newDataUri: any) => {
    if (newDataUri == null) {
      setImage('');
    } else {
      setImage(newDataUri);
    }
  };

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleChangeMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (handleCreate != null) {
      await handleCreate({ image: image, name: name, message: message });
    }
  };

  return (
    <>
      <Modal
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <ReactImagePickerEditor
                config={config2}
                imageSrcProp={image}
                imageChanged={handleChangeImage}
              />
            </Box>
            <VStack width={'100%'}>
              <FormControl isRequired>
                <FormLabel>Имя</FormLabel>
                <Box border='1px solid lightgray' borderRadius={'4px'}>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <BsPeopleFill color='green.500' />
                    </InputLeftElement>

                    <Input
                      placeholder='Имя'
                      variant={'filled'}
                      value={name}
                      onChange={handleChangeName}
                    />
                  </InputGroup>
                </Box>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Сообщение</FormLabel>
                <Box border='1px solid lightgray' borderRadius={'4px'}>
                  <Textarea
                    placeholder='Сообщение'
                    variant={'filled'}
                    value={message}
                    height='200px'
                    onChange={handleChangeMessage}
                  />
                </Box>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              isLoading={createLoading}
              onClick={handleSubmit}
            >
              Сохранить
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCommentForm;
