import { Stack, Image, Heading, Text, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <footer>
      <Stack direction={'column'} borderTop={'solid 1px'} p={4} alignItems={'center'} gap={8}>
        <Stack direction={'row'} gap={{ base: 1, md: 20 }} overflow={'auto'}>
          <Link href="/individual-lessons/pop-jazz-singing" flexShrink="0">
            <Image
              alt="Pop & Jazz lessons"
              src={'/footer/lessons-pop-jazz.jpeg'}
              margin={'auto'}
              height={'200px'}
              width={'200px'}
            />
          </Link>
          <Link href="/individual-lessons/guitar" flexShrink="0">
            <Image
              alt="Guitar lessons"
              src={'/footer/lessons-guitar.jpeg'}
              margin={'auto'}
              height={'200px'}
              width={'200px'}
            />
          </Link>
          <Link href="/individual-lessons/drums" flexShrink="0">
            <Image
              alt="Drums lessons"
              src={'/footer/lessons-drums.jpeg'}
              margin={'auto'}
              height={'200px'}
              width={'200px'}
            />
          </Link>
          <Link href="/individual-lessons/piano" flexShrink="0">
            <Image
              alt="Piano lessons"
              src={'/footer/lessons-piano.jpeg'}
              margin={'auto'}
              height={'200px'}
              width={'200px'}
            />
          </Link>
        </Stack>
        <Heading
          as={'h1'}
          textStyle={'xl'}
          textAlign={'center'}
        >{`Музикален Център "Малките Големи Таланти"`}</Heading>
        <Stack direction={'row'} gap={10}>
          <a href={'https://www.facebook.com/TheLittleBigTalents'}>
            <Image
              alt="Facebook"
              src={'/footer/facebook-50.png'}
              _hover={{ opacity: '70%', cursor: 'pointer' }}
            />
          </a>
          <a href={'https://www.facebook.com/TheLittleBigTalents'}>
            <Image
              alt="Instagram"
              src={'/footer/instagram-50.png'}
              _hover={{ opacity: '70%', cursor: 'pointer' }}
            />
          </a>

          <a href={'https://tiktok.com/'}>
            <Image
              alt="TikTok"
              src={'/footer/tiktok-50.png'}
              _hover={{ opacity: '70%', cursor: 'pointer' }}
            />
          </a>
          <a href={'https://www.youtube.com/@The-Little-Big-Talents-music'}>
            <Image
              alt="Youtube"
              src={'/footer/youtube-50.png'}
              _hover={{ opacity: '70%', cursor: 'pointer' }}
            />
          </a>
        </Stack>
        <Stack direction={'row'} gap={10} flexWrap={'wrap'}>
          <Stack direction={'column'} alignItems={'center'} margin={'auto'}>
            <Heading as={'h3'} textStyle={'md'}>
              Местоположение
            </Heading>
            <div className="google-map-code">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.1030854644546!2d23.310713776664706!3d42.70153797116318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8539612d52f7%3A0xa8197aaabca5a46c!2z0JzRg9C30LjQutCw0LvQtdC9INGG0LXQvdGC0YrRgCAi0JzQsNC70LrQuNGC0LUg0JPQvtC70LXQvNC4INCi0LDQu9Cw0L3RgtC4Ig!5e0!3m2!1sbg!2sbg!4v1691528684193!5m2!1sbg!2sbg"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ marginBottom: '1%' }}
              ></iframe>
            </div>
            <Text textStyle={'sm'}>ул. „Отец Паисий“ 53</Text>
            <Text textStyle={'sm'}>1303 София център, София</Text>
          </Stack>
          <Stack direction={'column'} margin={'auto'}>
            <Stack direction={'column'} alignItems={'center'}>
              <Heading as={'h3'} textStyle={'md'}>
                Контакти
              </Heading>
              <Text textStyle={'sm'}>
                Телефон:{' '}
                <Link href={'tel:087 619 1718'} color={'fg.info'}>
                  087 619 1718
                </Link>
              </Text>
              <Text textStyle={'sm'}>
                Email:{' '}
                <Link href={'mailto:thelittlebigtalents1@gmail.com"'} color={'fg.info'}>
                  thelittlebigtalents1@gmail.com
                </Link>
              </Text>
            </Stack>
            <Stack direction={'column'} alignItems={'center'} margin={'auto'}>
              <Heading as={'h3'} textStyle={'md'}>
                Работно време
              </Heading>
              <Text textStyle={'sm'}>Понеделник - Петък - 10:00 - 20:00</Text>
              <Text textStyle={'sm'}>Събота - 11:00 - 16:00</Text>
              <Text textStyle={'sm'}>Неделя - Почивен ден</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
