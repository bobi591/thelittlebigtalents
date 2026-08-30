import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Text, Stack, Image, Heading, Link } from '@chakra-ui/react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Музикални дисциплини – Музикален Център "Малките Големи Таланти"',
  description:
    'Научете повече за музикалните дисциплини, преподавани в Музикален Център "Малките Големи Таланти".',
};

const Page: React.FC = () => {
  return (
    <Stack>
      <PageBanner text="Музикални дисциплини" />
      <Heading textAlign={'center'} textStyle={'md'}>
        Добре дошли в нашето музикално пространство, в което музицират и творят деца и възрастни.
      </Heading>
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Музикални дисциплини"
            src={'/about-us/music-disciplines/subjects-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Вокални дисциплини</Heading>
              <Stack>
                <Link href="/individual-lessons/pop-jazz-singing">{`Поп и джаз пеене`}</Link>
                <Text>{`Фолклорно пеене`}</Text>
                <Link href="/group-lessons/vocal-groups">{`Вокални групи`}</Link>
              </Stack>
              <Stack textStyle={'sm'}>
                <Text>{`За най-малките – от 5 до 9г.`}</Text>
                <Text>{`За тийнеджъри от 10 до 18г.`}</Text>
                <Text>{`За възрастни`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            flex={1}
            alt="Инструментални дисциплини"
            src={'/about-us/music-disciplines/subjects-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Инструментални дисциплини</Heading>
              <Stack>
                <Link href="/individual-lessons/piano">{`Пиано`}</Link>
                <Link href="/individual-lessons/guitar">{`Китара`}</Link>
                <Link href="/individual-lessons/violin">{`Цигулка`}</Link>
                <Link href="/individual-lessons/drums">{`Барабани`}</Link>
                <Link href="#">{`Ксилофон, маримба и прекусии`}</Link>
              </Stack>
              <Stack textStyle={'sm'}>
                <Text>{`За най-малките – от 5 до 9г.`}</Text>
                <Text>{`За тийнеджъри от 10 до 18г.`}</Text>
                <Text>{`За възрастни`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Теоретични дисциплини"
            src={'/about-us/music-disciplines/subjects-3.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Теоретични дисциплини</Heading>
              <Stack>
                <Link href="/group-lessons/solfege-music-theory">{`Теория и елементи на музиката`}</Link>
                <Link href="/group-lessons/solfege-music-theory">{`Солфеж`}</Link>
              </Stack>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            flex={1}
            alt="Сценични дисциплини"
            src={'/about-us/music-disciplines/subjects-4.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Сценични дисциплини</Heading>
              <Stack>
                <Text>{`Сценично поведение`}</Text>
                <Text>{`Пърформанс`}</Text>
              </Stack>
              <Stack textStyle={'sm'}>
                <Text>{`За концертиращи вокалисти и инструменталисти`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
