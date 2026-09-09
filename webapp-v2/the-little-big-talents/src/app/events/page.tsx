import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Text, Stack, Image, Heading, Link, List } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Събития – Музикален Център "Малките Големи Таланти"',
  description: 'Научете повече за събитията на Музикален Център "Малките Големи Таланти".',
};

const Page: React.FC = () => {
  return (
    <Stack>
      <PageBanner text="Събития" />
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Курс по китара"
            src={'/events/guitar-course.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Text fontWeight={'bold'} textAlign={'center'}>
                ПРОСЛУШВАНЕ!
              </Text>
              <Heading textAlign={'center'}>
                Китара за малчугани в два модула - чудесна възможност за начинаещи китаристи!
              </Heading>
              <Text>{`Иновативно групово обучение по китара е специализирана програма, предназначена за деца на възраст от 5 до 7 години.`}</Text>
              <Text>
                <b>ЗАПИСВАНЕ</b> за прослушване на e-mail: thelittlebigtalents1@gmail.com или в “Запиши
                урок” в сайта.
              </Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>Дати за Прослушване:</Text>
                <Text>1.10. от 18:30 ч. / 3.10. от 16:00 ч.</Text>
              </Stack>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>Структура на курса:</Text>
                <Text>Два модула – Ниво I и Ниво II. В група до 4 деца</Text>
                <Text>Всеки модул е с продължителност 16 седмици (32 учебни часа по 50 мин.)</Text>
                <Text>Начало на Първо ниво: 6 октомври, понеделник, от 18:30 ч.</Text>
              </Stack>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>График за провеждане на часовете:</Text>
                <Text>Вторник и четвъртък от 18:30 ч. до 19:20 ч.</Text>
              </Stack>
              <Text>УСПЕХ НА ВСИЧКИ МАЛКИ КИТАРИСТИ!</Text>
              <Link
                color={'fg.info'}
                href="https://www.facebook.com/events/1379867130376595"
                target="_blank"
                rel="noreferrer"
              >
                Повече за курса
              </Link>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.subtle'}>
          <Image
            flex={1}
            alt="Курс по пиано"
            src={'/events/piano-course.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Text fontWeight={'bold'} textAlign={'center'}>
                ПРОСЛУШВАНЕ!
              </Text>
              <Heading textAlign={'center'}>ПИАНО ЗА НАЙ-МАЛКИТЕ</Heading>
              <Text>
                Курс за групово обучение по пиано е специално разработена система за обучение на деца
                от 4 до 6 години.
              </Text>
              <Text>
                Ако вярвате, че Вашето дете притежава музикален талант, проявете смелост и го
                доведете на прослушване!
              </Text>
              <Text>А ние вярваме, че ще запалим искрата и ще развием таланта му.</Text>
              <Text>
                <b>ЗАПИСВАНЕ</b> за прослушване на e-mail: thelittlebigtalents1@gmail.com или в “Запиши
                урок” в сайта.
              </Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>Дати за Прослушване:</Text>
                <Text>1.10. и 2.10. от 18:30 ч. / 3.10. от 16:00 ч.</Text>
              </Stack>
              <Text fontWeight={'semibold'}>ВАЖНО! Краен срок за записване – 25.09.</Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>Структура на курса:</Text>
                <Text>Два модула – Ниво I и Ниво II. В група до 4 деца</Text>
                <Text>Всеки модул е с продължителност 16 седмици (32 учебни часа по 50 мин.)</Text>
                <Text>Начало на Първо ниво: 5 октомври, понеделник, от 18:30 ч.</Text>
              </Stack>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>График за провеждане на часовете:</Text>
                <Text>Понеделник и сряда от 18:30 ч. до 19:20 ч.</Text>
              </Stack>
              <Text>УСПЕХ, МАЛКИ ТАЛАНТИ, ОЧАКВАМЕ ВИ!</Text>
              <Link
                color={'fg.info'}
                href="https://www.facebook.com/events/1090092560511655"
                target="_blank"
                rel="noreferrer"
              >
                Повече за курса
              </Link>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Кастинг за вокална група"
            src={'/events/casting-vocal-group.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Text fontWeight={'bold'} textAlign={'center'}>
                КАСТИНГ ЗА НОВИ ПЕЕЩИ ЗВЕЗДИЧКИ
              </Text>
              <Text>
                Подарете на детето си ключа към неговия уникален потенциал, като го доведете на
                кастинг /прослушване/ за ВГ “Малките пеещи таланти”!
              </Text>
              <Text>Вокалната група е предназначена за деца, които обожават да пеят и искат да блестят на сцена.</Text>
              <Text fontWeight={'semibold'}>Търсим нови пеещи звездички притежаващи:</Text>
              <List.Root>
                <List.Item>Емоционална отзивчивост към песента и музиката</List.Item>
                <List.Item>Ясно гласче, което интонира вярно</List.Item>
                <List.Item>Ритмичност</List.Item>
                <List.Item>Добра говорна дикция за възрастта</List.Item>
                <List.Item>Артистичност и увереност (желателно, но не е задължително)</List.Item>
              </List.Root>
              <Text>
                Прослушването протича, като детето се включи в репетицията заедно с другите деца. По
                преценка на ръководителя, може да се постави допълнителна задача на детето под формата
                на игра.
              </Text>
              <Text>Репетициите са един път седмично (вторник) с продължителност един астрономически час.</Text>
              <Text>Прослушванията, ще продължат до запълване на местата.</Text>
              <Text>Ще очакваме малките певци всеки вторник от 18:30 ч.</Text>
              <Text>УСПЕХ НА МАЛКИТЕ ТАЛАНТИ!</Text>
              <Link color={'fg.info'} href="/group-lessons/vocal-groups">
                Научете повече
              </Link>
            </Stack>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
