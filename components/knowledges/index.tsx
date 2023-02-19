import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';

interface KnowledgesBoxProps {
  knowledges: any[];
}

const KnowledgesBox = ({ knowledges }: KnowledgesBoxProps): JSX.Element => {
  return (
    <Box mt={5} pt={10} pb={5}>
      <Box bg={'blue.100'} p={3} mb={3}>
        <Text fontSize={'3xl'} fontWeight={'bold'}>
          База знаний
        </Text>
      </Box>
      <Wrap spacing={5} p={{ base: 2, md: 10 }}>
        {knowledges.map((knowledge: any, index) => {
          return (
            <WrapItem
              key={knowledge.id}
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
                  {knowledge.items.map((item: any, index: number) => {
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
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
};

export default KnowledgesBox;
