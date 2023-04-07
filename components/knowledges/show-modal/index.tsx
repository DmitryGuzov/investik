import { KnowledgeItem, KnowledgeModel } from '@/models/knowledge';
import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  WrapItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import KnowledgesBox from '..';

interface ShowKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  knowledge: KnowledgeModel | null;
}

function ShowKnowledgeModal({
  knowledge,
  isOpen,
  onClose,
}: ShowKnowledgeModalProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={'outside'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {knowledge != null ? (
            <Box
              bg={'gray.100'}
              minWidth={'300px'}
              maxWidth={'550px'}
              width={'100%'}
              borderRadius={'8px'}
            >
              <VStack p={0} width={'100%'}>
                <Box bg={'blue.100'} p={2} mt={8} mb={3} width={'100%'}>
                  <Text fontSize={'xl'} fontWeight={'bold'}>
                    {knowledge.title}
                  </Text>
                </Box>
                <List width={'100%'} spacing={3} pb={5}>
                  {knowledge.items.map((item: KnowledgeItem, index: number) => {
                    return (
                      <ListItem
                        key={index}
                        pl={3}
                        pr={3}
                        cursor={'pointer'}
                        _hover={{
                          color: 'pink.500',
                          transition: 'color 300ms ease',
                        }}
                        fontSize={'lg'}
                        fontWeight={'semibold'}
                      >
                        <ListIcon as={LinkIcon} color='pink.500' />
                        <Link href={item.url} target={'_blank'}>
                          {item.title}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </VStack>
            </Box>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ShowKnowledgeModal;
