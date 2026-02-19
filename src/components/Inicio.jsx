'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ChevronDown, Zap, TrendingUp, BarChart3 } from 'lucide-react'
import { useTraducao } from '@/hooks/useTraducao'

const linkWhatsapp = 'https://wa.me/5511969107843?text=Olá! Vim pelo site e gostaria de falar com um consultor.'

export default function Inicio() {
  const { t } = useTraducao()

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden">
      {/* Elementos de Fundo Animados */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-cyber-primary/20 rounded-full blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyber-secondary/20 rounded-full blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-accent/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Ícones Flutuantes */}
      <motion.div
        className="absolute top-32 left-[15%] text-cyber-primary/30"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Zap size={40} />
      </motion.div>
      <motion.div
        className="absolute top-48 right-[20%] text-cyber-secondary/30"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <TrendingUp size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[20%] text-cyber-accent/30"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <BarChart3 size={36} />
      </motion.div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Selo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-dark-700/50 border border-dark-600 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-cyber-accent rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">{t('hero.badge')}</span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
          >
            <span className="gradient-text">{t('hero.title')}</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-8 py-4 rounded-full text-lg font-semibold text-dark-900 btn-shine overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={22} className="relative z-10" />
              <span className="relative z-10">{t('hero.cta')}</span>
            </motion.a>

            <motion.a
              href="#servicos"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors px-6 py-4"
              whileHover={{ x: 5 }}
            >
              <span>{t('hero.verServicos')}</span>
              <ChevronDown size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de Scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-gray-600" size={32} />
      </motion.div>
    </section>
  )
}
