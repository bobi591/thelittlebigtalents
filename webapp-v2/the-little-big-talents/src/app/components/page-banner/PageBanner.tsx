import { Box, Flex, Heading, Image } from '@chakra-ui/react';

interface PageBannerProps {
  imgSrc?: string;
  text: string;
  videoSrc?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ imgSrc, text, videoSrc }) => {
  return (
    <Box>
      <Flex
        position="absolute"
        width="100%"
        height={imgSrc || videoSrc ? '40vh' : '10vh'}
        justify="center"
        align="center"
        zIndex={10}
        color={imgSrc || videoSrc ? 'white' : undefined}
        background={
          imgSrc || videoSrc
            ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0,0,0,0))'
            : undefined
        }
      >
        <Heading as={'h1'} textStyle={'2xl'} textAlign={'center'}>
          {text}
        </Heading>
      </Flex>
      {imgSrc ? (
        <Image alt={text} src={imgSrc} width="100vw" height="40vh" objectFit="cover" />
      ) : videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100vw',
            height: '40vh',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box height="10vh" />
      )}
    </Box>
  );
};
