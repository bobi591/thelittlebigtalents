import { PageBanner } from '@/app/components/page-banner/PageBanner';
import { Text, Stack, Image, Heading } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack>
      <PageBanner
        text="Курс по класическа китара"
        videoSrc="/group-lessons/classical-guitar-course/banner.mp4"
      />
      <Stack margin={'auto'} gap={10} w={'100vw'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          p={10}
        >
          <Image
            flex={1}
            alt="Image"
            src={'/group-lessons/classical-guitar-course/classical-guitar-course-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>
                Курс по класическа китара в два модула - Ниво I и Ниво II
              </Heading>
              <Stack>
                <Text>{`С мисъл за забавно и интерактивно първо докосване до музиката. Групово обучение по класическа е иновативна система специално разрабатена система за деца от 6 до 8 г.`}</Text>
                <Text>{`Уроците и методиката на обучението са адаптирани към възрастта на децата, като включват упражнения за развиване на слуха и усвояване на основните китарни похвати, отчасти и под формата на игра. Чрез този подход децата се учат, докато се забавляват, изграждат увереност и се вдъхновяват взаимно в приятелска и подкрепяща атмосфера.`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'center'}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          p={10}
          bgColor={'bg.subtle'}
        >
          <Image
            flex={1}
            alt="Image"
            src={'/group-lessons/classical-guitar-course/classical-guitar-course-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>Първи модул – Ниво I</Heading>
              <Stack>
                <Text>{`В първия модул на обучението децата правят първи стъпки в света на класическата китара.
Запознават се с  инструмента - история, видове, звукоизвличане и  основните части.
Правилна постановка на тялото и ръцете при свирене, както тоновете на отделните струни.`}</Text>
                <Text>{`Първоначална техника за издърпване на струните, които ще развият чувството им за ритъм и координация.
Модулът включва както практически упражнения, така и теоретични знания, които ще изградят стабилна основа за тяхното последващо музикално развитие.`}</Text>
                <Text>{`Ниво I завършва с мини концерт, в който децата ще се изявят пред родителите си.
Провежда се Първо ниво от 14 седмици (28 учебни часа).`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'center'}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          p={10}
        >
          <Image
            flex={1}
            alt="Image"
            src={'/group-lessons/classical-guitar-course/classical-guitar-course-3.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>Втори модул – Ниво II</Heading>
              <Stack>
                <Text>{`Във второто ниво  от 16 учебни седмици, децата  доразвиват своите умения и знания придобити в Ниво I. Свирене с няколко от пръстите на всяка ръка, както и свирене с две ръце. Надграждат своите знания за музикалните знаци,  размери, щрихи различни техники и начини на звукизвличане. Разпознаване, тактуване и изсвирване на нотни трайности. Разчитане на нотен текст. Разпознаване на нотните ключове сол и фа. Чрез музикални игри и изпълнения на песнички детето се учи на вярно интониране и успешно развива на мелодичния и ритмичен слух. `}</Text>
                <Text>{`Второто ниво на обучение завършва с мини концерт - продукция на децата. Най-добрите свирят в годишната продукция - концерт на Музикален център "Малките големи таланти".`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
