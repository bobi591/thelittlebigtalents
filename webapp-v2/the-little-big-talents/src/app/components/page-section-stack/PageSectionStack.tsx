import { Stack, StackProps } from '@chakra-ui/react';

const PageSectionStack: React.FC<StackProps> = ({ children, ...props }) => {
  return (
    <Stack {...props} p={0}>
      <Stack
        p={10}
        width={{ md: '80vw' }}
        direction={'row'}
        alignSelf={'center'}
        flexWrap={'wrap'}
        alignItems={'center'}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default PageSectionStack;
