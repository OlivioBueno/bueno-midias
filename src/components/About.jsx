'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Brain, Cpu, GitBranch, Database, LineChart } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const techIcons = [
    { icon: Code2, label: 'Lógica' },
    { icon: Brain, label: 'Análise' },
    { icon: Cpu, label: 'Automação' },
    { icon: GitBranch, label: 'Processos' },
    { icon: Database, label: 'Dados' },
    { icon: LineChart, label: 'Métricas' },
  ]

  return (
    <section id="sobre" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-secondary/30 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-cyber-secondary/10 border border-cyber-secondary/30 rounded-full px-4 py-2 mb-6"
            >
              <Code2 size={16} className="text-cyber-secondary" />
              <span className="text-sm text-cyber-secondary font-medium">O Diferencial de TI</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              <span className="text-white">Não somos apenas </span>
              <span className="gradient-text">criativos.</span>
              <br />
              <span className="text-white">Somos </span>
              <span className="gradient-text">analíticos.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg mb-6"
            >
              O fundador da Bueno Mídias estudou Sistemas de Informação na
              <span className="text-cyber-primary font-semibold"> FIAP</span>, uma das melhores
              universidades de tecnologia do Brasil. No último ano, pivotou para aplicar toda a
              lógica de engenharia de software no Marketing Digital.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-lg font-medium mb-8"
            >
              Trouxemos a <span className="text-cyber-accent">precisão da TI</span> para o
              Marketing Digital. Unimos <span className="text-cyber-primary">automação</span>,
              <span className="text-cyber-secondary"> análise de métricas</span> e
              <span className="text-cyber-accent"> performance</span>.
            </motion.p>

            {/* Tech Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 sm:grid-cols-6 gap-4"
            >
              {techIcons.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex flex-col items-center p-3 bg-dark-700/50 rounded-xl border border-dark-600/50 hover:border-cyber-primary/50 transition-colors"
                >
                  <item.icon size={24} className="text-cyber-primary mb-2" />
                  <span className="text-xs text-gray-400">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Code Block Visual */}
            <div className="relative bg-dark-800 rounded-2xl border border-dark-600 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center space-x-2 px-4 py-3 bg-dark-700 border-b border-dark-600">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-sm text-gray-500 font-mono">marketing_strategy.js</span>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-gray-500">{'// Metodologia Bueno Mídias'}</p>
                  <p className="mt-2">
                    <span className="text-cyber-secondary">const</span>
                    <span className="text-white"> estrategia </span>
                    <span className="text-cyber-primary">=</span>
                    <span className="text-white"> {'{'}</span>
                  </p>
                  <p className="ml-4">
                    <span className="text-cyber-accent">dados</span>
                    <span className="text-white">: </span>
                    <span className="text-yellow-400">&quot;análise profunda&quot;</span>
                    <span className="text-white">,</span>
                  </p>
                  <p className="ml-4">
                    <span className="text-cyber-accent">automacao</span>
                    <span className="text-white">: </span>
                    <span className="text-yellow-400">&quot;processos otimizados&quot;</span>
                    <span className="text-white">,</span>
                  </p>
                  <p className="ml-4">
                    <span className="text-cyber-accent">resultado</span>
                    <span className="text-white">: </span>
                    <span className="text-yellow-400">&quot;ROI maximizado&quot;</span>
                  </p>
                  <p><span className="text-white">{'}'}</span><span className="text-white">;</span></p>

                  <p className="mt-4">
                    <span className="text-cyber-secondary">function</span>
                    <span className="text-cyber-primary"> escalar</span>
                    <span className="text-white">(campanha) {'{'}</span>
                  </p>
                  <p className="ml-4">
                    <span className="text-cyber-secondary">return</span>
                    <span className="text-white"> campanha.</span>
                    <span className="text-cyber-accent">otimizar</span>
                    <span className="text-white">()</span>
                  </p>
                  <p className="ml-8">
                    <span className="text-white">.</span>
                    <span className="text-cyber-accent">analisar</span>
                    <span className="text-white">()</span>
                  </p>
                  <p className="ml-8">
                    <span className="text-white">.</span>
                    <span className="text-cyber-accent">lucrar</span>
                    <span className="text-white">();</span>
                  </p>
                  <p><span className="text-white">{'}'}</span></p>
                </motion.div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyber-primary/20 via-cyber-secondary/20 to-cyber-accent/20 rounded-2xl blur-sm -z-10" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-cyber-primary to-cyber-secondary p-4 rounded-xl shadow-lg"
            >
              <Cpu className="text-dark-900" size={28} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
