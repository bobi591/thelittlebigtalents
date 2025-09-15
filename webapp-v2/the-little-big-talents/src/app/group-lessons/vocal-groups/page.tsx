import { PageBanner } from '@/app/components/page-banner/PageBanner';
import PageSectionStack from '@/app/components/page-section-stack/PageSectionStack';
import { Text, Stack, Image, Heading } from '@chakra-ui/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вокални групи – Музикален Център "Малките Големи Таланти"',
  description: 'Научете повече за вокалните групи в Музикален Център "Малките Големи Таланти".',
};

const Page: React.FC = () => {
  return (
    <Stack>
      <PageBanner text="Вокални групи" />
      <Stack margin={'auto'} gap={10} w={'100%'}>
        <PageSectionStack>
          <Image
            flex={1}
            alt="Вокални групи"
            src={'/group-lessons/vocal-groups/vocal-groups-1.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>
                Вокална група “Малките пеещи таланти” - от 5 до 9г.
              </Heading>
              <Stack>
                <Text>{`В репетициите работим върху изграждане на правилна дикция и артикулация, чисто интониране и звукоизвличане, постановка на пеене, метроритмичен и ладов усет, правилно дишане, правилна стойка, сценично поведение и артистичност.`}</Text>
                <Text>{`Заниманията във вокална група, възпитават на дисциплина и отговорност, устойчивост и търпение в екипната работа. Развиват гласа и музикалния слух. А на сцената децата имат възможността да изяват своя талант и артистичност.`}</Text>{' '}
              </Stack>
            </Stack>
          </Stack>
        </PageSectionStack>
        <PageSectionStack bgColor={'bg.subtle'}>
          <Image
            flex={1}
            alt="Вокални групи"
            src={'/group-lessons/vocal-groups/vocal-groups-2.jpg'}
            maxH={'400px'}
            margin={'auto'}
            fit="contain"
          />
          <Stack flex={1}>
            <Stack>
              <Heading textAlign={'center'}>Тийн вокална група – от 9 до 16г.</Heading>
              <Stack>
                <Text>{`Заниманията с пеене и музика помагат на децата да общуват и да се себеизразяват.  Развиват емоционалната интелигентност и музикална естетика. Групата изпълнява подбран репертоар, съобразен с възрастта и вокалното развитие на всеки участник вокалист.`}</Text>
                <Text>{`Изучаваме, изработваме и изпълняваме песни на различни езици в стиловете - поп и джаз, рок , мюзикъл, филмова музика и други. Усъвършенстваме вокалните умения като работим върху, певческа дикция и артикулация, работа върху текста, правилно дишане, стилово звукоизвличане и интерпретация, чисто интониране - унисон в ансамбъл, двуглас и триглас, разширяване на диапазона в различните гласови регистри, микрофонна техника, сценично поведение и артистична интерпретация, пърформанс.`}</Text>
                <Text>{`В петгодишната си история групата има участията в  различни музикални събития, концерти. Лауреат е и от множество вокални конкурси и музикални фестивали.`}</Text>
              </Stack>
            </Stack>
          </Stack>
        </PageSectionStack>
      </Stack>
    </Stack>
  );
};

export default Page;
