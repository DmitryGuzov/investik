import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  ButtonGroup,
  Tag,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  useDisclosure,
  Text,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { FaEye } from 'react-icons/fa';
import Loading from '@/components/loading';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface InvestmentsTableProps {
  investments: Array<any>;
  loading: boolean;
  deleteLoading: boolean;
  deleteInvestment: (id: string) => Promise<any>;
}

const InvestmentsTable = ({
  investments,
  loading,
  deleteInvestment,
  deleteLoading,
}: InvestmentsTableProps): JSX.Element => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const router = useRouter();
  const cancelRef = React.useRef(null);

  const handleNavigate = (id: string) => () => {
    router.push(`/investments/${id}`);
  };
  const handleOpenDeleteDialog = (id: string, e: any) => {
    e.stopPropagation();
    onOpen();
    setDeleteId(id);
  };
  const handleClose = () => {
    setDeleteId(null);
    onClose();
  };
  const handleDelete = () => {
    onClose();
    deleteInvestment(deleteId!).then(() => {
      toast({
        title: 'Проект удален!',
        description: 'Вы удалили проект',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      setDeleteId(null);
    });
  };

  const handleEdit = (id: string) => (e: any) => {
    e.stopPropagation();
    router.push(`/admin/dashboard/edit/${id}`);
  };
  const handleAddInvestment = () => {
    router.push('/admin/dashboard/add');
  };

  return (
    <Box position='relative'>
      <Box h='calc(100vh - 60px - 65px)' overflowY='auto'>
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Td colSpan={7}>
                  <Box
                    width='100%'
                    display={'flex'}
                    justifyContent='flex-end'
                    alignItems='center'
                    mb='10px'
                  >
                    <Button
                      size='sm'
                      leftIcon={<AddIcon />}
                      variant={'outline'}
                      colorScheme={'green'}
                      onClick={handleAddInvestment}
                    >
                      Добавить
                    </Button>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Th>№</Th>
                <Th>Картинка</Th>
                <Th>Название</Th>
                <Th textAlign={'center'}>Рейтинг</Th>
                <Th textAlign={'center'}>Статус</Th>
                <Th textAlign={'center'}>Отзывы</Th>
                <Th isNumeric>Действия</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading === true ? (
                <Tr>
                  <Td colSpan={7} textAlign={'center'}>
                    <Loading />
                  </Td>
                </Tr>
              ) : (
                <React.Fragment>
                  {investments?.map((investment: any, index: number) => {
                    return (
                      <Tr
                        key={investment.id}
                        _hover={{
                          backgroundColor: 'gray.100',
                        }}
                      >
                        <Td>{index + 1}</Td>
                        <Td>
                          <Avatar
                            name={investment.title}
                            src={investment.image}
                          />
                        </Td>
                        <Td>
                          <Text fontWeight={'bold'} fontSize={'1rem'}>
                            {investment.title}
                          </Text>
                        </Td>
                        <Td textAlign={'center'}>
                          <Tag
                            size={'md'}
                            p={2}
                            variant='solid'
                            colorScheme='green'
                          >
                            <StarIcon mr={2} /> {investment.rate}
                          </Tag>
                        </Td>
                        <Td textAlign={'center'}>
                          <Tag
                            size={'md'}
                            p={2}
                            variant='outline'
                            colorScheme='orange'
                          >
                            {investment.status}
                          </Tag>
                        </Td>

                        <Td textAlign={'center'}>
                          <Tag
                            size={'md'}
                            p={2}
                            variant='solid'
                            colorScheme='blue'
                          >
                            {investment.testimonials.length} отзывов
                          </Tag>
                        </Td>
                        <Td isNumeric>
                          <ButtonGroup
                            size='sm'
                            isAttached
                            isDisabled={deleteLoading}
                          >
                            <Button
                              leftIcon={<FaEye />}
                              colorScheme='green'
                              variant='outline'
                              size='sm'
                              onClick={handleNavigate(investment.id)}
                            >
                              Посмотреть
                            </Button>
                            <Button
                              leftIcon={<EditIcon />}
                              colorScheme='blue'
                              variant='outline'
                              size='sm'
                              onClick={handleEdit(investment.id)}
                            >
                              Ред.
                            </Button>
                            <Button
                              leftIcon={<DeleteIcon />}
                              colorScheme='red'
                              variant='outline'
                              size='sm'
                              onClick={(e: any) => {
                                handleOpenDeleteDialog(investment.id, e);
                              }}
                            >
                              Удалить
                            </Button>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    );
                  })}
                </React.Fragment>
              )}
            </Tbody>
            {!loading && investments.length === 0 && (
              <Tfoot>
                <Tr>
                  <Td colSpan={7} textAlign='center'>
                    <Text>Not found</Text>
                  </Td>
                </Tr>
              </Tfoot>
            )}
          </Table>
        </TableContainer>
        <AlertDialog
          closeOnEsc
          isOpen={isOpen}
          leastDestructiveRef={cancelRef!}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Customer
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can`t undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={handleClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Box>
  );
};

export default InvestmentsTable;
