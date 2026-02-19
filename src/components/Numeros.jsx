'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { DollarSign, FileCode, Calendar, Award } from 'lucide-react'
import { useTraducao } from '@/hooks/useTraducao'

// Dados não-textuais ficam no componente
const META_ESTATISTICAS = [
  { Icone: DollarSign, valor: 5,    cor: 'cyber-primary',   ehAno: false },
  { Icone: FileCode,   valor: 50,   cor: 'cyber-secondary', ehAno: false },
  { Icone: Calendar,   valor: 2020, cor: 'cyber-accent',    ehAno: true  },
]

function ContadorAnimado({ fim, duracao = 2, prefixo = '', sufixo = '' }) {
  const [contagem, setContagem] = useState(0)
  const referencia = useRef(null)
  const estaVisivel = useInView(referencia, { once: true })

  useEffect(() => {
    if (!estaVisivel) return

    let tempoInicio
    const animar = (tempoAtual) => {
      if (!tempoInicio) tempoInicio = tempoAtual
      const progresso = Math.min((tempoAtual - tempoInicio) / (duracao * 1000), 1)
      setContagem(Math.floor(progresso * fim))
      if (progresso < 1) requestAnimationFrame(animar)
    }

    requestAnimationFrame(animar)
  }, [estaVisivel, fim, duracao])

  return (
    <span ref={referencia}>
      {prefixo}{contagem.toLocaleString('pt-BR')}{sufixo}
    </span>
  )
}

const obterCor = (cor) => {
  switch (cor) {
    case 'cyber-primary':   return '#00d4ff'
    case 'cyber-secondary': return '#7c3aed'
    case 'cyber-accent':    return '#10b981'
    default:                return '#00d4ff'
  }
}

export default function Numeros() {
  const referencia = useRef(null)
  const estaVisivel = useInView(referencia, { once: true, margin: '-100px' })
  const { t } = useTraducao()

  const textoEstat = t('numbers.stats')
  const estatisticas = META_ESTATISTICAS.map((meta, i) => ({ ...meta, ...textoEstat[i] }))

  return (
    <section id="numeros" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 via-transparent to-dark-800/50" />

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
            className="inline-flex items-center space-x-2 bg-cyber-accent/10 border border-cyber-accent/30 rounded-full px-4 py-2 mb-6"
          >
            <Award size={16} className="text-cyber-accent" />
            <span className="text-sm text-cyber-accent font-medium">{t('numbers.badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">{t('numbers.title')} </span>
            <span className="gradient-text">{t('numbers.titleGradient')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('numbers.subtitle')}
          </motion.p>
        </motion.div>

        {/* Grade de Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {estatisticas.map((estat, indice) => (
            <motion.div
              key={estat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + indice * 0.15, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-600 hover:border-cyber-primary/50 transition-all duration-500 card-hover h-full">
                {/* Ícone */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
                  style={{
                    backgroundColor: `${obterCor(estat.cor)}1a`,
                    border: `1px solid ${obterCor(estat.cor)}4d`,
                  }}
                >
                  <estat.Icone size={28} style={{ color: obterCor(estat.cor) }} />
                </motion.div>

                {/* Valor */}
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {estat.ehAno ? (
                    <span>{estat.prefix}2020</span>
                  ) : (
                    <ContadorAnimado
                      fim={estat.valor}
                      prefixo={estat.prefix}
                      sufixo={estat.suffix}
                    />
                  )}
                </div>

                {/* Rótulo */}
                <h3 className="text-xl font-semibold text-white mb-2">{estat.label}</h3>

                {/* Descrição */}
                <p className="text-gray-400 text-sm">{estat.description}</p>

                {/* Brilho no hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{ background: `${obterCor(estat.cor)}1a` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
