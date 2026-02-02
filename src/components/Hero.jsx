'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ChevronDown, Zap, TrendingUp, BarChart3 } from 'lucide-react'

const whatsappLink = 'https://wa.me/5511969107843?text=Olá! Vim pelo site e gostaria de falar com um consultor.'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-cyber-primary/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyber-secondary/20 rounded-full blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-accent/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Icons */}
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-dark-700/50 border border-dark-600 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-cyber-accent rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Performance Digital desde 2020</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">Transformamos </span>
            <span className="gradient-text">Dados em Escala</span>
            <br />
            <span className="text-white">e </span>
            <span className="gradient-text">Tráfego em Lucro.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            Mais de <span className="text-cyber-primary font-semibold">R$ 5 Milhões</span> gerenciados
            em tráfego pago. Estratégias validadas desde 2020.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-8 py-4 rounded-full text-lg font-semibold text-dark-900 btn-shine overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={22} className="relative z-10" />
              <span className="relative z-10">Falar com Consultor</span>
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
              <span>Ver Serviços</span>
              <ChevronDown size={18} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats Mini Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: 'R$ 5M+', label: 'Em Ads' },
            { value: '50+', label: 'Landing Pages' },
            { value: '5+', label: 'Anos' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
