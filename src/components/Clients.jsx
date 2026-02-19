'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, ExternalLink } from 'lucide-react'

const clients = [
  {
    name: 'Universidade Bilíngue',
    url: 'https://universidadebilingue.com.br/',
    description: 'Educação bilíngue de excelência',
  },
  {
    name: 'Prime Time Palestras',
    url: 'https://primetimepalestras.com.br/',
    description: 'Palestras e eventos corporativos',
  },
  {
    name: 'Basi Marketing',
    url: 'https://basimarketing.com.br/',
    description: 'Marketing estratégico',
  },
  {
    name: 'Sintetiza Educação',
    url: 'https://sintetizaeducacao.com.br/',
    description: 'Soluções em educação',
  },
  {
    name: 'Bueno Advisory',
    url: 'https://buenoadvisory.com.br/',
    description: 'Consultoria empresarial',
  },
  {
    name: 'Will Teach',
    url: 'https://willteach.com.br/'
    description: 'Professor de inglês'
  },
]

export default function Clients() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="clientes" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-800" />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-secondary/30 to-transparent" />

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
            className="inline-flex items-center space-x-2 bg-cyber-secondary/10 border border-cyber-secondary/30 rounded-full px-4 py-2 mb-6"
          >
            <Users size={16} className="text-cyber-secondary" />
            <span className="text-sm text-cyber-secondary font-medium">Parceiros de Sucesso</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">Nossos </span>
            <span className="gradient-text">Clientes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Empresas que confiam em nosso trabalho para impulsionar seus resultados
          </motion.p>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <motion.a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative h-full bg-dark-800/60 backdrop-blur-sm rounded-2xl p-6 border border-dark-600 hover:border-cyber-primary/50 transition-all duration-500 card-hover overflow-hidden">
                {/* Hover Gradient */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyber-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Client Name */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyber-primary transition-colors">
                      {client.name}
                    </h3>
                    <ExternalLink
                      size={18}
                      className="text-gray-500 group-hover:text-cyber-primary transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm">
                    {client.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-4 pt-4 border-t border-dark-600">
                    <span className="text-xs text-gray-500 group-hover:text-cyber-primary transition-colors">
                      Visitar site →
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
