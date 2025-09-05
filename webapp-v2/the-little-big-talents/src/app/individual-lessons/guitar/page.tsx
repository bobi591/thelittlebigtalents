import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Stack, Image, Heading, List } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack alignItems={'center'}>
      <PageBanner text="Китара" videoSrc="/individual-lessons/guitar/banner.mp4" />
      <Heading textAlign={'center'} textStyle={'lg'}>
        Развий своето творческо въображение и достигни до магичния звук на китарата
      </Heading>
      <Heading textAlign={'center'} textStyle={'sm'} maxW={'800px'}>
        КЛАСИЧЕСКА, АКУСТИЧНА и ЕЛЕКТРИЧЕСКА КИТАРА.
      </Heading>
      <Heading textAlign={'center'} textStyle={'sm'} maxW={'800px'}>
        В обучението се използват класически и утвърдени методики и помагала на обучение. Разучаване
        на любими песни и мелодии. Активно разучаване на сола, акомпанимент и импровизация в
        съвременни музикални стилове, като поп, джаз, рок и други.
      </Heading>
      <Stack margin={'auto'} gap={10} w={'100vw'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/guitar/guitar-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Начинаещи</Heading>
              <List.Root>
                <List.Item>{`Позиция на тялото и ръцете`}</List.Item>
                <List.Item>{`Устройство на инструмента`}</List.Item>
                <List.Item>{`Принципи на звукоизвличане`}</List.Item>
                <List.Item>{`Работа с дясна и лява ръка`}</List.Item>
                <List.Item>{`Основни понятие за тоновите имена и откриването им по грифа`}</List.Item>
                <List.Item>{`Първи позиции. Упражнения в леки пиеси`}</List.Item>
                <List.Item>{`Основни техники на звукоизвличане`}</List.Item>
                <List.Item>{`Настройване на инструмента и поддръжка`}</List.Item>
                <List.Item>{`Изграждане на добри навици за самоподготовка`}</List.Item>
              </List.Root>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/guitar/guitar-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Heading>Напреднали</Heading>
            <List.Root>
              <List.Item>{`Постановка и разнообразни техники`}</List.Item>
              <List.Item>{`Координация между лява и дясна ръка`}</List.Item>
              <List.Item>{`Нотно писмо за китара. Таблатури`}</List.Item>
              <List.Item>{`Скали, гами, строеж на акорди и акомпаниране.`}</List.Item>
              <List.Item>{`Свирене на акорди и “баре”`}</List.Item>
              <List.Item>{`Видове акорди техники  на  Punteado, Rasgueado, Arpeggio`}</List.Item>
              <List.Item>{`Технически похвати, чрез свирене на етюди и пиеси`}</List.Item>
              <List.Item>{`Ритъм и работа с метроном`}</List.Item>
              <List.Item>{`Разучаване на музикални пиеси, любими песни и мелодии в различни музикални стилове `}</List.Item>
              <List.Item>{`Музициране в ансамбъл – инструментални и вокални`}</List.Item>
              <List.Item>{`Подготовка за сценични изяви, концерти, конкурси и  майсторски класове`}</List.Item>
            </List.Root>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
