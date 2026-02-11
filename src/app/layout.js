import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata = {
  title: 'Bueno Mídias | Tráfego Pago & Performance Digital',
  description: 'Transformamos dados em escala e tráfego em lucro. Mais de R$ 5 Milhões gerenciados em tráfego pago desde 2020.',
  keywords: 'tráfego pago, marketing digital, google ads, meta ads, landing pages, automação',
  authors: [{ name: 'Bueno Mídias' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Bueno Mídias | Tráfego Pago & Performance Digital',
    description: 'Transformamos dados em escala e tráfego em lucro.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
