'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { DollarSign, FileCode, Calendar, Award } from 'lucide-react'

function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}

export default function Numbers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      icon: DollarSign,
      value: 5,
      prefix: 'R$ ',
      suffix: ' Milhões',
      label: 'Em Ads Gerenciados',
      description: 'Investimento otimizado em Google e Meta Ads',
      color: 'cyber-primary',
    },
    {
      icon: FileCode,
      value: 50,
      suffix: '+',
      label: 'Landing Pages',
      description: 'Páginas de alta conversão entregues',
      color: 'cyber-secondary',
    },
    {
      icon: Calendar,
      value: 2020,
      prefix: 'Desde ',
      suffix: '',
      label: 'No Mercado',
      description: 'Anos de experiência e resultados comprovados',
      color: 'cyber-accent',
    },
  ]

  return (
    <section id="numeros" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 via-transparent to-dark-800/50" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-cyber-accent/10 border border-cyber-accent/30 rounded-full px-4 py-2 mb-6"
          >
            <Award size={16} className="text-cyber-accent" />
            <span className="text-sm text-cyber-accent font-medium">Resultados Comprovados</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">Nossos </span>
            <span className="gradient-text">Números</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Métricas que demonstram nossa capacidade de entregar resultados reais
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-600 hover:border-cyber-primary/50 transition-all duration-500 card-hover h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${stat.color}/10 border border-${stat.color}/30 mb-6`}
                  style={{
                    backgroundColor: stat.color === 'cyber-primary' ? 'rgba(0, 212, 255, 0.1)' :
                                    stat.color === 'cyber-secondary' ? 'rgba(124, 58, 237, 0.1)' :
                                    'rgba(16, 185, 129, 0.1)',
                    borderColor: stat.color === 'cyber-primary' ? 'rgba(0, 212, 255, 0.3)' :
                                stat.color === 'cyber-secondary' ? 'rgba(124, 58, 237, 0.3)' :
                                'rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <stat.icon
                    size={28}
                    style={{
                      color: stat.color === 'cyber-primary' ? '#00d4ff' :
                            stat.color === 'cyber-secondary' ? '#7c3aed' :
                            '#10b981',
                    }}
                  />
                </motion.div>

                {/* Value */}
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.label === 'No Mercado' ? (
                    <span>{stat.prefix}2020</span>
                  ) : (
                    <AnimatedCounter
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  )}
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm">
                  {stat.description}
                </p>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{
                    background: stat.color === 'cyber-primary' ? 'rgba(0, 212, 255, 0.1)' :
                               stat.color === 'cyber-secondary' ? 'rgba(124, 58, 237, 0.1)' :
                               'rgba(16, 185, 129, 0.1)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
