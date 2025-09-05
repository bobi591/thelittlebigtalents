import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import ImagesSlider from './components/images-slider/ImagesSlider';
import { LuCalendarCheck, LuPhoneCall } from 'react-icons/lu';

const imagesSrcs = [
  '/slides/1.jpg',
  '/slides/2.jpg',
  '/slides/3.jpg',
  '/slides/4.jpg',
  '/slides/5.jpg',
  '/slides/6.jpg',
];

const Home: React.FC = () => {
  return (
    <Stack alignItems={'center'} gap={20} pb={'10'}>
      <Flex
        position="absolute"
        width="100%"
        height="80vh"
        justify="center"
        align="center"
        zIndex={10}
        color={'white'}
        background="linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0,0,0,0))"
      >
        <Stack ml="auto" paddingRight={{ base: 0, md: '5vw' }} alignItems={'center'} gap={8}>
          <Stack direction={'column'} alignItems={'center'}>
            <Heading as={'h1'} textStyle={'2xl'} textAlign={'center'}>
              Впуснете се в света на музиката!
            </Heading>
            <Text>с уроци за начинаещи и напреднали</Text>
          </Stack>
          <Stack direction={'row'}>
            <Button variant={'outline'} color={'white'} _hover={{ color: 'black' }} p={2} disabled>
              <LuCalendarCheck />
              Запиши урок
            </Button>
            <Button variant={'outline'} color={'white'} _hover={{ color: 'black' }} p={2}>
              <LuPhoneCall />
              <a href={'tel:087 619 1718'}>Обади се</a>
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <ImagesSlider>
        {imagesSrcs.map((src) => {
          return (
            <Image
              key={src}
              src={src}
              alt="Slide picture"
              width="100vw"
              height="80vh"
              objectFit="cover"
            />
          );
        })}
      </ImagesSlider>
      <Stack alignItems={'center'} gap={4}>
        <Heading as={'h3'} textStyle={'xl'} textAlign={'center'}>
          Готови ли сте за Вашия Музикален Път?
        </Heading>
        <Text maxWidth={{ base: undefined, md: '40vw' }} textAlign={'center'} textStyle={'sm'}>
          {`В Музикален Център "Малките Големи Таланти" вярваме, че всяко дете е уникално и музиката е ключът за разкриване на неговия потенциал. Ние създаваме образователна среда, в която уникалността на всеки ученик се цени и развива!`}
        </Text>
      </Stack>
    </Stack>
  );
};

export default Home;
