'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, ExternalLink } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useTraducao } from '@/hooks/useTraducao'
const META_CLIENTES = [
  { nome: 'Universidade Bilíngue', url: 'https://universidadebilingue.com.br/' },
  { nome: 'Prime Time Palestras',  url: 'https://primetimepalestras.com.br/' },
  { nome: 'Basi Marketing',        url: 'https://basimarketing.com.br/' },
  { nome: 'Sintetiza Educação',    url: 'https://sintetizaeducacao.com.br/' },
  { nome: 'Bueno Advisory',        url: 'https://buenoadvisory.com.br/' },
  { nome: 'Will Teach',            url: 'https://willteach.com.br/' },
  { nome: 'Sfera Motéis',          url: 'https://sferamoteis.com.br/modelo01/' },
]
export default function Clientes() {
  const referencia = useRef(null)
  const estaVisivel = useInView(referencia, { once: true, margin: '-100px' })
  const { t } = useTraducao()
  const descricoes = t('clients.descriptions')
  const clientes = META_CLIENTES.map((meta, i) => ({ ...meta, descricao: descricoes[i] }))
  return (
    <section id="clientes" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-800" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-secondary/30 to-transparent" />
      <div ref={referencia} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={estaVisivel ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={estaVisivel ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }} className="inline-flex items-center space-x-2 bg-cyber-secondary/10 border border-cyber-secondary/30 rounded-full px-4 py-2 mb-6">
            <Users size={16} className="text-cyber-secondary" />
            <span className="text-sm text-cyber-secondary font-medium">{t('clients.badge')}</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={estaVisivel ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">{t('clients.title')} </span><span className="gradient-text">{t('clients.titleGradient')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={estaVisivel ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="text-gray-400 text-lg max-w-2xl mx-auto">{t('clients.subtitle')}</motion.p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={estaVisivel ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }}>
          <Swiper modules={[Autoplay]} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} slidesPerView={1} spaceBetween={24} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}>
            {clientes.map((cliente) => (
              <SwiperSlide key={cliente.nome}>
                <a href={cliente.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <div className="relative h-full bg-dark-800/60 backdrop-blur-sm rounded-2xl p-6 border border-dark-600 hover:border-cyber-primary/50 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyber-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyber-primary transition-colors">{cliente.nome}</h3>
                        <ExternalLink size={18} className="text-gray-500 group-hover:text-cyber-primary transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-gray-400 text-sm">{cliente.descricao}</p>
                      <div className="mt-4 pt-4 border-t border-dark-600">
                        <span className="text-xs text-gray-500 group-hover:text-cyber-primary transition-colors">{t('clients.visitSite')}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
