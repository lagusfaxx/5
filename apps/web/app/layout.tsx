import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import AppShell from '../components/AppShell';

const SITE_TITLE = 'UZEED: Escorts y experiencias únicas para adultos';
const SITE_DESCRIPTION =
  'UZEED: Escorts y experiencias únicas para adultos. Descubre profesionales y establecimientos verificados cerca de ti.';

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | UZEED'
  },
  description: SITE_DESCRIPTION,
  applicationName: 'UZEED',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'UZEED',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen text-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
