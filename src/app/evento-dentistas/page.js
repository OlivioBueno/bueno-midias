'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Clock, CheckCircle2, Target, TrendingUp, Users,
  Sparkles, ShieldCheck, Award, ArrowRight, Loader2
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÃO — troque pela URL do seu webhook (Zapier, Make,
// n8n, RD Station, etc.). Deixe vazio para apenas simular o envio.
// ─────────────────────────────────────────────────────────────
const WEBHOOK_URL = process.env.NEXT_PUBLIC_EVENTO_WEBHOOK_URL || ''

// Data/hora do evento (horário de Brasília, UTC-03:00)
const EVENTO_DATA = new Date('2026-09-02T19:00:00-03:00')

const aprendizados = [
  {
    icon: Target,
    texto: 'Como atrair pacientes qualificados usando anúncios online',
  },
  {
    icon: TrendingUp,
    texto: 'A estratégia para aumentar sua taxa de ocupação sem depender de indicações',
  },
  {
    icon: Award,
    texto: 'Como se destacar da concorrência na sua região',
  },
  {
    icon: Users,
    texto: 'O método validado para transformar seguidores em pacientes',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function EventoDentistas() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', clinica: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      if (WEBHOOK_URL) {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            evento: 'Evento Dentistas - 02/09',
            origem: 'landing-page-evento-dentistas',
            data_inscricao: new Date().toISOString(),
          }),
        })
        if (!res.ok) throw new Error('Falha no envio')
      } else {
        // Sem webhook configurado: simula o envio
        await new Promise((r) => setTimeout(r, 900))
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {/* fundo grid + glow */}
      <div className="fixed inset-0 cyber-grid opacity-60 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-cyber-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-[500px] h-[500px] bg-cyber-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-16">

        {/* ── BADGE PÚBLICO ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-primary/40 bg-cyber-primary/10 text-sm font-medium text-cyber-accent">
            <Sparkles size={16} />
            Exclusivo para Dentistas
          </span>
        </motion.div>

        {/* ── HERO ── */}
        <section className="text-center mt-8 mb-14">
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Descubra Como{' '}
            <span className="gradient-text">Lotar a Agenda</span> da Sua
            Clínica Odontológica em{' '}
            <span className="gradient-text">30 Dias</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Evento online e gratuito exclusivo para dentistas que querem
            <span className="text-white font-semibold"> mais pacientes todos os meses</span>.
          </motion.p>

          {/* DATA EM DESTAQUE */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-9 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-8 py-5 rounded-2xl border border-cyber-primary/40 bg-dark-800/70 backdrop-blur animate-glow"
          >
            <div className="flex items-center gap-3">
              <Calendar className="text-cyber-accent" size={28} />
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-gray-400">Data</p>
                <p className="text-xl sm:text-2xl font-bold">02 de Setembro</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-cyber-primary/30" />
            <div className="flex items-center gap-3">
              <Clock className="text-cyber-accent" size={28} />
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-gray-400">Horário</p>
                <p className="text-xl sm:text-2xl font-bold">19h — Ao Vivo</p>
              </div>
            </div>
          </motion.div>

          {/* CONTADOR REGRESSIVO */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <ContadorRegressivo />
          </motion.div>
        </section>

        {/* ── GRID: APRENDIZADOS + FORM ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* O QUE VOCÊ VAI APRENDER */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              O que você vai <span className="gradient-text">aprender</span>
            </h2>
            <ul className="space-y-4">
              {aprendizados.map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 rounded-xl border border-dark-600/60 bg-dark-800/50 card-hover"
                >
                  <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg bg-cyber-primary/15 text-cyber-accent">
                    <item.icon size={20} />
                  </span>
                  <p className="text-gray-200 leading-relaxed pt-1">{item.texto}</p>
                </motion.li>
              ))}
            </ul>

            {/* SOBRE O APRESENTADOR */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-8 p-6 rounded-2xl border border-dark-600/60 bg-dark-800/50"
            >
              <div className="flex items-center gap-4">
                <span className="grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary text-xl font-bold">
                  OB
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyber-accent">Apresentador</p>
                  <h3 className="text-xl font-bold">Olívio Bueno</h3>
                </div>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Especialista em marketing digital para clínicas odontológicas,
                com mais de <span className="text-white font-semibold">R$ 5 milhões
                gerenciados em anúncios</span>.
              </p>
            </motion.div>
          </motion.section>

          {/* FORMULÁRIO DE CAPTURA */}
          <motion.section
            id="inscricao"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="lg:sticky lg:top-8"
          >
            <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-cyber-primary via-cyber-accent to-cyber-secondary">
              <div className="rounded-2xl bg-dark-800 p-7 sm:p-8">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <div className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-cyber-primary/15 text-cyber-accent mb-5">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Inscrição confirmada! 🎉</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Sua vaga no evento do dia <span className="text-white font-semibold">02 de
                      Setembro às 19h</span> está garantida. Enviaremos o link de
                      acesso pelo seu e-mail e WhatsApp.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                      Fique de olho na sua caixa de entrada e no WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 text-red-300 text-xs font-semibold uppercase tracking-wide">
                        Vagas limitadas
                      </span>
                      <h2 className="text-2xl font-bold mt-4">Garanta sua vaga gratuita</h2>
                      <p className="text-gray-400 text-sm mt-1">
                        Preencha os dados para se inscrever
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Campo
                        label="Nome completo"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        type="text"
                      />
                      <Campo
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        type="email"
                      />
                      <Campo
                        label="WhatsApp"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        type="tel"
                      />
                      <Campo
                        label="Nome da clínica"
                        name="clinica"
                        value={form.clinica}
                        onChange={handleChange}
                        placeholder="Sua clínica"
                        type="text"
                      />

                      {status === 'error' && (
                        <p className="text-sm text-red-400 text-center">
                          Ocorreu um erro ao enviar. Tente novamente.
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-cyber-primary to-cyber-secondary shadow-lg shadow-cyber-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            QUERO PARTICIPAR
                            <ArrowRight size={20} />
                          </>
                        )}
                      </motion.button>

                      <p className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
                        <ShieldCheck size={14} />
                        Seus dados estão seguros. Sem spam.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.section>
        </div>

        {/* ── CTA FINAL / URGÊNCIA ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-20 mb-6"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            As vagas são <span className="gradient-text">limitadas</span>
          </h2>
          <p className="mt-3 text-gray-300 max-w-xl mx-auto">
            Não fique de fora. Garanta agora seu lugar no evento ao vivo e
            comece a lotar a agenda da sua clínica.
          </p>
          <motion.a
            href="#inscricao"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 mt-7 px-9 py-4 rounded-full font-bold text-base bg-gradient-to-r from-cyber-primary to-cyber-secondary shadow-lg shadow-cyber-primary/30"
          >
            QUERO PARTICIPAR
            <ArrowRight size={20} />
          </motion.a>
        </motion.section>

        <footer className="text-center text-sm text-gray-600 pt-10 border-t border-dark-600/40 mt-10">
          © {new Date().getFullYear()} Bueno Mídias · Evento online e gratuito
        </footer>
      </div>
    </main>
  )
}

// Contador regressivo até a data do evento
function ContadorRegressivo() {
  const calcular = () => {
    const diff = EVENTO_DATA.getTime() - Date.now()
    if (diff <= 0) return null
    return {
      dias: Math.floor(diff / 86400000),
      horas: Math.floor((diff / 3600000) % 24),
      minutos: Math.floor((diff / 60000) % 60),
      segundos: Math.floor((diff / 1000) % 60),
    }
  }

  // null no 1º render (SSR) para evitar mismatch de hidratação
  const [tempo, setTempo] = useState(null)

  useEffect(() => {
    setTempo(calcular())
    const id = setInterval(() => setTempo(calcular()), 1000)
    return () => clearInterval(id)
  }, [])

  // Evento já começou / passou
  if (tempo === null && typeof window !== 'undefined' && EVENTO_DATA.getTime() - Date.now() <= 0) {
    return (
      <p className="mt-4 text-cyber-accent font-semibold animate-glow">
        🔴 O evento está ao vivo agora!
      </p>
    )
  }

  const unidades = [
    { valor: tempo?.dias, label: 'Dias' },
    { valor: tempo?.horas, label: 'Horas' },
    { valor: tempo?.minutos, label: 'Min' },
    { valor: tempo?.segundos, label: 'Seg' },
  ]

  return (
    <div className="mt-8">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
        O evento começa em
      </p>
      <div className="flex justify-center gap-3 sm:gap-4">
        {unidades.map((u) => (
          <div
            key={u.label}
            className="w-[70px] sm:w-20 py-3 rounded-xl border border-cyber-primary/40 bg-dark-800/70 backdrop-blur"
          >
            <div className="text-2xl sm:text-3xl font-extrabold tabular-nums gradient-text">
              {tempo === null ? '--' : String(u.valor).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 mt-1">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Campo de formulário reutilizável
function Campo({ label, name, value, onChange, placeholder, type }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-300 mb-1.5">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-600 text-white placeholder-gray-500 outline-none transition focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/30"
      />
    </label>
  )
}
