import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Stack, Image, Heading, List, Text } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack alignItems={'center'}>
      <PageBanner text="Барабани" videoSrc="/individual-lessons/drums/banner.mp4" />
      <Heading textAlign={'center'} textStyle={'lg'}>
        Гмурни се в света на ритъма и опознай своите възможности
      </Heading>
      <Heading textAlign={'center'} textStyle={'sm'} maxW={'800px'}>
        В индивидуалните уроци по барабани ще се научите да свирите любимите си песни, да четете
        гладко ноти, да импровизирате на инструмента и възможност да практикувате различни стилове
        като поп, рок, джаз и класическа музика.
      </Heading>
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/drums/drums-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>В началния етап учим</Heading>
              <List.Root>
                <List.Item>{`Правилна постановка`}</List.Item>
                <List.Item>{`Нотните трайности и размери`}</List.Item>
                <List.Item>{`Как се четат ноти за барабани`}</List.Item>
                <List.Item>{`Координация`}</List.Item>
                <List.Item>{`Свирене с метроном`}</List.Item>
              </List.Root>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/drums/drums-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Heading>Основно обучение по барабани</Heading>
            <Text>Различни техники за бързина като:</Text>
            <List.Root>
              <List.Item>{`Тремоло, Форшлаг, Push-Pull`}</List.Item>
              <List.Item>{`методът на ,,Moeller" и други`}</List.Item>
              <List.Item>{`Усилено изучаване на различни школи за координация, груув`}</List.Item>
              <List.Item>{`Kонтрол, бързина, и цялостно овладяване на инструмента и всичките му компоненти`}</List.Item>
              <List.Item>{`Работа върху Репертоар`}</List.Item>
              <List.Item>{`Песни и инструментилани пиеси в различни музикални стилове`}</List.Item>
              <List.Item>{`Подготовка за концерти, участия`}</List.Item>
            </List.Root>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
