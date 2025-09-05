import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Stack, Image, Heading, List } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack>
      <PageBanner text="Цигулка" />
      <Heading textAlign={'center'} textStyle={'lg'}>
        Царицата на музикалните инструменти
      </Heading>
      <Heading textAlign={'center'} textStyle={'sm'}>
        Наричана така заради своята способност да наподобява човешкия глас и различни природни
        звуци. Свиренето на цигулка, както и на всеки друг музикален инструмент, стимулира и двете
        полукълба на мозъка, които отговарят за пространственото, логическото и математическото
        мислене. Подпомага развитието на фината моторика при децата, емоционалната интелигентност и
        творческото въображение. Развива качества като памет и концентрация, воля и устойчивост.
        Изключителен помощник в усъвършенстването на Абсолютния музикален слух.
      </Heading>
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/violin/violin-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Начален етап на обучение</Heading>
              <List.Root>
                <List.Item>{`Запознаване с цигулката, устройство и наименование на съставни части, лък и наименование на частите му`}</List.Item>
                <List.Item>{`Правила при поставяне на цигулката`}</List.Item>
                <List.Item>{`Наименувание на струните с нотни имена. Свирене на празни струни с пицикато за тяхното научаване и запаметяване`}</List.Item>
                <List.Item>{`Постановка на дясна ръка и свирене с лък на празни струни за затвърждаване`}</List.Item>
                <List.Item>{`Свирене на détaché и в legato`}</List.Item>
                <List.Item>{`Постановка на лява ръка. Поставяне на първи пръст , на 2,3 и 4 в първа позиция с пицикато и с лък`}</List.Item>
                <List.Item>{`Грижа за инструмента – настройка и поддръжка`}</List.Item>
                <List.Item>{`Изграждане на навици за упражнения и самоподготовка`}</List.Item>
                <List.Item>{`изпълняване на кратки детски песнички, мелодии и упражнения`}</List.Item>
                <List.Item>{`Първи стъпки на музициране в дует с цигулка или съпровод на пиано`}</List.Item>
              </List.Root>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/violin/violin-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Heading>Обучение за напреднали</Heading>
            <List.Root>
              <List.Item>{`Позиции и преходи`}</List.Item>
              <List.Item>{`Гами за интонационно развитие. Двоен гриф. Акорди`}</List.Item>
              <List.Item>{`Етюди за развиване на техниката и изучаване на нови щрихи`}</List.Item>
              <List.Item>{`Вибрато. Добавяне на различни нюанси при музициране чрез различни видове вибрато`}</List.Item>
              <List.Item>{`Музициране, фразировка, динамика и разнообразни изразни средства`}</List.Item>
              <List.Item>{`Разучаване на произведения със сложност спрямо етапа на развитие на цигуларите`}</List.Item>
              <List.Item>{`Свирене в дует и в ансамбъл`}</List.Item>
              <List.Item>{`Сценично поведение и подготовка за сцена`}</List.Item>
            </List.Root>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
