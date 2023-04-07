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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { FaEye } from 'react-icons/fa';
import Loading from '@/components/loading';
import { KnowledgeModel } from '@/models/knowledge';
import ShowKnowledgeModal from '../show-modal';

interface KnowledgesTableProps {
  knowledges: KnowledgeModel[];
  loading: boolean;
  deleteLoading: boolean;
  deleteInvestment: (id: string) => Promise<any>;
}

const KnowledgesTable = ({
  knowledges,
  loading,
  deleteInvestment,
  deleteLoading,
}: KnowledgesTableProps): JSX.Element => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isShow,
    onOpen: onShowOpen,
    onClose: onShowClose,
  } = useDisclosure();
  const [selected, setSelected] = React.useState<KnowledgeModel | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const router = useRouter();
  const cancelRef = React.useRef(null);

  const handleNavigate = (item: KnowledgeModel) => () => {
    handleShow(item);
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
  const handleShow = (knowledge: KnowledgeModel) => {
    setSelected(knowledge);
    onShowOpen();
  };
  const handleShowClose = () => {
    setSelected(null);
    onShowClose();
  };
  const handleDelete = () => {
    onClose();
    deleteInvestment(deleteId!).then(() => {
      toast({
        title: 'База удалена',
        description: 'Вы удалили базу',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      setDeleteId(null);
    });
  };

  const handleEdit = (id: string) => (e: any) => {
    e.stopPropagation();
    router.push(`/admin/knowledges/edit/${id}`);
  };

  const handleAddInvestment = () => {
    router.push('/admin/knowledges/add');
  };

  return (
    <Box position='relative'>
      <Box
        // h='calc(100vh - 60px - 65px)'
        overflowY='auto'
      >
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Td colSpan={8}>
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
                <Th>Название</Th>
                <Th textAlign={'center'}>Элементов</Th>
                <Th isNumeric>Действия</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading === true ? (
                <Tr>
                  <Td colSpan={8} textAlign={'center'}>
                    <Loading />
                  </Td>
                </Tr>
              ) : (
                <React.Fragment>
                  {knowledges?.map(
                    (knowledge: KnowledgeModel, index: number) => {
                      return (
                        <Tr
                          key={knowledge.id}
                          _hover={{
                            backgroundColor: 'gray.100',
                          }}
                        >
                          <Td>{index + 1}</Td>

                          <Td>
                            <Text fontWeight={'bold'} fontSize={'1rem'}>
                              {knowledge.title}
                            </Text>
                          </Td>

                          <Td textAlign={'center'}>
                            <ButtonGroup
                              size='sm'
                              isAttached
                              isDisabled={deleteLoading}
                            >
                              <Button
                                colorScheme='green'
                                variant='outline'
                                size='sm'
                              >
                                {knowledge?.items.length ?? 0} шт.
                              </Button>
                            </ButtonGroup>
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
                                onClick={handleNavigate(knowledge)}
                              >
                                Посмотреть
                              </Button>
                              <Button
                                leftIcon={<EditIcon />}
                                colorScheme='blue'
                                variant='outline'
                                size='sm'
                                onClick={handleEdit(knowledge.id)}
                              >
                                Ред.
                              </Button>
                              <Button
                                leftIcon={<DeleteIcon />}
                                colorScheme='red'
                                variant='outline'
                                size='sm'
                                onClick={(e: any) => {
                                  handleOpenDeleteDialog(knowledge.id, e);
                                }}
                              >
                                Удалить
                              </Button>
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      );
                    }
                  )}
                </React.Fragment>
              )}
            </Tbody>
            {!loading && knowledges.length === 0 && (
              <Tfoot>
                <Tr>
                  <Td colSpan={8} textAlign='center'>
                    <Text>Not found</Text>
                  </Td>
                </Tr>
              </Tfoot>
            )}
          </Table>
        </TableContainer>
        <ShowKnowledgeModal
          isOpen={isShow}
          onClose={handleShowClose}
          knowledge={selected}
        />
        <AlertDialog
          closeOnEsc
          isOpen={isOpen}
          leastDestructiveRef={cancelRef!}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Удалить базу
              </AlertDialogHeader>

              <AlertDialogBody>
                Вы уверены? Вы не сможете отменить это действие впоследствии.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={handleClose}>
                  Отмена
                </Button>
                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                  Удалить
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Box>
  );
};

export default KnowledgesTable;
