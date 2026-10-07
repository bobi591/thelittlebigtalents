import { Box, BoxProps, Stack } from '@chakra-ui/react';

const PageSectionStack: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box {...props} w={'100%'}>
      <Stack
        p={{ base: 6, md: 10 }}
        gap={{ base: 6, md: 10 }}
        w={'100%'}
        maxW={'6xl'}
        mx={'auto'}
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'stretch', md: 'center' }}
        // Children split the row evenly; minW 0 lets long text shrink instead of overflowing.
        css={{ '& > *': { flex: '1 1 0', minW: 0 } }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default PageSectionStack;
