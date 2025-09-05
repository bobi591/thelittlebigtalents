import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/components/navbar/Navbar';

import '@fontsource/montserrat';
import { Stack } from '@chakra-ui/react';
import Provider from './components/chakra/provider';
import Footer from './components/footer/Footer';

export const metadata: Metadata = {
  title: 'Музикален Център "Малките Големи Таланти"',
  description:
    'Музикален Център "Малките Големи Таланти". Уроци по барабани, китара, пеене, пиано и солфеж.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Stack gap={0}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Stack>
        </Provider>
      </body>
    </html>
  );
}
