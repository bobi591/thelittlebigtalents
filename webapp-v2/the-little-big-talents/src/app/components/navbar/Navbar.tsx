import {
  Box,
  Button,
  Collapsible,
  Icon,
  Image,
  Menu,
  Portal,
  Separator,
  Stack,
  Link,
} from '@chakra-ui/react';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';
import { NavbarData } from './data';
import { isEmpty } from 'lodash';
import { Fragment } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar: React.FC = () => {
  const navbar = NavbarData.map((navItem) => {
    if (isEmpty(navItem.children)) {
      return (
        <Button
          key={navItem.title}
          variant="plain"
          textTransform={'uppercase'}
          color="blackAlpha.900"
        >
          {navItem.link ? <Link href={navItem.link}>{navItem.title}</Link> : <>{navItem.title}</>}
        </Button>
      );
    } else {
      return (
        <Menu.Root key={navItem.title}>
          <Menu.Trigger asChild>
            <Button variant="plain" textTransform={'uppercase'} color="blackAlpha.900" gap={0}>
              {navItem.title}
              {navItem.children && <LuChevronDown />}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {navItem.children?.map((navItem) => {
                  if (isEmpty(navItem.children)) {
                    return (
                      <Fragment key={navItem.title}>
                        {navItem.divided && <Separator />}
                        <Menu.Item
                          p="1"
                          textTransform={'uppercase'}
                          color="blackAlpha.900"
                          value={navItem.title}
                        >
                          {navItem.link ? (
                            <Link href={navItem.link}>{navItem.title}</Link>
                          ) : (
                            <>{navItem.title}</>
                          )}
                        </Menu.Item>
                      </Fragment>
                    );
                  } else {
                    return (
                      <Fragment key={navItem.title}>
                        {navItem.divided && <Separator />}
                        <Menu.Root>
                          <Menu.TriggerItem
                            p="1"
                            textTransform={'uppercase'}
                            color="blackAlpha.900"
                          >
                            {navItem.title} <LuChevronRight />
                          </Menu.TriggerItem>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content>
                                {navItem.children?.map((navItem) => {
                                  return (
                                    <Fragment key={navItem.title}>
                                      {navItem.divided && <Separator />}
                                      <Menu.Item
                                        p="1"
                                        textTransform={'uppercase'}
                                        color="blackAlpha.900"
                                        value={navItem.title}
                                      >
                                        {navItem.link ? (
                                          <Link href={navItem.link}>{navItem.title}</Link>
                                        ) : (
                                          <>{navItem.title}</>
                                        )}
                                      </Menu.Item>
                                    </Fragment>
                                  );
                                })}
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.Root>
                      </Fragment>
                    );
                  }
                })}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      );
    }
  });

  const desktopNavbar = (
    <Box pt={2} display={{ base: 'none', md: 'block' }}>
      <Stack alignItems={'center'} textTransform={'uppercase'} color="blackAlpha.900">
        <Link href="/">
          <Image alt="logo" src={'/logo.png'} width={'15%'} height={'15%'} margin={'auto'} />
        </Link>
        <Stack direction={'row'} textStyle={'xl'}>
          {navbar}
        </Stack>
      </Stack>
    </Box>
  );

  const mobileNavbar = (
    <Box pt={2} display={{ base: 'block', md: 'none' }}>
      <Stack alignItems={'center'} textTransform={'uppercase'} color="blackAlpha.900">
        <Link href="/">
          <Image alt="logo" src={'/logo.png'} width={'15%'} height={'15%'} margin={'auto'} />
        </Link>
        <Collapsible.Root>
          <Collapsible.Trigger minW={'100vw'}>
            <Icon>{<RxHamburgerMenu />}</Icon>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Stack direction={'column'} textStyle={'xl'} gap={0}>
              {navbar}
            </Stack>
          </Collapsible.Content>
        </Collapsible.Root>
      </Stack>
    </Box>
  );

  return (
    <nav>
      <Box boxShadow={'xs'} pb={1}>
        {desktopNavbar}
        {mobileNavbar}
      </Box>
    </nav>
  );
};

export default Navbar;
