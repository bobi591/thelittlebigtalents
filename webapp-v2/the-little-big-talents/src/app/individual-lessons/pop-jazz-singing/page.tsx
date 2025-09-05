import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Stack, Image, Heading, List } from '@chakra-ui/react';

const Page: React.FC = () => {
  return (
    <Stack alignItems={'center'}>
      <PageBanner
        text="Поп и джаз пеене"
        videoSrc="/individual-lessons/pop-jazz-singing/banner.mp4"
      />
      <Heading textAlign={'center'} textStyle={'lg'}>
        Открий своя глас, развий и усъвършенствай потенциала му{' '}
      </Heading>
      <Heading textAlign={'center'} textStyle={'sm'} maxW={'800px'}>
        Индивидуалните уроци по пеене целят да усъвършенстват вокалната техника на гласа, която дава
        възможността да се изпълняват различни музикални стилове като поп, рок, джаз стандарти,
        мюзикъл и други съвременни стилове.
      </Heading>
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/pop-jazz-singing/popjazz-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Начален етап на обучение</Heading>
              <List.Root>
                <List.Item>{`Изучаване на гласа като инструмент`}</List.Item>
                <List.Item>{`Опознаване на гласовия апарат`}</List.Item>
                <List.Item>{`Диапазон и тембър`}</List.Item>
                <List.Item>{`Разпяване`}</List.Item>
                <List.Item>{`Звукоизвличане и верен  тон`}</List.Item>
                <List.Item>{`Правилно дишане`}</List.Item>
                <List.Item>{`Певческа стойка`}</List.Item>
                <List.Item>{`Начална постановка на гласа`}</List.Item>
                <List.Item>{`Вокална артикулация`}</List.Item>
                <List.Item>{`Дикция`}</List.Item>
                <List.Item>{`Първи грижи за гласа`}</List.Item>
              </List.Root>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.muted'}>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/pop-jazz-singing/popjazz-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Heading>Основно вокално обучение</Heading>
            <List.Root>
              <List.Item>{`Развитие потенциала на гласа`}</List.Item>
              <List.Item>{`Създаване на певчески навици и формиране на умения`}</List.Item>
              <List.Item>{`Разпяване и подготовка за репетиция`}</List.Item>
              <List.Item>{`Правилно дишане и опора в различните регистри`}</List.Item>
              <List.Item>{`Звукоизвличане и вокалообразуване`}</List.Item>
              <List.Item>{`Правилна дикция и вокална артикулация`}</List.Item>
              <List.Item>{`Фразиране, динамика, вибрато, орнаментика`}</List.Item>
              <List.Item>{`Стилови похвати и интерпретация`}</List.Item>
              <List.Item>{`Вокални техники и постановки`}</List.Item>
              <List.Item>{`Разширяване и развитие на гласовия диапазон, изравняване и издръжливост`}</List.Item>
              <List.Item>{`Изработване на подходящ репертоар`}</List.Item>
              <List.Item>{`Изграждане на собствен стил на интерпретация`}</List.Item>
              <List.Item>{`Микрофонна техника`}</List.Item>
              <List.Item>{`Хигиена и грижа за гласа`}</List.Item>
            </List.Root>
          </Stack>
        </PageSectionStack>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Subject"
            src={'/individual-lessons/pop-jazz-singing/popjazz-3.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading>Подготовка за сценични изяви, концерти и вокални конкурси</Heading>
              <List.Root>
                <List.Item>{`Сценично и артистично поведение`}</List.Item>
                <List.Item>{`Сценична реч`}</List.Item>
                <List.Item>{`Пърформанс`}</List.Item>
              </List.Root>
            </Stack>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
