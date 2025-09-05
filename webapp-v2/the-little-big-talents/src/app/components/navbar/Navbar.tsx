import {
  Box,
  Collapsible,
  Icon,
  Image,
  Stack,
  Link,
  Button,
  Menu,
  Portal,
  Separator,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { Fragment } from 'react';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavbarData } from './data';

const Navbar: React.FC = () => {
  const desktopNavbar = (
    <Box pt={2} display={{ base: 'none', md: 'block' }}>
      <Stack alignItems={'center'} textTransform={'uppercase'}>
        <Link focusRing={'none'} href="/">
          <Image alt="logo" src={'/logo.png'} width={'15%'} height={'15%'} margin={'auto'} />
        </Link>
        <Stack direction={'row'} textStyle={'xl'}>
          {NavbarData.map((navItem) => {
            if (isEmpty(navItem.children)) {
              return (
                <Button
                  key={navItem.title}
                  textTransform={'uppercase'}
                  bgColor={'unset'}
                  color={'unset'}
                >
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
                                    <Link focusRing={'none'} color={'unset'} href={navItem.link}>
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
                                                  <Link
                                                    focusRing={'none'}
                                                    color={'unset'}
                                                    href={navItem.link}
                                                  >
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
          })}
        </Stack>
      </Stack>
    </Box>
  );

  const mobileNavbar = (
    <Box pt={2} display={{ base: 'block', md: 'none' }}>
      <Stack alignItems={'center'} textTransform={'uppercase'}>
        <Link focusRing={'none'} color={'unset'} href="/">
          <Image alt="logo" src={'/logo.png'} width={'15%'} height={'15%'} margin={'auto'} />
        </Link>
        <Collapsible.Root>
          <Collapsible.Trigger minW={'100vw'}>
            <Icon>{<RxHamburgerMenu />}</Icon>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Stack direction={'column'} gap={0} alignItems={'center'}>
              {NavbarData.map((navItem) => {
                if (isEmpty(navItem.children)) {
                  return (
                    <Button
                      key={navItem.title}
                      textTransform={'uppercase'}
                      bgColor={'unset'}
                      color={'unset'}
                    >
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
                    <Collapsible.Root key={navItem.title}>
                      <Collapsible.Trigger
                        minW={'100vw'}
                        textTransform={'uppercase'}
                        gap={0}
                        color={'unset'}
                        bgColor={'unset'}
                        as={Button}
                      >
                        {navItem.title}
                        {navItem.children && <LuChevronDown />}
                      </Collapsible.Trigger>
                      <Collapsible.Content bgColor={'bg.emphasized'}>
                        <Stack alignItems={'center'} gap={0}>
                          {navItem.children?.map((navItem) => {
                            if (isEmpty(navItem.children)) {
                              return (
                                <Fragment key={navItem.title}>
                                  {navItem.divided && <Separator />}
                                  <Button
                                    textTransform={'uppercase'}
                                    gap={0}
                                    color={'unset'}
                                    bgColor={'unset'}
                                  >
                                    {navItem.link ? (
                                      <Link focusRing={'none'} color={'unset'} href={navItem.link}>
                                        {navItem.title}
                                      </Link>
                                    ) : (
                                      <>{navItem.title}</>
                                    )}
                                  </Button>
                                </Fragment>
                              );
                            } else {
                              return (
                                <Fragment key={navItem.title}>
                                  {navItem.divided && <Separator />}
                                  <Collapsible.Root>
                                    <Collapsible.Trigger
                                      minW={'100vw'}
                                      textTransform={'uppercase'}
                                      gap={0}
                                      color={'unset'}
                                      bgColor={'unset'}
                                      as={Button}
                                    >
                                      {navItem.title}
                                      {navItem.children && <LuChevronDown />}
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                      <Stack gap={0}>
                                        {navItem.children?.map((navItem) => {
                                          return (
                                            <Fragment key={navItem.title}>
                                              {navItem.divided && <Separator />}
                                              <Button
                                                textTransform={'uppercase'}
                                                gap={0}
                                                color={'unset'}
                                                bgColor={'unset'}
                                              >
                                                {navItem.link ? (
                                                  <Link
                                                    focusRing={'none'}
                                                    color={'unset'}
                                                    href={navItem.link}
                                                  >
                                                    {navItem.title}
                                                  </Link>
                                                ) : (
                                                  <>{navItem.title}</>
                                                )}
                                              </Button>
                                            </Fragment>
                                          );
                                        })}
                                      </Stack>
                                    </Collapsible.Content>
                                  </Collapsible.Root>
                                </Fragment>
                              );
                            }
                          })}
                        </Stack>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  );
                }
              })}
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
