import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Text, Stack, Image, Heading, List, Link } from '@chakra-ui/react';
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
            alt="Guitar Course"
            src={'/events/guitar-course.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>
                Китара за малчугани в два модула - чудесна възможност за начинаещи китаристи!
              </Heading>
              <Text>{`Иновативно групово обучение по класическа китара е специализирана програма, предназначена за деца на възраст от 6 до 8 години.`}</Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>Структура на курса:</Text>
                <Text>Два модула – Ниво I и Ниво II. В група до 4 деца</Text>
                <Text>Всеки модул е с продължителност 16 седмици (32 учебни часа по 50 мин.)</Text>
                <Text>Начало на Първо ниво: 6 октомври, понеделник, от 18:00 ч.</Text>
              </Stack>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>График за провеждане на часовете:</Text>
                <Text>Понеделник и сряда от 18:00 ч. до 18:50 ч.</Text>
              </Stack>
              <Text>
                <b>ЗАПИСВАНЕ</b> за прослушване на e-mail: thelittlebigtalents1@gmail.com
              </Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>Дати за Прослушване:</Text>
                <Text>1.10. от 18:00 ч. / 4.10. от 12:00 ч.</Text>
              </Stack>
              <List.Root>
                <List.Item>
                  Проверка на музикално-слухови възможности, ритмичност на детето и емоционалната му
                  отзивчивост.
                </List.Item>
                <List.Item>Събеседване с родителите.</List.Item>
              </List.Root>
              <Text>
                <b>Класиране:</b> Одобрените кандидати, ще бъдат уведомени по имейл.
              </Text>
              <Text>УСПЕХ НА ВСИЧКИ МАЛКИ КИТАРИСТИ!</Text>
              <Link color={'fg.info'} href="/group-lessons/classical-guitar-course">
                Още за курса
              </Link>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.subtle'}>
          <Image
            flex={1}
            alt="Piano Course"
            src={'/events/piano-course.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>ПИАНО ЗА НАЙ-МАЛКИТЕ</Heading>
              <Text>
                Ако вярвате, че Вашето дете притежава музикален талант. Заслушва се когато му пеете,
                реагира емоционално на музика или имитира свирене на музикален инструмент, проявете
                смелост и го доведете на прослушване!
              </Text>
              <Text>А ние вярваме, че ще запалим искрата и ще развием таланта му.</Text>
              <Text>
                Курс за групово обучение по пиано за малчугани е специално разработена система за
                обучение на деца от 4 до 7 години ( за деца от 3 и 4 групи на детската градина).
                Провежда се в два модула: Ниво I и Ниво II. Всеки модул е с продължителност 16
                седмици (32 учебни часа по 50 мин.)
              </Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>График за провеждане на часовете:</Text>
                <Text>
                  <b>НАЧАЛО</b> на Първи модул - 6.10.2025г.
                </Text>
                <Text>Понеделник и сряда от 18:00ч. до 18:50ч. в група до 4 деца</Text>
              </Stack>
              <Text>
                Първото Ниво завършва с мини концерт, в който децата ще се изявят пред родителите
                си.
              </Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>График за провеждане на часовете:</Text>
                <Text>Понеделник и сряда от 18:00 ч. до 18:50 ч.</Text>
              </Stack>
              <Text>
                <b>ЗАПИСВАНЕ</b> за прослушване на e-mail: thelittlebigtalents1@gmail.com
              </Text>
              <Stack gap={0}>
                <Text fontWeight={'semibold'}>Дати за Прослушване:</Text>
                <Text>27. 09. от 16:00 ч. и 29.09. от 18:00 ч.</Text>
              </Stack>
              <List.Root>
                <List.Item>
                  Проверка на музикално-слухови възможности, ритмичност на детето и емоционалната му
                  отзивчивост.
                </List.Item>
                <List.Item>Събеседване с родителите.</List.Item>
              </List.Root>
              <Text>
                <b>Класиране:</b> Одобрените кандидати, ще бъдат уведомени по имейл.
              </Text>
              <Text>УСПЕХ МАЛКИ ТАЛАНТИ, ОЧАКВАМЕ ВИ!</Text>
              <Link color={'fg.info'} href="/group-lessons/piano-for-little-ones">
                Още за курса
              </Link>
            </Stack>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
