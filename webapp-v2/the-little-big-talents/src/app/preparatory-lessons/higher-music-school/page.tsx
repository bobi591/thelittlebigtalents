import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Stack, List, Text } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack alignItems={'center'}>
      <PageBanner
        text="Подготвителни уроци за кандидатстване за висши училища по изкуствата"
        videoSrc="/preparatory-lessons/higher-music-school/banner.mp4"
      />
      <PageSectionStack>
        <Stack>
          <Text>
            Обучителният процес на подготовка за кандидатстване във висши учебни заведения по музика
            е продължителен и изключително сериозен. В кандидатстудентските изпити е включен
            материал, който се изучава с години в музикални училища и паралелки. Нужни са определи
            умения и знания, които не могат да се придобият за една или две години музициране. А за
            някои специалности се изисква подготовка и по облигатно (задължително) пиано.
          </Text>
          <Text pb={5}>
            Подготовка за приемни изпити в Национална музикална академия, университети и колежи по
            специалностите:
          </Text>
          <Text textDecoration={'underline'} fontWeight={'semibold'}>
            „ПЕДАГОГИКА НА ОБУЧЕНИЕТО ПО МУЗИКА“
          </Text>
          <List.Root>
            <List.Item>ПИАНО, солфеж и теория на музикалните елементи.</List.Item>
            <List.Item>ПИАНО, солфеж и теория на музикалните елементи.</List.Item>
            <List.Item>
              ПОП И ДЖАЗ ПЕЕНЕ, солфеж и теория на музикалните елементи и актьорско майсторство,
              облигатно пиано.
            </List.Item>
            <List.Item>
              ФОЛКЛОРНО ПЕЕНЕ, солфеж и теория на музикалните елементи, облигатно пиано.
            </List.Item>
          </List.Root>
          <Text textDecoration={'underline'} fontWeight={'semibold'}>
            „ЗВУКОРЕЖИСУРА, ЗВУКОВ И МЕДИЕН ДИЗАЙН“
          </Text>
          <List.Root>
            <List.Item>ПИАНО, солфеж и теория на музикалните елементи.</List.Item>
            <List.Item>ПОП И ДЖАЗ ПЕЕНЕ, солфеж и теория на музикалните елементи</List.Item>
            <List.Item>ФОЛКЛОРНО ПЕЕНЕ, солфеж и теория на музикалните елементи</List.Item>
            <List.Item>ИНСТРУМЕНТОЗНАНЕ, слухов тест и писмен изпит</List.Item>
          </List.Root>
        </Stack>
      </PageSectionStack>
    </Stack>
  );
};

export default Page;
