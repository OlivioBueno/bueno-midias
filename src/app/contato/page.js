'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Send,
  ArrowLeft,
  User,
  Building2,
  Globe,
  Mail,
  CheckCircle2,
  Loader2,
  Sparkles
} from 'lucide-react'

// Configure a URL do webhook aqui
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://n8n.buenomidias.com.br/webhook-test/917c959f-2648-4917-93b3-d9b71e0b142e'

const services = [
  { id: 'trafego-pago', label: 'Tráfego Pago' },
  { id: 'landing-pages', label: 'Landing Pages' },
  { id: 'automacoes-dados', label: 'Automações & Dados' },
  { id: 'consultoria', label: 'Consultoria' },
]

const investmentOptions = [
  { id: 'range-1', label: 'De R$ 500 a R$ 1.000' },
  { id: 'range-2', label: 'De R$ 1.000 a R$ 3.000' },
  { id: 'range-3', label: 'De R$ 3.000 a R$ 6.000' },
  { id: 'range-4', label: 'Mais de R$ 6.000' },
]

export default function ContatoPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    urlEmpresa: '',
    email: '',
    servicos: [],
    investimento: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      servicos: prev.servicos.includes(serviceId)
        ? prev.servicos.filter(id => id !== serviceId)
        : [...prev.servicos, serviceId]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const payload = {
      nome: formData.nome,
      empresa: formData.empresa,
      urlEmpresa: formData.urlEmpresa,
      email: formData.email,
      servicos: formData.servicos.map(id =>
        services.find(s => s.id === id)?.label
      ).filter(Boolean),
      investimento: investmentOptions.find(o => o.id === formData.investimento)?.label || '',
      timestamp: new Date().toISOString(),
    }

    try {
      if (!WEBHOOK_URL) {
        console.log('Dados do formulário:', payload)
        throw new Error('URL do webhook não configurada')
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário')
      }

      setSubmitStatus('success')
      setFormData({
        nome: '',
        empresa: '',
        urlEmpresa: '',
        email: '',
        servicos: [],
        investimento: '',
      })
    } catch (error) {
      console.error('Erro:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen cyber-grid overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyber-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Voltar ao início</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles size={16} className="text-cyber-primary" />
            <span className="text-sm text-cyber-primary font-medium">Fale Conosco</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">Vamos </span>
            <span className="gradient-text">Conversar?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Preencha o formulário abaixo e entraremos em contato para entender melhor suas necessidades
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-dark-800/60 backdrop-blur-sm rounded-2xl p-8 border border-dark-600"
        >
          <div className="space-y-6">
            {/* Nome */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <User size={16} className="text-cyber-primary" />
                  <span>Nome *</span>
                </span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-colors"
                placeholder="Seu nome completo"
              />
            </motion.div>

            {/* Empresa */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.55 }}
            >
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <Building2 size={16} className="text-cyber-secondary" />
                  <span>Nome da Empresa *</span>
                </span>
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                required
                value={formData.empresa}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary transition-colors"
                placeholder="Nome da sua empresa"
              />
            </motion.div>

            {/* URL da Empresa */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="urlEmpresa" className="block text-sm font-medium text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <Globe size={16} className="text-cyber-accent" />
                  <span>URL da Empresa</span>
                </span>
              </label>
              <input
                type="url"
                id="urlEmpresa"
                name="urlEmpresa"
                value={formData.urlEmpresa}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-colors"
                placeholder="https://suaempresa.com.br"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.65 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <Mail size={16} className="text-cyber-primary" />
                  <span>Email *</span>
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-colors"
                placeholder="seu@email.com"
              />
            </motion.div>

            {/* Serviços (Checkboxes) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Serviço procurado
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <motion.label
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.75 + index * 0.05 }}
                    className={`
                      flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all
                      ${formData.servicos.includes(service.id)
                        ? 'bg-cyber-primary/10 border-cyber-primary'
                        : 'bg-dark-700/50 border-dark-600 hover:border-dark-500'
                      }
                    `}
                  >
                    <div className={`
                      w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                      ${formData.servicos.includes(service.id)
                        ? 'bg-cyber-primary border-cyber-primary'
                        : 'border-dark-500'
                      }
                    `}>
                      {formData.servicos.includes(service.id) && (
                        <CheckCircle2 size={14} className="text-dark-900" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.servicos.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                    />
                    <span className="text-sm text-gray-300">{service.label}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Investimento (Radio) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Investimento mensal pretendido
              </label>
              <div className="space-y-3">
                {investmentOptions.map((option, index) => (
                  <motion.label
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.95 + index * 0.05 }}
                    className={`
                      flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all
                      ${formData.investimento === option.id
                        ? 'bg-cyber-secondary/10 border-cyber-secondary'
                        : 'bg-dark-700/50 border-dark-600 hover:border-dark-500'
                      }
                    `}
                  >
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                      ${formData.investimento === option.id
                        ? 'border-cyber-secondary'
                        : 'border-dark-500'
                      }
                    `}>
                      {formData.investimento === option.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-cyber-secondary" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="investimento"
                      value={option.id}
                      className="sr-only"
                      checked={formData.investimento === option.id}
                      onChange={(e) => setFormData(prev => ({ ...prev, investimento: e.target.value }))}
                    />
                    <span className="text-sm text-gray-300">{option.label}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary px-8 py-4 rounded-full text-lg font-semibold text-dark-900 btn-shine disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={22} />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-cyber-accent/10 border border-cyber-accent/30 rounded-xl text-center"
              >
                <p className="text-cyber-accent font-medium">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center"
              >
                <p className="text-red-400 font-medium">
                  Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.
                </p>
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </main>
  )
}
