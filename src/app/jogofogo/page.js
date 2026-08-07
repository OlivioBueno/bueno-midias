'use client'

import { useState, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────
// Página oculta (/jogofogo) — não indexada, sem link no site.
// Jogos de intimidade para casais. Conteúdo adulto.
// ─────────────────────────────────────────────────────────────

const JOGOS = {
  dados: {
    icone: '🎲',
    nome: 'Dados da Intimidade',
    descricao: 'Lance dois dados e siga o desafio',
    regras: 'Cada número tem um desafio progressivo',
  },
  verdadeOuDesafio: {
    icone: '😳',
    nome: 'Verdade ou Desafio',
    descricao: 'Escalada de intimidade em 3 níveis',
    regras: 'Começa leve, depois esquenta',
  },
  cartoes: {
    icone: '🔥',
    nome: 'Cartões de Proximidade',
    descricao: 'Revelem um cartão por vez',
    regras: 'A temperatura sobe conforme vocês avançam',
  },
  pares: {
    icone: '💕',
    nome: 'Desafios para Pares',
    descricao: 'Desafios divertidos e sensuais',
    regras: 'Sorteio surpresa a cada rodada',
  },
}

const DESAFIOS_DADOS = {
  2:  { nivel: '🌡️ Básico',      desafio: 'Abraço de 30 segundos olhando nos olhos um do outro' },
  3:  { nivel: '🌡️ Básico',      desafio: 'Beijo nos lábios de 10 segundos (sem pressa)' },
  4:  { nivel: '🌡️ Básico',      desafio: 'Massageiem as mãos um do outro por 2 minutos' },
  5:  { nivel: '🔥 Intermediário', desafio: 'Beijo apaixonado no pescoço por 30 segundos' },
  6:  { nivel: '🔥 Intermediário', desafio: 'Tirem a camisa/blusa e abracem pele com pele' },
  7:  { nivel: '🔥 Intermediário', desafio: 'Beijo com língua enquanto tocam os cabelos um do outro' },
  8:  { nivel: '🔥 Intermediário', desafio: 'Massagem sensual nas costas' },
  9:  { nivel: '🌶️ Quente',       desafio: 'Tirem metade da roupa e se beijem apaixonadamente' },
  10: { nivel: '🌶️ Quente',       desafio: 'Beijos em local erógeno ou massagem sensual com óleo/loção' },
  11: { nivel: '🌶️ Quente',       desafio: 'Tirem toda a roupa e fiquem abraçados se tocando por 3 minutos' },
  12: { nivel: '🔞 Explosivo',    desafio: 'Vocês sabem o que fazer 😉 Aproveitem sem limites!' },
}

const PERGUNTAS = {
  1: [
    { tipo: 'Verdade', texto: 'Qual é a coisa mais sexy que você já me viu fazer?' },
    { tipo: 'Verdade', texto: 'Em qual momento você mais desejou ficar a sós comigo?' },
    { tipo: 'Desafio', texto: 'Beije meu pescoço por 30 segundos' },
    { tipo: 'Verdade', texto: 'Qual é a sua fantasia mais secreta comigo?' },
    { tipo: 'Desafio', texto: 'Sussurre algo sexy no meu ouvido' },
    { tipo: 'Verdade', texto: 'Qual roupa minha te deixa mais atraído(a)?' },
    { tipo: 'Desafio', texto: 'Beije meus lábios lentamente por 15 segundos' },
    { tipo: 'Verdade', texto: 'Já acordou pensando em mim de forma romântica ou sexual?' },
    { tipo: 'Verdade', texto: 'Qual é a primeira coisa que você olha em mim?' },
    { tipo: 'Desafio', texto: 'Toque meu rosto com as duas mãos, bem devagar' },
    { tipo: 'Verdade', texto: 'Me descreva como você me vê sexualmente' },
    { tipo: 'Desafio', texto: 'Chegue perto do meu ouvido e respire fundo' },
    { tipo: 'Verdade', texto: 'Qual parte do meu corpo você mais gostaria de tocar?' },
    { tipo: 'Desafio', texto: 'Passe os lábios lentamente pelo meu lábio' },
    { tipo: 'Verdade', texto: 'Você já teve pensamentos sexy sobre mim durante o trabalho?' },
  ],
  2: [
    { tipo: 'Verdade', texto: 'Qual parte do meu corpo te deixa mais excitado(a)?' },
    { tipo: 'Desafio', texto: 'Tire uma peça de roupa inteira' },
    { tipo: 'Verdade', texto: 'Já fantasiou comigo durante o sexo?' },
    { tipo: 'Desafio', texto: 'Beije meus seios/peito' },
    { tipo: 'Verdade', texto: 'Qual posição você mais gostaria de fazer comigo?' },
    { tipo: 'Desafio', texto: 'Me toque entre as pernas por 10 segundos' },
    { tipo: 'Verdade', texto: 'Qual é a sua fantasia mais ousada envolvendo a gente?' },
    { tipo: 'Desafio', texto: 'Tire toda a roupa de cima' },
    { tipo: 'Verdade', texto: 'Você gostaria de fazer isso em algum lugar arriscado?' },
    { tipo: 'Desafio', texto: 'Faça movimentos sensuais pelo meu corpo' },
    { tipo: 'Verdade', texto: 'O que você faria comigo se tivéssemos privacidade total?' },
    { tipo: 'Desafio', texto: 'Beije pescoço e ombros lentamente' },
    { tipo: 'Verdade', texto: 'Qual é o seu maior desejo sexual ainda não realizado comigo?' },
    { tipo: 'Desafio', texto: 'Se toque enquanto me olha nos olhos' },
    { tipo: 'Verdade', texto: 'Você já se tocou pensando em mim?' },
  ],
  3: [
    { tipo: 'Verdade', texto: 'O que você faria comigo agora, sem hesitar?' },
    { tipo: 'Desafio', texto: 'Tire toda a roupa' },
    { tipo: 'Verdade', texto: 'Qual é a sua fantasia mais intensa envolvendo a gente?' },
    { tipo: 'Desafio', texto: 'Faça sexo oral comigo' },
    { tipo: 'Verdade', texto: 'Qual tabu você gostaria de experimentar?' },
    { tipo: 'Desafio', texto: 'Fale comigo do jeito mais safado que conseguir' },
    { tipo: 'Verdade', texto: 'Você gostaria de me amarrar ou de ser amarrado(a)?' },
    { tipo: 'Desafio', texto: 'Me possua da forma que desejar' },
    { tipo: 'Verdade', texto: 'Qual é o seu maior fetiche no momento?' },
    { tipo: 'Desafio', texto: 'Faça sexo comigo do jeito que você sempre quis' },
    { tipo: 'Verdade', texto: 'O que seria o sexo perfeito para você comigo?' },
    { tipo: 'Desafio', texto: 'Use qualquer acessório que você quiser em mim' },
    { tipo: 'Verdade', texto: 'Qual é o seu maior sonho sexual realista?' },
    { tipo: 'Verdade', texto: 'Já fantasiou comigo dentro de uma banheira?' },
    { tipo: 'Desafio', texto: 'Vamos para a banheira agora e façam o que quiserem' },
    { tipo: 'Verdade', texto: 'Qual brincadeira na água te deixa mais excitado(a)?' },
    { tipo: 'Desafio', texto: 'Sexo oral comigo dentro da banheira' },
    { tipo: 'Verdade', texto: 'Você prefere água quente ou morna para essas horas?' },
  ],
}

const CARTOES = [
  { temp: 1, emoji: '💙', texto: 'Sussurre um segredo no meu ouvido' },
  { temp: 1, emoji: '💙', texto: 'Segure minha mão por 2 minutos, em silêncio' },
  { temp: 1, emoji: '💙', texto: 'Abrace-me e respirem juntos por 1 minuto' },
  { temp: 2, emoji: '🧡', texto: 'Abraço frontal por 1 minuto inteiro' },
  { temp: 2, emoji: '🧡', texto: 'Beijo no queixo ou no pescoço' },
  { temp: 2, emoji: '🧡', texto: 'Massagem nas costas por 3 minutos' },
  { temp: 2, emoji: '🧡', texto: 'Beije meus olhos fechados lentamente' },
  { temp: 2, emoji: '🧡', texto: 'Toque meu rosto com as duas mãos e me olhe nos olhos' },
  { temp: 2, emoji: '🧡', texto: 'Beije minha testa, meu nariz e minha boca, devagar' },
  { temp: 2, emoji: '🛁', texto: 'Entrem na banheira juntos — exploração sensual na água' },
  { temp: 2, emoji: '💧', texto: 'Passem água quente pelo corpo um do outro, lentamente' },
  { temp: 3, emoji: '❤️', texto: 'Beijo apaixonado com língua por 1 minuto' },
  { temp: 3, emoji: '❤️', texto: 'Tire a camisa/blusa e me abrace assim' },
  { temp: 3, emoji: '❤️', texto: 'Beije meu pescoço inteiro' },
  { temp: 3, emoji: '❤️', texto: 'Massagem sensual com óleo ou loção no corpo todo' },
  { temp: 3, emoji: '❤️', texto: 'Beije meus seios/peito e me toque sensualmente' },
  { temp: 3, emoji: '❤️', texto: 'Me toque entre as pernas por 2 minutos' },
  { temp: 3, emoji: '❤️', texto: 'Tire toda a roupa de cima e me abrace corpo a corpo' },
  { temp: 3, emoji: '🛁', texto: 'Banho de espuma sensual — se lavem mutuamente' },
  { temp: 3, emoji: '💦', texto: 'Na banheira, nus — beijos e abraços dentro da água' },
  { temp: 3, emoji: '🛁', texto: 'Toquem-se sob a água da banheira por 5 minutos' },
  { temp: 4, emoji: '🔥', texto: 'Tirem toda a roupa e fiquem abraçados, pele com pele' },
  { temp: 4, emoji: '🔥', texto: 'Faça sexo oral comigo' },
  { temp: 4, emoji: '🔥', texto: 'Me possua da forma que desejar' },
  { temp: 4, emoji: '🔥', texto: 'Deixe eu te tocar do jeito que eu quiser' },
  { temp: 4, emoji: '🔥', texto: 'Sexo intenso, sem pressa e sem limite de tempo' },
  { temp: 4, emoji: '🔥', texto: 'Toquem-se mutuamente até chegar ao limite' },
  { temp: 4, emoji: '🔥', texto: 'Realize agora o seu maior desejo do momento' },
  { temp: 4, emoji: '💧', texto: 'Sexo oral dentro ou na beira da banheira' },
  { temp: 4, emoji: '🛁', texto: 'Sexo na banheira com água quente' },
  { temp: 4, emoji: '💦', texto: 'Se toquem mutuamente dentro da banheira' },
  { temp: 4, emoji: '🛁', texto: 'Experimentem posições diferentes dentro da água' },
]

const DESAFIOS_PARES = [
  { emoji: '🎬', tipo: 'Criativo',   texto: 'Faça uma dança sensual para mim' },
  { emoji: '📝', tipo: 'Criativo',   texto: 'Escreva 5 fantasias suas e leia em voz alta' },
  { emoji: '💋', tipo: 'Físico',     texto: 'Beijo intenso e sem parar por 1 minuto' },
  { emoji: '🎵', tipo: 'Criativo',   texto: 'Dance e tire as roupas no ritmo da música' },
  { emoji: '📸', tipo: 'Criativo',   texto: 'Tirem fotos sensuais (guardem só para vocês)' },
  { emoji: '🛏️', tipo: 'Aventura',   texto: 'Escolha o lugar da casa e aconteça lá agora' },
  { emoji: '👅', tipo: 'Físico',     texto: 'Beije meu corpo inteiro, bem devagar' },
  { emoji: '🌙', tipo: 'Experiência', texto: 'Banho juntos com toque sensual' },
  { emoji: '💪', tipo: 'Físico',     texto: 'Posição de yoga de casal — e o que vier depois' },
  { emoji: '🎁', tipo: 'Criativo',   texto: 'Tirem a roupa um do outro sem usar as mãos' },
  { emoji: '🕯️', tipo: 'Romântico',  texto: 'Apaguem as luzes, acendam velas e aproveitem a penumbra' },
  { emoji: '🎤', tipo: 'Criativo',   texto: 'Cante uma música sensual enquanto se toca' },
  { emoji: '💆', tipo: 'Físico',     texto: 'Massagem corporal sensual, sem pular nenhum detalhe' },
  { emoji: '🌹', tipo: 'Criativo',   texto: 'Percorra o corpo todo com uma pena ou tecido macio' },
  { emoji: '🎯', tipo: 'Físico',     texto: 'Toque as zonas erógenas do parceiro(a) até o fim' },
  { emoji: '🔥', tipo: 'Intimidade', texto: 'Nus, abraçados e se beijando por 10 minutos sem parar' },
  { emoji: '🍫', tipo: 'Criativo',   texto: 'Chocolate derretido ou algo doce pelo corpo' },
  { emoji: '🔗', tipo: 'Aventura',   texto: 'Amarre-me ou seja amarrado(a) — vocês escolhem o grau' },
  { emoji: '🎭', tipo: 'Criativo',   texto: 'Roleplay — escolham um cenário quente' },
  { emoji: '💦', tipo: 'Físico',     texto: 'Sexo intenso até onde os dois aguentarem' },
  { emoji: '🌊', tipo: 'Aventura',   texto: 'Sexo na água — chuveiro, banheira ou piscina' },
  { emoji: '🎪', tipo: 'Físico',     texto: 'Troquem de posição a cada minuto' },
  { emoji: '🔞', tipo: 'Extremo',    texto: 'Realizem, em sequência, as fantasias que sempre quiseram' },
  { emoji: '⚡', tipo: 'Físico',     texto: 'Sem controle nenhum — soltem tudo' },
  { emoji: '🌟', tipo: 'Extremo',    texto: 'Aproveitem o momento como quiserem' },
  { emoji: '🛁', tipo: 'Água',       texto: 'Entrem na banheira nus e se toquem na água por 10 minutos' },
  { emoji: '💧', tipo: 'Água',       texto: 'Banho sensual — se lavem mutuamente, sem pressa' },
  { emoji: '🛁', tipo: 'Água',       texto: 'Sexo oral um no outro dentro da banheira' },
  { emoji: '💦', tipo: 'Água',       texto: 'Sexo dentro da banheira com água quente' },
  { emoji: '🛁', tipo: 'Água',       texto: 'Se toquem na banheira até os dois chegarem lá' },
  { emoji: '💧', tipo: 'Água',       texto: 'Uma posição nova por rodada, dentro da água' },
  { emoji: '🛁', tipo: 'Água',       texto: 'Fiquem na banheira o tempo que quiserem, sem regras' },
]

// sorteia um índice diferente do atual
function sortear(total, atual) {
  if (total <= 1) return 0
  let i = Math.floor(Math.random() * total)
  while (i === atual) i = Math.floor(Math.random() * total)
  return i
}

// ─────────────────────────────────────────────────────────────
// UI compartilhada
// ─────────────────────────────────────────────────────────────

function Botao({ children, onClick, variante = 'primario', className = '' }) {
  const estilos = {
    primario:
      'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-xl hover:shadow-rose-900/40 hover:scale-[1.02]',
    neutro: 'bg-slate-700 text-white hover:bg-slate-600',
    sucesso: 'bg-emerald-600 text-white hover:bg-emerald-500',
  }
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-6 py-4 font-bold transition-all duration-200 active:scale-95 ${estilos[variante]} ${className}`}
    >
      {children}
    </button>
  )
}

function Titulo({ icone, nome, subtitulo }) {
  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 p-8 text-center">
      <h2 className="mb-2 text-3xl font-bold text-white">
        {icone} {nome}
      </h2>
      <p className="text-rose-100">{subtitulo}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Jogo 1 — Dados da Intimidade
// ─────────────────────────────────────────────────────────────

function JogoDados() {
  const [lance, setLance] = useState(null)
  const [rolando, setRolando] = useState(false)

  const lancar = useCallback(() => {
    setRolando(true)
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1
      const d2 = Math.floor(Math.random() * 6) + 1
      setLance({ d1, d2, total: d1 + d2 })
      setRolando(false)
    }, 450)
  }, [])

  if (!lance && !rolando) {
    return (
      <div>
        <Titulo icone="🎲" nome="Dados da Intimidade" subtitulo="Lancem os dados e sigam o desafio" />
        <div className="mb-8 rounded-2xl bg-slate-800/80 p-10 text-center">
          <p className="mb-8 text-slate-400">Prontos?</p>
          <Botao onClick={lancar} className="px-12 py-6 text-2xl">
            🎲 LANÇAR DADOS 🎲
          </Botao>
        </div>
        <div className="rounded-2xl border border-rose-700/60 bg-rose-950/40 p-6">
          <h3 className="mb-4 font-bold text-white">Como funciona</h3>
          <ul className="space-y-2 text-sm text-rose-100">
            <li>🎲 Dois dados, resultado de 2 a 12</li>
            <li>🔥 Cada resultado tem um desafio específico</li>
            <li>💕 A temperatura sobe conforme o número</li>
            <li>✅ Qualquer desafio pode ser recusado</li>
          </ul>
        </div>
      </div>
    )
  }

  const desafio = lance ? DESAFIOS_DADOS[lance.total] : null

  return (
    <div>
      <div className="mb-8 rounded-2xl border-4 border-rose-500 bg-slate-800/80 p-10 text-center">
        <p className="mb-6 text-xs uppercase tracking-widest text-slate-400">Resultado do lance</p>
        <div className="mb-6 flex items-center justify-center gap-6">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 ${rolando ? 'animate-spin' : ''}`}
          >
            <span className="text-4xl font-bold text-white">{rolando ? '?' : lance.d1}</span>
          </div>
          <span className="text-3xl text-white">+</span>
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-700 ${rolando ? 'animate-spin' : ''}`}
          >
            <span className="text-4xl font-bold text-white">{rolando ? '?' : lance.d2}</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-7xl font-bold text-transparent">
          {rolando ? '—' : lance.total}
        </div>
      </div>

      {desafio && !rolando && (
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 p-8 text-center">
          <p className="mb-2 text-sm text-rose-100">{desafio.nivel}</p>
          <h3 className="text-2xl font-bold leading-relaxed text-white">{desafio.desafio}</h3>
        </div>
      )}

      <Botao onClick={lancar} className="w-full">
        🎲 Lançar de novo
      </Botao>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Jogo 2 — Verdade ou Desafio
// ─────────────────────────────────────────────────────────────

const NIVEIS = [
  { n: 1, emoji: '🌡️', titulo: 'NÍVEL 1', desc: 'Básico — se conhecerem melhor', cor: 'from-amber-500 to-orange-500' },
  { n: 2, emoji: '🔥', titulo: 'NÍVEL 2', desc: 'Intermediário — aumentar a tensão', cor: 'from-orange-500 to-red-500' },
  { n: 3, emoji: '🌶️', titulo: 'NÍVEL 3', desc: 'Quente — sem limites', cor: 'from-red-600 to-pink-600' },
]

function JogoVerdadeOuDesafio() {
  const [nivel, setNivel] = useState(null)
  const [indice, setIndice] = useState(0)

  if (!nivel) {
    return (
      <div>
        <Titulo icone="😳" nome="Verdade ou Desafio" subtitulo="Escolham o nível de intensidade" />
        <div className="grid gap-4">
          {NIVEIS.map((item) => (
            <button
              key={item.n}
              onClick={() => {
                setNivel(item.n)
                setIndice(Math.floor(Math.random() * PERGUNTAS[item.n].length))
              }}
              className={`rounded-2xl bg-gradient-to-r ${item.cor} px-6 py-6 font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-95`}
            >
              <div className="mb-1 text-2xl">
                {item.emoji} {item.titulo}
              </div>
              <div className="text-sm font-medium opacity-90">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const lista = PERGUNTAS[nivel]
  const atual = lista[indice]
  const isVerdade = atual.tipo === 'Verdade'

  return (
    <div>
      <div
        className={`mb-8 rounded-2xl bg-gradient-to-br p-8 text-center ${isVerdade ? 'from-sky-600 to-sky-800' : 'from-orange-600 to-orange-800'}`}
      >
        <h3 className="mb-2 text-2xl font-bold text-white">{isVerdade ? '💬 VERDADE' : '🎬 DESAFIO'}</h3>
        <p className="text-white/80">Nível {nivel} de 3</p>
      </div>

      <div
        className={`mb-8 rounded-2xl border-4 bg-slate-800/80 p-8 ${isVerdade ? 'border-sky-500' : 'border-orange-500'}`}
      >
        <p className="text-center text-xl leading-relaxed text-white">{atual.texto}</p>
      </div>

      <div className="flex gap-4">
        <Botao variante="neutro" onClick={() => setNivel(null)} className="px-6">
          Trocar nível
        </Botao>
        <Botao onClick={() => setIndice(sortear(lista.length, indice))} className="flex-1">
          Próxima →
        </Botao>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Jogo 3 — Cartões de Proximidade
// ─────────────────────────────────────────────────────────────

function JogoCartoes({ aoVoltar }) {
  const [indice, setIndice] = useState(null)

  if (indice === null) {
    return (
      <div>
        <Titulo icone="🔥" nome="Cartões de Proximidade" subtitulo="Revelem um cartão por vez" />
        <div className="rounded-2xl bg-slate-800/80 p-10 text-center">
          <p className="mb-8 text-lg text-slate-400">Vocês estão prontos?</p>
          <Botao onClick={() => setIndice(0)} className="px-12 py-6 text-xl">
            Revelar o primeiro cartão →
          </Botao>
        </div>
      </div>
    )
  }

  const cartao = CARTOES[indice]
  const ultimo = indice === CARTOES.length - 1

  return (
    <div>
      <div className="mb-6 flex items-center justify-between text-sm">
        <span className="font-semibold text-rose-300">
          Cartão {indice + 1} de {CARTOES.length}
        </span>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((indice + 1) / CARTOES.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8 flex min-h-[16rem] flex-col justify-center rounded-2xl border-4 border-rose-400 bg-gradient-to-br from-rose-600 to-rose-800 p-10 text-center shadow-2xl">
        <div className="mb-6 text-6xl">{cartao.emoji}</div>
        <p className="text-2xl font-bold leading-relaxed text-white">{cartao.texto}</p>
        <div className="mt-8">
          <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm text-rose-50">
            Temperatura: {'🔥'.repeat(cartao.temp)}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        {indice > 0 && (
          <Botao variante="neutro" onClick={() => setIndice(indice - 1)} className="flex-1">
            ← Anterior
          </Botao>
        )}
        {ultimo ? (
          <Botao variante="sucesso" onClick={aoVoltar} className="flex-1">
            ✅ Voltar ao menu
          </Botao>
        ) : (
          <Botao onClick={() => setIndice(indice + 1)} className="flex-1">
            Próximo →
          </Botao>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Jogo 4 — Desafios para Pares
// ─────────────────────────────────────────────────────────────

function JogoPares() {
  const [indice, setIndice] = useState(null)

  if (indice === null) {
    return (
      <div>
        <Titulo icone="💕" nome="Desafios para Pares" subtitulo="Surpreendam um ao outro" />
        <div className="rounded-2xl bg-slate-800/80 p-10 text-center">
          <p className="mb-8 text-lg text-slate-400">Deixem a sorte decidir</p>
          <Botao onClick={() => setIndice(sortear(DESAFIOS_PARES.length, -1))} className="px-12 py-6 text-xl">
            🎰 Girar desafio
          </Botao>
        </div>
      </div>
    )
  }

  const desafio = DESAFIOS_PARES[indice]

  return (
    <div>
      <div className="mb-8 flex min-h-[16rem] flex-col justify-center rounded-2xl border-4 border-rose-400 bg-gradient-to-br from-rose-600 to-rose-800 p-10 text-center shadow-2xl">
        <div className="mb-6 text-6xl">{desafio.emoji}</div>
        <p className="mb-6 text-2xl font-bold leading-relaxed text-white">{desafio.texto}</p>
        <span className="mx-auto inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-rose-100">
          {desafio.tipo}
        </span>
      </div>

      <Botao onClick={() => setIndice(sortear(DESAFIOS_PARES.length, indice))} className="w-full">
        🎰 Girar de novo
      </Botao>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Menu + shell
// ─────────────────────────────────────────────────────────────

function Menu({ aoEscolher }) {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-12 text-center">
        <div className="mb-4 text-6xl">🔥💋</div>
        <h1 className="mb-3 text-4xl font-bold text-white">Mini Jogos de Intimidade</h1>
        <p className="text-lg text-rose-200">Vamos aumentar a temperatura? 😏</p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        {Object.entries(JOGOS).map(([chave, jogo]) => (
          <button
            key={chave}
            onClick={() => aoEscolher(chave)}
            className="group rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 p-8 text-left shadow-lg transition-all duration-200 hover:scale-[1.03] hover:from-rose-500 hover:to-rose-700 hover:shadow-2xl active:scale-95"
          >
            <div className="mb-3 text-4xl transition-transform group-hover:scale-110">{jogo.icone}</div>
            <h3 className="mb-2 text-xl font-bold text-white">{jogo.nome}</h3>
            <p className="mb-3 text-sm text-rose-100">{jogo.descricao}</p>
            <p className="text-xs text-rose-200/80">{jogo.regras}</p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-rose-600/70 bg-rose-950/50 p-6 text-center">
        <p className="text-sm leading-relaxed text-rose-100">
          ⚠️ Jogos para casais adultos. Qualquer desafio pode ser recusado — respeitem sempre os limites um do outro 💕
        </p>
      </div>
    </div>
  )
}

export default function JogoFogoPage() {
  const [jogoAtual, setJogoAtual] = useState(null)

  const voltar = () => setJogoAtual(null)

  const conteudo = {
    dados: <JogoDados />,
    verdadeOuDesafio: <JogoVerdadeOuDesafio />,
    cartoes: <JogoCartoes aoVoltar={voltar} />,
    pares: <JogoPares />,
  }[jogoAtual]

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900">
      {jogoAtual && (
        <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-rose-900 to-rose-800 p-4 shadow-lg">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <h1 className="text-base font-bold text-white sm:text-lg">Mini Jogos de Intimidade 🔥</h1>
            <button
              onClick={voltar}
              className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-bold text-rose-900 transition-all hover:scale-105 hover:bg-rose-50 active:scale-95"
            >
              ← Menu
            </button>
          </div>
        </header>
      )}

      <div
        className={`flex min-h-screen flex-col items-center justify-center p-6 ${jogoAtual ? 'pt-28' : ''}`}
      >
        {jogoAtual ? <div className="w-full max-w-2xl">{conteudo}</div> : <Menu aoEscolher={setJogoAtual} />}
      </div>
    </main>
  )
}
