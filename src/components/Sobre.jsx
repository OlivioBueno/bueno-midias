'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye } from 'lucide-react'
import { useTraducao } from '@/hooks/useTraducao'
export default function Sobre() {
  const referencia = useRef(null)
  const estaVisivel = useInView(referencia, { once: true, margin: '-100px' })
  const { t } = useTraducao()
  const valoresEpico = t('about.epic')
  return (
    <section id="sobre" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-secondary/30 to-transparent" />
      <div ref={referencia} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={estaVisivel ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse" />
            <span className="text-sm text-cyber-primary font-medium">{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">{t('about.title')} </span><span className="gradient-text">{t('about.titleGradient')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('about.subtitle')}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={estaVisivel ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative bg-dark-800/60 rounded-2xl border border-dark-600 p-8 overflow-hidden group hover:border-cyber-primary/40 transition-colors">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyber-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-cyber-primary/10 border border-cyber-primary/30 flex-shrink-0"><Target size={22} className="text-cyber-primary" /></div>
              <h3 className="text-xl font-bold text-white">{t('about.mission.title')}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('about.mission.text').split(t('about.mission.highlight')).map((parte, i, arr) =>
                i < arr.length - 1 ? <span key={i}>{parte}<span className="text-cyber-primary font-semibold">{t('about.mission.highlight')}</span></span> : parte
              )}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={estaVisivel ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="relative bg-dark-800/60 rounded-2xl border border-dark-600 p-8 overflow-hidden group hover:border-cyber-secondary/40 transition-colors">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyber-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-cyber-secondary/10 border border-cyber-secondary/30 flex-shrink-0"><Eye size={22} className="text-cyber-secondary" /></div>
              <h3 className="text-xl font-bold text-white">{t('about.vision.title')}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('about.vision.text').split(t('about.vision.highlight')).map((parte, i, arr) =>
                i < arr.length - 1 ? <span key={i}>{parte}<span className="text-cyber-secondary font-semibold">{t('about.vision.highlight')}</span></span> : parte
              )}
            </p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={estaVisivel ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('about.valuesTitle')}{' '}<span className="gradient-text">{t('about.valuesAcronym')}</span></h3>
          <p className="text-gray-500 text-sm">{t('about.valuesSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {valoresEpico.map((valor, indice) => (
            <motion.div key={valor.letter} initial={{ opacity: 0, y: 30 }} animate={estaVisivel ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 + indice * 0.1 }} className="relative bg-dark-800/60 rounded-xl border border-dark-600 p-6 group hover:border-cyber-primary/40 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 border border-cyber-primary/30 mb-4">
                <span className="text-2xl font-black gradient-text">{valor.letter}</span>
              </div>
              <h4 className="text-white font-semibold text-sm mb-2 leading-tight">{valor.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{valor.description}</p>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyber-primary/5 to-cyber-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
