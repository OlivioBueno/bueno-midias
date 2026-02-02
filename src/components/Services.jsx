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

const whatsappLink = 'https://wa.me/5511969107843?text=Olá! Vim pelo site e gostaria de saber mais sobre os serviços.'

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Target,
      title: 'Tráfego Pago',
      description: 'Gestão completa de performance em Google Ads e Meta Ads. Estratégias baseadas em dados para maximizar seu ROI.',
      features: [
        'Google Ads (Search, Display, YouTube)',
        'Meta Ads (Facebook & Instagram)',
        'Remarketing estratégico',
        'Otimização contínua de campanhas',
      ],
      color: 'cyber-primary',
      gradient: 'from-cyber-primary/20 to-cyber-primary/5',
    },
    {
      icon: Layout,
      title: 'Landing Pages',
      description: 'Desenvolvimento de páginas focadas em UX e conversão. Design moderno que transforma visitantes em clientes.',
      features: [
        'Design responsivo e moderno',
        'Otimização para conversão (CRO)',
        'Testes A/B implementados',
        'Velocidade e performance',
      ],
      color: 'cyber-secondary',
      gradient: 'from-cyber-secondary/20 to-cyber-secondary/5',
    },
    {
      icon: Cog,
      title: 'Automações & Dados',
      description: 'Implementação de CRM, Dashboards e integrações via API. Automatize processos e tome decisões baseadas em dados.',
      features: [
        'Implementação de CRM',
        'Dashboards personalizados',
        'Integrações via API',
        'Automação de processos',
      ],
      color: 'cyber-accent',
      gradient: 'from-cyber-accent/20 to-cyber-accent/5',
    },
    {
      icon: MessageSquare,
      title: 'Consultoria',
      description: 'Análise de mercado e estratégia personalizada. Diagnóstico completo para identificar oportunidades de crescimento.',
      features: [
        'Análise de mercado',
        'Estratégia de marketing',
        'Diagnóstico de funil',
        'Planejamento de crescimento',
      ],
      color: 'cyber-primary',
      gradient: 'from-cyber-primary/20 to-cyber-secondary/5',
    },
  ]

  const getColorValue = (color) => {
    switch (color) {
      case 'cyber-primary': return '#00d4ff'
      case 'cyber-secondary': return '#7c3aed'
      case 'cyber-accent': return '#10b981'
      default: return '#00d4ff'
    }
  }

  return (
    <section id="servicos" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent" />

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
            className="inline-flex items-center space-x-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles size={16} className="text-cyber-primary" />
            <span className="text-sm text-cyber-primary font-medium">Soluções Completas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">Nossos </span>
            <span className="gradient-text">Serviços</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Oferecemos soluções integradas de marketing digital para acelerar o crescimento do seu negócio
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-dark-800/60 backdrop-blur-sm rounded-2xl p-8 border border-dark-600 hover:border-opacity-50 transition-all duration-500 card-hover overflow-hidden"
                style={{ '--hover-color': getColorValue(service.color) }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${service.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
                    style={{
                      backgroundColor: `${getColorValue(service.color)}15`,
                      border: `1px solid ${getColorValue(service.color)}30`,
                    }}
                  >
                    <service.icon
                      size={28}
                      style={{ color: getColorValue(service.color) }}
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.15 + i * 0.1 }}
                        className="flex items-center space-x-3 text-sm text-gray-300"
                      >
                        <CheckCircle2
                          size={16}
                          style={{ color: getColorValue(service.color) }}
                          className="flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Link */}
                  <motion.a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-sm font-medium transition-colors"
                    style={{ color: getColorValue(service.color) }}
                    whileHover={{ x: 5 }}
                  >
                    <span>Saiba mais</span>
                    <ArrowRight size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Precisa de uma solução personalizada para seu negócio?
          </p>
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-8 py-4 rounded-full text-lg font-semibold text-dark-900 btn-shine"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare size={22} />
            <span>Falar com Consultor</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
