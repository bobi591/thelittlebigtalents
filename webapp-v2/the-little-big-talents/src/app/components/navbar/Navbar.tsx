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
        <Button key={navItem.title} textTransform={'uppercase'} bgColor={'unset'} color={'unset'}>
          {navItem.link ? (
            <Link focusRing={'none'} color={'unset'} href={navItem.link}>
              {navItem.title}
            </Link>
          ) : (
            <>{navItem.title}</>
          )}
        </Button>
      );
    } else {
      return (
        <Menu.Root key={navItem.title}>
          <Menu.Trigger asChild>
            <Button textTransform={'uppercase'} gap={0} color={'unset'} bgColor={'unset'}>
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
                        <Menu.Item p="1" textTransform={'uppercase'} value={navItem.title}>
                          {navItem.link ? (
                            <Link focusRing={'none'} href={navItem.link}>
                              {navItem.title}
                            </Link>
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
                          <Menu.TriggerItem p="1" textTransform={'uppercase'}>
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
                                        value={navItem.title}
                                      >
                                        {navItem.link ? (
                                          <Link focusRing={'none'} href={navItem.link}>
                                            {navItem.title}
                                          </Link>
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
      <Stack alignItems={'center'} textTransform={'uppercase'}>
        <Link focusRing={'none'} href="/">
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
      <Stack alignItems={'center'} textTransform={'uppercase'}>
        <Link focusRing={'none'} href="/">
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
