'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, TrendingUp, Award, Users,
  Settings, Bell, Search, ChevronRight, Play, Clock,
  CheckCircle2, Star, Flame, Menu, X, LogOut, Lock,
  BarChart2, Calendar, Zap
} from 'lucide-react'

// ─── Dados fictícios ──────────────────────────────────────────────────────────

const cursos = [
  {
    id: 1,
    titulo: 'Power Point Profissional',
    categoria: 'Produtividade',
    progresso: 72,
    aulas: 48,
    aulasFeitas: 35,
    cor: 'from-blue-600 to-blue-400',
    icone: '📊',
    proxAula: 'Gráficos Avançados',
    duracao: '12h 30min',
  },
  {
    id: 2,
    titulo: 'Tráfego Pago do Zero',
    categoria: 'Marketing Digital',
    progresso: 45,
    aulas: 62,
    aulasFeitas: 28,
    cor: 'from-purple-600 to-purple-400',
    icone: '🚀',
    proxAula: 'Campanhas de Remarketing',
    duracao: '18h 20min',
  },
  {
    id: 3,
    titulo: 'Copywriting Persuasivo',
    categoria: 'Vendas',
    progresso: 18,
    aulas: 35,
    aulasFeitas: 6,
    cor: 'from-emerald-600 to-emerald-400',
    icone: '✍️',
    proxAula: 'Headlines que Convertem',
    duracao: '9h 45min',
  },
]

const atividades = [
  { texto: 'Aula "Funil de Vendas no Meta" concluída', tempo: '2h atrás', tipo: 'check' },
  { texto: 'Certificado de Power Point emitido', tempo: '1 dia atrás', tipo: 'award' },
  { texto: 'Comentário respondido por um mentor', tempo: '2 dias atrás', tipo: 'chat' },
  { texto: 'Módulo 3 de Tráfego Pago iniciado', tempo: '3 dias atrás', tipo: 'play' },
  { texto: 'Quiz do Módulo 2 concluído com 90%', tempo: '4 dias atrás', tipo: 'star' },
]

const proximasAulas = [
  { curso: 'Power Point', aula: 'Gráficos Avançados', data: 'Hoje, 20h', icone: '📊' },
  { curso: 'Tráfego Pago', aula: 'Remarketing no Meta', data: 'Amanhã, 19h', icone: '🚀' },
  { curso: 'Copywriting', aula: 'Headlines que Convertem', data: 'Sex, 21h', icone: '✍️' },
]

const navLinks = [
  { id: 'inicio', label: 'Início', icon: LayoutDashboard },
  { id: 'cursos', label: 'Meus Cursos', icon: BookOpen },
  { id: 'progresso', label: 'Progresso', icon: TrendingUp },
  { id: 'certificados', label: 'Certificados', icon: Award },
  { id: 'comunidade', label: 'Comunidade', icon: Users },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
]

// ─── Componentes internos ─────────────────────────────────────────────────────

function BarraLateral({ aberta, setAberta, ativo, setAtivo }) {
  return (
    <>
      {/* Overlay mobile */}
      <AnimatePresence>
        {aberta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAberta(false)}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: aberta ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-dark-800 border-r border-dark-700 z-30 flex flex-col lg:translate-x-0 lg:static lg:flex"
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyber-primary flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">Sintetiza<span className="text-cyber-accent"> Edu</span></span>
          </div>
          <button onClick={() => setAberta(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Avatar */}
        <div className="px-5 py-4 border-b border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              OB
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Olivio Bueno</p>
              <p className="text-slate-500 text-xs">Plano Pro</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setAtivo(id); setAberta(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                ${ativo === id
                  ? 'bg-cyber-primary text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-dark-700'
                }`}
            >
              <Icon size={16} />
              {label}
              {ativo === id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-dark-700">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-900/10 transition-all">
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </motion.aside>
    </>
  )
}

function CardKpi({ titulo, valor, sub, icone: Icon, cor, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-dark-800 border border-dark-700 rounded-xl p-5 flex items-start gap-4 card-hover"
    >
      <div className={`w-11 h-11 rounded-lg ${cor} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">{titulo}</p>
        <p className="text-white text-2xl font-bold leading-none">{valor}</p>
        <p className="text-slate-500 text-xs mt-1">{sub}</p>
      </div>
    </motion.div>
  )
}

function CardCurso({ curso, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-dark-800 border border-dark-700 rounded-xl p-5 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{curso.icone}</span>
          <div>
            <h3 className="text-white font-semibold text-sm">{curso.titulo}</h3>
            <span className="text-xs text-slate-500">{curso.categoria}</span>
          </div>
        </div>
        <span className="text-cyber-accent font-bold text-sm">{curso.progresso}%</span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full h-1.5 bg-dark-700 rounded-full mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${curso.progresso}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${curso.cor} rounded-full`}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <span>{curso.aulasFeitas}/{curso.aulas} aulas</span>
        <span className="flex items-center gap-1"><Clock size={11} />{curso.duracao}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Play size={11} className="text-cyber-accent" />
          <span className="truncate max-w-[140px]">{curso.proxAula}</span>
        </div>
        <button className="flex items-center gap-1.5 bg-cyber-primary hover:bg-cyber-secondary text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
          Continuar
        </button>
      </div>
    </motion.div>
  )
}

function AtividadeIcone({ tipo }) {
  const mapa = {
    check: { icon: CheckCircle2, cor: 'text-emerald-400' },
    award: { icon: Award, cor: 'text-yellow-400' },
    chat:  { icon: Users, cor: 'text-purple-400' },
    play:  { icon: Play, cor: 'text-blue-400' },
    star:  { icon: Star, cor: 'text-orange-400' },
  }
  const { icon: Icon, cor } = mapa[tipo] || mapa.play
  return <Icon size={14} className={cor} />
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function DashUniversidade() {
  const [sidebarAberta, setSidebarAberta] = useState(false)
  const [secaoAtiva, setSecaoAtiva] = useState('inicio')

  return (
    <div className="min-h-screen bg-dark-900 cyber-grid flex">

      {/* Sidebar */}
      <BarraLateral
        aberta={sidebarAberta}
        setAberta={setSidebarAberta}
        ativo={secaoAtiva}
        setAtivo={setSecaoAtiva}
      />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="bg-dark-800/80 backdrop-blur-sm border-b border-dark-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarAberta(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar aulas, módulos..."
                className="bg-dark-700 text-slate-300 text-sm pl-9 pr-4 py-2 rounded-lg border border-dark-600 w-64 focus:outline-none focus:border-cyber-primary placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative text-slate-400 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-lg px-3 py-1.5">
              <Flame size={14} className="text-orange-400" />
              <span className="text-white text-xs font-semibold">7 dias seguidos</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 p-6 overflow-auto">

          {/* Saudação */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white">
              Olá, Olivio! 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Você está a <span className="text-cyber-accent font-semibold">3 aulas</span> de concluir o módulo atual. Vamos lá!
            </p>
          </motion.div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <CardKpi titulo="Cursos Ativos" valor="3" sub="de 5 adquiridos" icone={BookOpen} cor="bg-cyber-primary" delay={0.05} />
            <CardKpi titulo="Aulas Concluídas" valor="69" sub="+8 esta semana" icone={CheckCircle2} cor="bg-emerald-600" delay={0.1} />
            <CardKpi titulo="Certificados" valor="2" sub="1 próximo de emitir" icone={Award} cor="bg-yellow-600" delay={0.15} />
            <CardKpi titulo="Horas Estudadas" valor="41h" sub="Meta: 60h/mês" icone={BarChart2} cor="bg-purple-600" delay={0.2} />
          </div>

          {/* Cursos + Atividade */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

            {/* Cursos em andamento */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-sm">Cursos em Andamento</h2>
                <button className="text-cyber-accent text-xs hover:underline flex items-center gap-1">
                  Ver todos <ChevronRight size={12} />
                </button>
              </div>
              <div className="grid gap-4">
                {cursos.map((curso, i) => (
                  <CardCurso key={curso.id} curso={curso} delay={0.1 * (i + 1)} />
                ))}
              </div>
            </div>

            {/* Coluna direita */}
            <div className="space-y-6">

              {/* Próximas aulas */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="bg-dark-800 border border-dark-700 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                    <Calendar size={14} className="text-cyber-accent" />
                    Próximas Aulas
                  </h2>
                </div>
                <div className="space-y-3">
                  {proximasAulas.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors cursor-pointer">
                      <span className="text-xl">{a.icone}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{a.aula}</p>
                        <p className="text-slate-500 text-xs">{a.curso}</p>
                      </div>
                      <span className="text-cyber-accent text-xs whitespace-nowrap">{a.data}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Atividade recente */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="bg-dark-800 border border-dark-700 rounded-xl p-5"
              >
                <h2 className="text-white font-semibold text-sm mb-4">Atividade Recente</h2>
                <div className="space-y-3">
                  {atividades.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AtividadeIcone tipo={a.tipo} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 text-xs leading-snug">{a.texto}</p>
                        <p className="text-slate-600 text-xs mt-0.5">{a.tempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

          {/* Banner desbloqueie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-gradient-to-r from-cyber-primary/20 to-purple-600/20 border border-cyber-primary/30 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyber-primary/20 border border-cyber-primary/40 flex items-center justify-center flex-shrink-0">
                <Lock size={20} className="text-cyber-accent" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Módulo Avançado disponível</h3>
                <p className="text-slate-400 text-xs mt-0.5">Complete mais 4 aulas do Power Point para desbloquear o Módulo de Apresentações Executivas.</p>
              </div>
            </div>
            <button className="flex-shrink-0 bg-cyber-primary hover:bg-cyber-secondary text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              Ver detalhes
            </button>
          </motion.div>

        </main>
      </div>
    </div>
  )
}
