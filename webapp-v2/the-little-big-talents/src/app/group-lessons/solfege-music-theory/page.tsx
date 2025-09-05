import { PageBanner } from '@/app/components/page-banner/PageBanner';
import { Text, Stack, Image, Heading } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack>
      <PageBanner
        text="Солфеж и музикална теория"
        videoSrc="/group-lessons/solfege-music-theory/banner.mp4"
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
            src={'/group-lessons/solfege-music-theory/solfege-music-theory-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>Какво е солфеж?</Heading>
              <Stack>
                <Text>{`Солфежът е наука за възпитание и изграждане на различните видове музикален слух, необходими както при музициране на инструменти, така и при пеене във всички музикални стилове.`}</Text>
                <Text>{`Изучаването на солфеж развива и усъвършенства музикални способности и улеснява процеса на обучение и музициране. Той развива метроритмичен и ладов усет,  вътрешни слухови представи, както и различните видове слух - мелодичен, хармоничен, полифоничен, тембров, релативен, абсолютен и др.`}</Text>
                <Text>{`Обучението по солфеж е задължително за всички музикални дисциплини, които се изучават в музикалния център. Уроците по солфеж са организирани в отделни занимания, извън часовете по музикален инструмент или вокал и са обединени с изучаването на музикална теория.`}</Text>
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
            src={'/group-lessons/solfege-music-theory/solfege-music-theory-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>Защо е необходимо да се изучава солфеж?</Heading>
              <Stack>
                <Text>{`Изучаването на солфеж развива и усъвършенства музикални способности и улеснява процеса на обучение и музициране. Той развива метроритмичен и ладов усет,  вътрешни слухови представи, както и различните видове слух - мелодичен, хармоничен, полифоничен, тембров, релативен, абсолютен и др.`}</Text>
                <Text>{`Обучението по солфеж е задължително за всички музикални дисциплини, които се изучават в музикалния център. Уроците по солфеж са организирани в отделни занимания, извън часовете по музикален инструмент или вокал и са обединени с изучаването на музикална теория. `}</Text>
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
            src={'/group-lessons/solfege-music-theory/solfege-music-theory-3.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>Какво е теория на музикалните елементи?</Heading>
              <Stack>
                <Text>{`Музикалните елементи са теоретична система, обединяваща всички елементите на музиката, неизменна част от обучението, музицирането и развитието на всеки начинаещ или напреднал музикант и певец.`}</Text>
                <Text>{`Още в първите уроци всеки обучаващ се среща с нотен текст и терминология - височина и трайност на тона (нота), ритъм, размер и пулсация на мелодията, фраза, музикална система, звукоред, гама, динамика, щрихи и т.н. Без изучаването на музикалните елементи и практикуването им чрез солфежиране, обучението е непълноценно и затруднява развитието на ученика и постигане на качество при музициране или пеене.`}</Text>
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
            src={'/group-lessons/solfege-music-theory/solfege-music-theory-4.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>Обучение</Heading>
              <Stack>
                <Text>{`Заниманията по солфеж и музикална теория се провеждат един път в седмицата, организирани в групи по възраст и степенувани по ниво на обучение: Начинаещи, средно ниво, напреднали. Степента на нивото се определя от способностите, възрастта и нуждите на всеки ученик. Под внимание се взема и вече преминато на – инструментална или вокална.`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
