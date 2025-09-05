import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Stack, Image, Heading, List } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack alignItems={'center'}>
      <PageBanner text="Пиано" videoSrc="/individual-lessons/piano/banner.mp4" />
      <Heading textAlign={'center'} textStyle={'lg'}>
        Опознай и овладей инструмента на всички инструменти - Пианото
      </Heading>
      <Heading textAlign={'center'} textStyle={'sm'} maxW={'800px'}>
        Уроците по пиано са специални моменти в живота на вашето дете, разширявайки и поощрявайки
        неговия мироглед. Помагайки му да израсне интелигентен, умен и музикално грамотен млад
        човек. Заниманията по пиано са единствените, които развиват и лявото, и дясното полукълбо на
        мозъка, съчетавайки, във всеки един урок, творческото, логическото и аналитично мислене,
        развитие на мелодичен, ритмичен и хармоничен слух.
      </Heading>
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/piano/piano-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Начинаещи</Heading>
              <List.Root>
                <List.Item>{`Правилна постановка на тялото и ръцете при свирене на пиано`}</List.Item>
                <List.Item>{`Разчитане и запомняне на графичните изображения на музикалните знаци`}</List.Item>
                <List.Item>{`Звукоизвличане и пръстовка. Видове динамика`}</List.Item>
                <List.Item>{`Създаване на добри навици за самостоятелна подготовка, чрез упражнения вкъщи`}</List.Item>
                <List.Item>{`Развиване на музикалния потенциал и талант, чрез изучаване на различни техники на музициране и интерпретация на музикални пиеси.`}</List.Item>
              </List.Root>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/piano/piano-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Heading>Напреднали</Heading>
            <List.Root>
              <List.Item>{`Индивидуалните уроци се организират според целите,  възможностите и даденостите на младият пианист.`}</List.Item>
              <List.Item>{`Техническо израстване, чрез свирене на гами и етюди.`}</List.Item>
              <List.Item>{`Усъвършенстване на пианистичните умения като звукоизвличане, фразировка, педализация, пръстовка, орнаментика.`}</List.Item>
              <List.Item>{`Развитие на основните музикални способности като музикална памет, музикален слух и ритмично чувство.`}</List.Item>
              <List.Item>{`Подобряване на паметовата дейност чрез изграждане на умения за свирене наизуст.`}</List.Item>
              <List.Item>{`Запознаване с различните стилове и жанрове в музиката.`}</List.Item>
              <List.Item>{`Изучаване на произведения от различни стилове, като барок, класицизъм, романтизъм, съвременна музика и българска музика това число свирене в неравноделни размери.`}</List.Item>
              <List.Item>{`Подготовка за сценични изяви, концерти, конкурси и  майсторски класове.`}</List.Item>
            </List.Root>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
