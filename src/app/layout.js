import './globals.css'
import { ProvedorIdioma } from '@/contexts/ContextoIdioma'
export const metadata = {
  title: 'Bueno Mídias | Tráfego Pago & Performance Digital',
  description: 'Transformamos dados em escala e tráfego em lucro. Mais de R$ 5 Milhões gerenciados em tráfego pago desde 2020.',
  keywords: 'tráfego pago, marketing digital, google ads, meta ads, landing pages, automação',
  authors: [{ name: 'Bueno Mídias' }],
  icons: { icon: '/favicon.svg' },
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
        <ProvedorIdioma>{children}</ProvedorIdioma>
      </body>
    </html>
  )
}

<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>