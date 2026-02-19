'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Target,
  Layout,
  Cog,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { useTraducao } from '@/hooks/useTraducao'

const linkWhatsapp = 'https://wa.me/5511969107843?text=Olá! Vim pelo site e gostaria de saber mais sobre os serviços.'

// Dados não-textuais ficam no componente
const META_SERVICOS = [
  { Icone: Target,        cor: 'cyber-primary',   gradiente: 'from-cyber-primary/20 to-cyber-primary/5' },
  { Icone: Layout,        cor: 'cyber-secondary',  gradiente: 'from-cyber-secondary/20 to-cyber-secondary/5' },
  { Icone: Cog,           cor: 'cyber-accent',     gradiente: 'from-cyber-accent/20 to-cyber-accent/5' },
  { Icone: MessageSquare, cor: 'cyber-primary',    gradiente: 'from-cyber-primary/20 to-cyber-secondary/5' },
]

const obterCor = (cor) => {
  switch (cor) {
    case 'cyber-primary':   return '#00d4ff'
    case 'cyber-secondary': return '#7c3aed'
    case 'cyber-accent':    return '#10b981'
    default:                return '#00d4ff'
  }
}

export default function Servicos() {
  const referencia = useRef(null)
  const estaVisivel = useInView(referencia, { once: true, margin: '-100px' })
  const { t } = useTraducao()

  const listaServicos = t('services.list')
  const servicos = META_SERVICOS.map((meta, i) => ({ ...meta, ...listaServicos[i] }))

  return (
    <section id="servicos" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent" />

      <div ref={referencia} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={estaVisivel ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles size={16} className="text-cyber-primary" />
            <span className="text-sm text-cyber-primary font-medium">{t('services.badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">{t('services.title')} </span>
            <span className="gradient-text">{t('services.titleGradient')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('services.subtitle')}
          </motion.p>
        </motion.div>

        {/* Grade de Serviços */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {servicos.map((servico, indice) => (
            <motion.div
              key={servico.title}
              initial={{ opacity: 0, y: 40 }}
              animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + indice * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-dark-800/60 backdrop-blur-sm rounded-2xl p-8 border border-dark-600 hover:border-opacity-50 transition-all duration-500 card-hover overflow-hidden">
                {/* Gradiente de Fundo */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${servico.gradiente} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Ícone */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
                    style={{
                      backgroundColor: `${obterCor(servico.cor)}15`,
                      border: `1px solid ${obterCor(servico.cor)}30`,
                    }}
                  >
                    <servico.Icone size={28} style={{ color: obterCor(servico.cor) }} />
                  </motion.div>

                  {/* Título */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-primary transition-colors">
                    {servico.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-gray-400 mb-6">{servico.description}</p>

                  {/* Funcionalidades */}
                  <ul className="space-y-3 mb-6">
                    {servico.features.map((funcionalidade, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={estaVisivel ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + indice * 0.15 + i * 0.1 }}
                        className="flex items-center space-x-3 text-sm text-gray-300"
                      >
                        <CheckCircle2
                          size={16}
                          style={{ color: obterCor(servico.cor) }}
                          className="flex-shrink-0"
                        />
                        <span>{funcionalidade}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Link de Ação */}
                  <motion.a
                    href={linkWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm font-medium transition-colors"
                    style={{ color: obterCor(servico.cor) }}
                    whileHover={{ x: 5 }}
                  >
                    <span>{t('services.learnMore')}</span>
                    <ArrowRight size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">{t('services.ctaText')}</p>
          <motion.a
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-8 py-4 rounded-full text-lg font-semibold text-dark-900 btn-shine"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare size={22} />
            <span>{t('services.ctaButton')}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
