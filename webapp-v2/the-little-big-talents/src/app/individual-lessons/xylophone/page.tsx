import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Stack, Image, Heading, List, Text } from '@chakra-ui/react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ксилофон – Музикален Център "Малките Големи Таланти"',
  description:
    'Научете повече за уроците по ксилофон, преподавани в Музикален Център "Малките Големи Таланти".',
};

const Page: React.FC = () => {
  return (
    <Stack alignItems={'center'}>
      <PageBanner text="Ксилофон" videoSrc="/individual-lessons/xylophone/banner.mp4" />
      <Heading textAlign={'center'} textStyle={'lg'}>
        Опознай мелодичната страна на ударните инструменти
      </Heading>
      <Text textAlign={'center'} textStyle={'sm'} maxW={'800px'}>
        Ксилофонът е магьосникът в мелодичното семейство на перкусиите. Ритъмът е неговото сърце, а
        мелодичният и хармоничният му потенциал разгръщат палитра от специфични, ярки тембри,
        бързина и виртуозност.
      </Text>
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            alt="Уроци по ксилофон"
            src="/individual-lessons/xylophone/xylophone-1.jpg"
            maxH={'400px'}
            fit="contain"
          />
          <Stack>
            <Heading>В начален етап</Heading>
            <List.Root>
              <List.Item>Позиция и стойка</List.Item>
              <List.Item>Правилен захват на палките (Mallet Grip)</List.Item>
              <List.Item>Разположение на нотните височини на ксилофона</List.Item>
              <List.Item>Нотни стойности</List.Item>
              <List.Item>Равноделни размери</List.Item>
              <List.Item>Гами</List.Item>
              <List.Item>Мелодични интервали</List.Item>
              <List.Item>Пиеси от детския буквар на Мария Палиева</List.Item>
              <List.Item>Леки пиеси</List.Item>
            </List.Root>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            alt="Основно обучение по ксилофон"
            src="/individual-lessons/xylophone/xylophone-2.jpg"
            maxH={'400px'}
            fit="contain"
          />
          <Stack>
            <Heading>Основно обучение</Heading>
            <List.Root>
              <List.Item>Постановка</List.Item>
              <List.Item>Техники за разсвирване</List.Item>
              <List.Item>Работа с метроном</List.Item>
              <List.Item>Гами и тризвучия</List.Item>
              <List.Item>Доминантово четиризвучие в мажор и минор</List.Item>
              <List.Item>Хармонични интервали</List.Item>
              <List.Item>Видове размери и темпа</List.Item>
              <List.Item>Тремоло</List.Item>
              <List.Item>Техника, стилове и жанрове, упражнения за координация</List.Item>
              <List.Item>Пиеси с по-високо ниво на технически възможности</List.Item>
              <List.Item>Подготовка за сценични изяви и музикални конкурси</List.Item>
            </List.Root>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
