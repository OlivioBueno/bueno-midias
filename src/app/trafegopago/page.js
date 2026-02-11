'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Megaphone,
  Search,
  Users,
  Briefcase,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Target,
  MessageSquare,
  ChevronRight
} from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const whatsappLink = 'https://wa.me/5511969107843?text=Olá! Vim pelo site e gostaria de saber mais sobre tráfego pago.'

const platformIcons = {
  google: Search,
  meta: Users,
  linkedin: Briefcase,
  tiktok: TrendingUp,
}

const platformColors = {
  google: '#4285F4',
  meta: '#00d4ff',
  linkedin: '#0A66C2',
  tiktok: '#7c3aed',
}

const platformGradients = {
  google: 'from-[#4285F4]/20 to-[#4285F4]/5',
  meta: 'from-cyber-primary/20 to-cyber-primary/5',
  linkedin: 'from-[#0A66C2]/20 to-[#0A66C2]/5',
  tiktok: 'from-cyber-secondary/20 to-cyber-secondary/5',
}

const platformKeys = ['google', 'meta', 'linkedin', 'tiktok']

const resultImages = [
  '/images/resultados/resultado-1.png',
  '/images/resultados/resultado-2.png',
  '/images/resultados/resultado-3.png',
  '/images/resultados/resultado-4.png',
]

export default function TrafegoPago() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const cardsRef = useRef(null)
  const resultsRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-100px' })
  const resultsInView = useInView(resultsRef, { once: true, margin: '-100px' })

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08),transparent_70%)]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full px-4 py-2 mb-8"
            >
              <Megaphone size={16} className="text-cyber-primary" />
              <span className="text-sm text-cyber-primary font-medium">
                {t('trafegoPago.hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-white">{t('trafegoPago.hero.titleWhite')} </span>
              <span className="gradient-text">{t('trafegoPago.hero.titleGradient')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            >
              {t('trafegoPago.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-8 py-4 rounded-full text-lg font-semibold text-dark-900 btn-shine"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={22} />
                <span>{t('trafegoPago.hero.cta')}</span>
              </motion.a>

              <motion.a
                href="#resultados"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyber-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <span>{t('trafegoPago.hero.ctaSecondary')}</span>
                <ChevronRight size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent" />
      </section>

      {/* Platform Cards Section */}
      <section ref={cardsRef} className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={cardsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-cyber-secondary/10 border border-cyber-secondary/30 rounded-full px-4 py-2 mb-6"
            >
              <Target size={16} className="text-cyber-secondary" />
              <span className="text-sm text-cyber-secondary font-medium">
                {t('trafegoPago.platforms.badge')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              <span className="text-white">{t('trafegoPago.platforms.titleWhite')} </span>
              <span className="gradient-text">{t('trafegoPago.platforms.titleGradient')}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {t('trafegoPago.platforms.subtitle')}
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {platformKeys.map((key, index) => {
              const Icon = platformIcons[key]
              const color = platformColors[key]
              const gradient = platformGradients[key]
              const benefits = t(`trafegoPago.platforms.${key}.benefits`)

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                  className="group"
                >
                  <div
                    className="relative h-full bg-dark-800/60 backdrop-blur-sm rounded-2xl p-8 border border-dark-600 hover:border-opacity-50 transition-all duration-500 card-hover overflow-hidden"
                    style={{ '--hover-color': color }}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
                        style={{
                          backgroundColor: `${color}15`,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        <Icon size={28} style={{ color }} />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-primary transition-colors">
                        {t(`trafegoPago.platforms.${key}.title`)}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 mb-6">
                        {t(`trafegoPago.platforms.${key}.description`)}
                      </p>

                      {/* Benefits */}
                      <ul className="space-y-3 mb-6">
                        {Array.isArray(benefits) && benefits.map((benefit, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 + index * 0.15 + i * 0.1 }}
                            className="flex items-center space-x-3 text-sm text-gray-300"
                          >
                            <CheckCircle2
                              size={16}
                              style={{ color }}
                              className="flex-shrink-0"
                            />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <motion.a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-sm font-medium transition-colors"
                        style={{ color }}
                        whileHover={{ x: 5 }}
                      >
                        <span>{t('trafegoPago.platforms.learnMore')}</span>
                        <ArrowRight size={16} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-secondary/30 to-transparent" />
      </section>

      {/* Real Results Section */}
      <section id="resultados" ref={resultsRef} className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={resultsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-cyber-accent/10 border border-cyber-accent/30 rounded-full px-4 py-2 mb-6"
            >
              <BarChart3 size={16} className="text-cyber-accent" />
              <span className="text-sm text-cyber-accent font-medium">
                {t('trafegoPago.results.badge')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={resultsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              <span className="text-white">{t('trafegoPago.results.titleWhite')} </span>
              <span className="gradient-text">{t('trafegoPago.results.titleGradient')}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={resultsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {t('trafegoPago.results.subtitle')}
            </motion.p>
          </motion.div>

          {/* Results Carousel - Infinite Loop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={resultsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative overflow-hidden"
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-scroll-loop gap-8 w-max hover:[animation-play-state:paused]">
              {/* Duplicate images for seamless loop */}
              {[...resultImages, ...resultImages].map((src, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[500px] sm:w-[600px] lg:w-[700px] group"
                >
                  <div className="relative bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-dark-600 overflow-hidden hover:border-cyber-primary/30 transition-all duration-500">
                    <img
                      src={src}
                      alt={`${t('trafegoPago.results.imageAlt')} ${(index % resultImages.length) + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6">
              {t('trafegoPago.results.ctaText')}
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
              <span>{t('trafegoPago.results.ctaButton')}</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
