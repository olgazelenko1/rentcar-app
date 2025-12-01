import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header/Header';
import { Manrope, Inter } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'], // Regular, Medium, SemiBold, Bold
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'], // Regular, Medium, SemiBold
});
export const metadata: Metadata = {
  title: 'RentalCar - Find best rental cars',
  description:
    'Rent a car easily and quickly. Choose from hundreds of vehicles for any journey and budget.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable} ...`}>
        {/* ... */}
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
