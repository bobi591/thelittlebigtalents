'use client';

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

// Chakra's list markers sit outside the content box with no padding,
// so they overflow into neighbouring elements (e.g. images). Indent them.
const config = defineConfig({
  theme: {
    slotRecipes: {
      list: {
        slots: ['root', 'item', 'indicator'],
        variants: {
          variant: {
            marker: {
              root: { ps: '1.25em' },
            },
          },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        enableSystem={false}
        defaultTheme="light"
      >
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
