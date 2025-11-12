import { Flex, Heading, Stack, Table } from '@chakra-ui/react';
import { PageBanner } from '../components/page-banner/PageBanner';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Цени – Музикален Център "Малките Големи Таланти"',
};

const Page: React.FC = () => {
  return (
    <Stack>
      <PageBanner text="Цени" />
      <Stack w={'100%'} gap={'16'} pb={5}>
        <Flex>
          <Stack alignItems={'center'} margin={'auto'}>
            <Heading textDecoration={'underline'}>ИНДИВИДУАЛНИ ПРОГРАМИ</Heading>
            <Table.Root>
              <Table.ColumnGroup>
                <Table.Column htmlWidth="20%" />
                <Table.Column htmlWidth="60%" />
                <Table.Column htmlWidth="20%" />
              </Table.ColumnGroup>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textAlign="center">Вид</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Ниво</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Цена</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell textAlign="center">
                    Вокални уроци / поп и джаз, фолклорно пеене/
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Начинаещи:</b> 4 урока на месец с продължителност от 45 до 60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">180лв. / 92,03€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">
                    Вокални уроци / поп и джаз, фолклорно пеене/
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Напреднали и концертиращи:</b> 8 урока на месец с продължителност 60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">340 лв. / 173,84€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Уроци по пиано / цигулка</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Начинаещи:</b> 4 урока на месец с продължителност от 45 до 60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">180лв. / 92,03€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Уроци по пиано / цигулка</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Напреднали и концертиращи:</b> 8 урока на месец с продължителност 60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">340 лв. / 173,84€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Уроци по пиано / цигулка</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Пиано за певци:</b> 4 урока на месец с продължителност 45 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">100лв. / 51,13€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Уроци по барабани / ударни</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Начинаещи:</b> 4 урока на месец с продължителност от 45 до 60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">180лв./ 92,03€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Уроци по барабани / ударни</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Напреднали:</b> 8 урока на месец с продължителност 60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">340 лв. / 173,84€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">
                    Солфеж и елементи на музиката индивидуална програма
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    4 урока на месец с продължителност 45 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">120 лв. / 61,36€</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Stack>
        </Flex>
        <Flex>
          <Stack alignItems={'center'} margin={'auto'}>
            <Heading textDecoration={'underline'}>ГРУПОВИ ПРОГРАМИ</Heading>
            <Table.Root>
              <Table.Caption p={2} fontStyle={'italic'}>
                За всяка избрана допълнителна дисциплина предлагаме отстъпка от 5% до 10% от
                основната индивидуална програма.
              </Table.Caption>
              <Table.ColumnGroup>
                <Table.Column htmlWidth="20%" />
                <Table.Column htmlWidth="60%" />
                <Table.Column htmlWidth="20%" />
              </Table.ColumnGroup>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textAlign="center">Вид</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Ниво</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Цена</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell textAlign="center">Солфеж и елементи на музиката</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Начинаещи:</b> 4 урока на месец с продължителност 30мн.
                  </Table.Cell>
                  <Table.Cell textAlign="center">100 лв. / 51,13€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Солфеж и елементи на музиката</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Напреднали:</b> 4 урока на месец с продължителност 45мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">100 лв. / 51,13€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Вокални групи</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>“Малките пеещи таланти” - от 5 до 9г.</b> 4 репетиции на месец с
                    продължителност 60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">120 лв. / 61,36€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Вокални групи</Table.Cell>
                  <Table.Cell textAlign="center">
                    <b>Тийн вокална формация - 9 до 16г.</b> 4 репетиции на месец с продължителност
                    60 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">120 лв. / 61,36€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">
                    Сценично поведение и пърформанс в група
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    Единичен урок с продължителност 90 мин.
                  </Table.Cell>
                  <Table.Cell textAlign="center">25 лв. / 12,78€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Прослушване за прием</Table.Cell>
                  <Table.Cell textAlign="center"></Table.Cell>
                  <Table.Cell textAlign="center">40 лв. / 20,45€</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign="center">Консултация с преподавател</Table.Cell>
                  <Table.Cell textAlign="center"></Table.Cell>
                  <Table.Cell textAlign="center">50 лв. / 25,56€</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Page;
