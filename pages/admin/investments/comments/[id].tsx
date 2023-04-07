import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Divider,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { AddIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';
import { FaTelegram } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { uuidv4 } from '@firebase/util';

const ReactImagePickerEditor = dynamic(
  () => import('react-image-picker-editor'),
  {
    ssr: false,
  }
);

import 'react-image-picker-editor/dist/index.css';
import { BsPeopleFill } from 'react-icons/bs';
import withAuth from '@/components/with-auth';
import MainLayout from '@/components/main-layout';
import EditCommentForm from '@/components/admin/edit-comment-form';
import CreateCommentForm from '@/components/admin/add-comment-form';
import CommentComponent from '@/components/admin/comment';
import { getAllInvestmentComments } from '@/services/comments';
import useComments from '@/hooks/useComments';
import { CommentModel } from '@/models/comment';

// This gets called on every request
export async function getServerSideProps(context: any) {
  const id = context.params.id; // Get ID from slug `/book/1`

  const comments = await getAllInvestmentComments(id);

  if (!comments) {
    return {
      redirect: {
        destination: '/admin/investments',
        permanent: false,
      },
    };
  }
  
  return { props: { comments: comments, investmentId: id },  };
}

function EditComments(props: any) {
  const cancelRef = React.useRef(null);
  const {
    investmentId,
    testimonials,
    deleteLoading,
    editLoading,
    onCreate,
    handleCreate,
    cancelCreate,
    onEdit,
    handleEdit,
    cancelEdit,
    onDelete,
    handleDelete,
    cancelDelete,
    isOpenCreation,
    isOpenEdit,
    isOpenDelete,
    selected,
    createLoading,
  } = useComments({
    investmentId: props.investmentId,
    comments: props.comments,
  });
  const bg2 = useColorModeValue('gray.100', 'gray.700');

  const showedTestimonials = React.useMemo(() => {
    return testimonials;
  }, [testimonials]);

  return (
    <>
      <Head>
        <title>{props.investment?.title}</title>
        <meta name='description' content='Investment' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayout>
        <Container maxW='3xl' pt='20px' pb='20px'>
          <HStack
            bg={bg2}
            px={2}
            py={5}
            borderRadius={'8px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={5}
          >
            <Text fontSize='2xl' fontWeight='bold'>
              Комментарии
            </Text>
            <Button
              leftIcon={<AddIcon />}
              colorScheme='green'
              variant='outline'
              size='sm'
              onClick={onCreate}
            >
              Добавить
            </Button>
          </HStack>
          <Box mt={2} mb={2} bg={bg2} px={2} py={5} borderRadius={'8px'}>
            {showedTestimonials.map((comment: CommentModel, index: number) => {
              return (
                <CommentComponent
                  key={comment.id}
                  comment={comment}
                  openEdit={onEdit}
                  openDelete={onDelete}
                />
              );
            })}
          </Box>
        </Container>
        <CreateCommentForm
          isOpen={isOpenCreation}
          createLoading={createLoading}
          onOpen={onCreate}
          onClose={cancelCreate}
          handleCreate={handleCreate}
        />
        <EditCommentForm
          comment={selected}
          isOpen={isOpenEdit}
          editLoading={editLoading}
          onClose={cancelEdit}
          handleEdit={handleEdit}
        />
        <AlertDialog
          closeOnEsc={false}
          closeOnOverlayClick={false}
          isOpen={isOpenDelete}
          leastDestructiveRef={cancelRef}
          onClose={cancelDelete}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Удалить комментарий
              </AlertDialogHeader>

              <AlertDialogBody>
                Вы уверены? Вы не сможете отменить это действие впоследствии.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={cancelDelete}>
                  Отмена
                </Button>
                <Button
                  colorScheme='red'
                  isLoading={deleteLoading}
                  onClick={handleDelete}
                  ml={3}
                >
                  Удалить
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </MainLayout>
    </>
  );
}

export default withAuth(EditComments);
