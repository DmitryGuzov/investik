import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';

const QuestionsAccordion = () => {
  return (
    <Container maxW={'5xl'} py={16} as={Stack} spacing={12}>
      <Stack spacing={0} align={'center'}>
        <Heading pl={'2'} pr={'2'} size={{ base: 'lg', md: 'xl' }}>
          Часто задаваемые вопросы про инвестиции
        </Heading>
        {/* <Text>Часто задаваемые вопросы про инвестиции</Text> */}
      </Stack>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize={21}>
                Какие самые лучшие сайты для инвестиций?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize={21}>
                Можно ли начать инвестировать с 1000 рублей?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' fontSize={21}>
                Куда можно безопасно вложить деньги?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            В любой проект из нашего рейтинга можно безопасно вложить деньги.
            Проверяйте отзывы перед инвестированием.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default QuestionsAccordion;
