'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const ITEMS_RAW = [
  ["Ferramentas manuais","Alicate universal","Cortes, dobras e aperto gerais","Essencial"],
  ["Ferramentas manuais","Alicate de bico","Trabalho fino e em espaços apertados","Essencial"],
  ["Ferramentas manuais","Alicate de corte","Cortar fios e cabos rente","Essencial"],
  ["Ferramentas manuais","Alicate bomba d'água","Aperto de porcas e conexões","Essencial"],
  ["Ferramentas manuais","Alicate de pressão","Travar e segurar peças","Recomendado"],
  ["Ferramentas manuais","Jogo de chave de fenda e Philips","Parafusos diversos","Essencial"],
  ["Ferramentas manuais","Jogo de chave Torx","Parafusos Torx (rede / eletrônicos)","Essencial"],
  ["Ferramentas manuais","Jogo de chave de boca","Porcas e parafusos sextavados","Essencial"],
  ["Ferramentas manuais","Jogo de chave Allen","Parafusos com sextavado interno","Essencial"],
  ["Cabeamento de rede","Alicate de crimpar RJ45 (catraca)","Termina os cabos Cat6 nos conectores","Essencial"],
  ["Cabeamento de rede","Alicate de inserção / punch down","Fixa os fios em keystones e patch panel","Essencial"],
  ["Cabeamento de rede","Decapador de cabo UTP","Abre o cabo sem ferir os pares","Essencial"],
  ["Cabeamento de rede","Testador de cabo de rede","Confere a pinagem antes de fechar a parede","Essencial"],
  ["Cabeamento de rede","Gerador de tom + sonda","Identifica qual cabo é qual no rack","Recomendado"],
  ["Cabeamento de rede","Guia / fita passa-fio (15–30 m)","Puxa cabo pelos conduítes da reforma","Essencial"],
  ["Cabeamento de rede","Conectores RJ45 Cat6 + capas","Terminação dos cabos de rede","Essencial"],
  ["Cabeamento de rede","Keystones Cat6","Pontos de parede do cabeamento","Recomendado"],
  ["Cabeamento de rede","Patch panel 24 portas","Organização das conexões no rack","Recomendado"],
  ["Cabeamento de rede","Patch cords Cat6 prontos","Conexões internas do rack","Recomendado"],
  ["Cabeamento de rede","Etiquetas / anilhas para cabo","Identificar as duas pontas","Recomendado"],
  ["Cabeamento de rede","Organizador horizontal (rack)","Gestão de cabos no rack 8U","Opcional"],
  ["Fibra — ODI XPON Stick","Caneta de limpeza de fibra óptica","Limpa o conector da fibra Vivo","Essencial"],
  ["Fibra — ODI XPON Stick","Lenços sem fiapo (lint-free)","Limpeza de fibra e contatos","Essencial"],
  ["Fibra — ODI XPON Stick","Álcool isopropílico 99%","Limpeza de conectores e contatos","Essencial"],
  ["Elétrica e medição","Multímetro digital","Continuidade e tensão; conferir a elétrica","Essencial"],
  ["Elétrica e medição","Detector de tensão sem contato","Segurança ao trabalhar na fiação","Essencial"],
  ["Elétrica e medição","Chave de teste / busca-polo","Testes rápidos de fase","Recomendado"],
  ["Elétrica e medição","Testador de tomada (LED)","Valida as tomadas novas do projeto","Recomendado"],
  ["Elétrica e medição","Fita isolante","Isolamento e identificação","Essencial"],
  ["Elétrica e medição","Abraçadeiras + velcro","Gestão e amarração de cabos","Recomendado"],
  ["Furação e fixação","Furadeira / parafusadeira","Fixar APs no teto, rack e suportes","Essencial"],
  ["Furação e fixação","Kit de bits / pontas","Uso com a parafusadeira","Recomendado"],
  ["Furação e fixação","Brocas para concreto (widia)","Laje e paredes de alvenaria","Essencial"],
  ["Furação e fixação","Brocas / serra-copo p/ drywall","Paredes de drywall do projeto","Recomendado"],
  ["Furação e fixação","Detector de cabo na parede","Não furar sobre os conduítes novos","Recomendado"],
  ["Furação e fixação","Buchas e parafusos sortidos","Fixações diversas","Essencial"],
  ["Furação e fixação","Escada / banqueta firme","APs vão no teto (sala, quartos, office)","Essencial"],
  ["Medição e apoio","Trena (5 m)","Medições gerais","Essencial"],
  ["Medição e apoio","Trena a laser","Tiragens de 8–10 m com folga correta","Recomendado"],
  ["Medição e apoio","Nível (bolha ou laser)","Alinhar rack e suportes","Recomendado"],
  ["Medição e apoio","Estilete reforçado + lâminas","Cortes diversos","Essencial"],
  ["Medição e apoio","Arco de serra / mini serra","Cortes em conduíte e canaleta","Recomendado"],
  ["Medição e apoio","Lima","Acabamento de cortes","Opcional"],
  ["Medição e apoio","Lanterna de cabeça","Trabalho no teto com as mãos livres","Recomendado"],
  ["Medição e apoio","Óculos de proteção + luvas","Segurança na furação","Essencial"],
  ["Medição e apoio","Câmera de inspeção / endoscópio","Ver o caminho dentro dos conduítes","Opcional"],
  ["Organização","Maleta / caixa de ferramentas","Consolidar e transportar o kit","Recomendado"],
  ["Organização","Etiquetadora portátil","Etiquetar cabos, patch panel e portas","Recomendado"],
].map((r, i) => ({ id: 't' + i, cat: r[0], nm: r[1], fn: r[2], pr: r[3] }))

const KEY = 'larmomo_kit_ferramentas_v1'
const brl = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR')
const CATS = [...new Set(ITEMS_RAW.map(i => i.cat))]

export default function KitFerramentas() {
  const [loaded, setLoaded] = useState(false)
  const [itemState, setItemState] = useState({})
  const [fStatus, setFStatus] = useState('todos')
  const [fPrio, setFPrio] = useState('todas')
  const saveTimer = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setItemState(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  const persist = useCallback((next) => {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
    }, 250)
  }, [])

  const update = useCallback((next) => {
    setItemState(next)
    persist(next)
  }, [persist])

  const totals = () => {
    let bought = 0, money = 0
    ITEMS_RAW.forEach(it => {
      const s = itemState[it.id]
      if (s?.b) { bought++; money += (+s.p || 0) }
    })
    return { bought, money, total: ITEMS_RAW.length, left: ITEMS_RAW.length - bought }
  }

  const { bought, money, total, left } = totals()
  const pct = Math.round(bought / total * 100)

  const filtered = (cat) => ITEMS_RAW.filter(i => i.cat === cat).filter(i => {
    const b = !!itemState[i.id]?.b
    if (fStatus === 'faltam' && b) return false
    if (fStatus === 'comprados' && !b) return false
    if (fPrio !== 'todas' && i.pr !== fPrio) return false
    return true
  })

  const toggle = (id, val) => {
    update({ ...itemState, [id]: { ...(itemState[id] || {}), b: val } })
  }

  const setPrice = (id, raw) => {
    const v = raw.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.')
    update({ ...itemState, [id]: { ...(itemState[id] || {}), p: v === '' ? '' : parseFloat(v) || 0 } })
  }

  const reset = () => {
    if (!confirm('Apagar todas as marcações e valores? Isso não pode ser desfeito.')) return
    setItemState({})
    try { localStorage.removeItem(KEY) } catch {}
  }

  const visibleCount = CATS.reduce((acc, cat) => acc + filtered(cat).length, 0)

  return (
    <>
      <style>{`
        .kf-root {
          --bg: #060d1a;
          --panel: #0c1829;
          --panel2: #11243d;
          --line: #1e3a6e;
          --text: #f0f4ff;
          --muted: #64748b;
          --accent: #2563eb;
          --accent-soft: rgba(37,99,235,.13);
          --ess: #2563eb;
          --rec: #38bdf8;
          --opc: #64748b;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          background-image:
            linear-gradient(rgba(37,99,235,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,.03) 1px, transparent 1px);
          background-size: 34px 34px;
          -webkit-font-smoothing: antialiased;
        }
        .kf-wrap { max-width: 760px; margin: 0 auto; padding: 28px 16px 100px; }

        .kf-kicker { font: 700 11px/1 'JetBrains Mono', monospace; letter-spacing: .2em; color: var(--accent); text-transform: uppercase; }
        .kf-h1 { font-weight: 800; font-size: clamp(26px,6vw,38px); letter-spacing: -.02em; line-height: 1.02; margin: 8px 0 4px; }
        .kf-sub { color: var(--muted); font-size: 13.5px; margin-bottom: 20px; }

        .kf-dash {
          display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 1px;
          background: var(--line); border: 1px solid var(--line); border-radius: 16px;
          overflow: hidden; margin-bottom: 16px;
        }
        .kf-cell { background: var(--panel); padding: 16px; }
        .kf-cell .lab { font: 700 10.5px/1 monospace; letter-spacing: .16em; color: var(--muted); text-transform: uppercase; }
        .kf-cell .big { font: 700 clamp(22px,6.6vw,30px)/1 monospace; margin-top: 9px; }
        .kf-cell .big.money { color: var(--accent); }
        .kf-cell .big small { font-size: 14px; color: var(--muted); font-weight: 500; }
        .kf-bar { height: 7px; border-radius: 99px; background: var(--panel2); overflow: hidden; margin-top: 12px; }
        .kf-bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--accent), #60a5fa); transition: width .45s cubic-bezier(.2,.7,.2,1); }
        .kf-pct { font: 700 11px/1 monospace; color: var(--muted); margin-top: 7px; display: inline-block; }

        .kf-filters { display: flex; gap: 7px; flex-wrap: wrap; margin: 16px 0 6px; }
        .kf-chip {
          border: 1px solid var(--line); background: var(--panel); color: var(--muted);
          font: 600 12.5px/1 'Inter', sans-serif; padding: 8px 13px; border-radius: 99px;
          cursor: pointer; transition: .16s;
        }
        .kf-chip:hover { color: var(--text); border-color: #2d4a8a; }
        .kf-chip.on { background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 700; }

        .kf-cat { margin-top: 24px; }
        .kf-cat-h {
          display: flex; align-items: center; gap: 10px; padding: 0 2px 9px;
          border-bottom: 1px solid var(--line); margin-bottom: 8px;
        }
        .kf-cat-h h2 { font-weight: 700; font-size: 16px; letter-spacing: -.01em; }
        .kf-cat-h .ct { margin-left: auto; font: 700 11px/1 monospace; color: var(--muted); }

        .kf-item {
          display: flex; align-items: center; gap: 14px; padding: 13px 14px;
          border: 1px solid var(--line); border-radius: 13px; background: var(--panel);
          margin-top: 8px; transition: .18s;
        }
        .kf-item.bought {
          background: linear-gradient(180deg, var(--accent-soft), transparent), var(--panel);
          border-color: rgba(37,99,235,.4);
        }
        .kf-meta { flex: 1; min-width: 0; }
        .kf-nm { font-weight: 600; font-size: 15px; letter-spacing: -.01em; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .kf-tag { font: 700 9.5px/1 monospace; letter-spacing: .08em; padding: 4px 7px; border-radius: 6px; text-transform: uppercase; border: 1px solid currentColor; }
        .kf-tag.Essencial { color: var(--ess); }
        .kf-tag.Recomendado { color: var(--rec); }
        .kf-tag.Opcional { color: var(--opc); }
        .kf-fn { color: var(--muted); font-size: 12.5px; margin-top: 4px; line-height: 1.35; }

        .kf-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }
        .kf-toggle { display: flex; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: var(--panel2); }
        .kf-toggle button {
          border: 0; background: transparent; color: var(--muted); font: 700 12px/1 'Inter', sans-serif;
          padding: 9px 14px; cursor: pointer; transition: .15s; letter-spacing: .02em;
        }
        .kf-toggle button.no.sel { background: #1e293b; color: var(--text); }
        .kf-toggle button.yes.sel { background: var(--accent); color: #fff; }
        .kf-toggle button:not(.sel):hover { color: var(--text); }

        .kf-pay { display: flex; align-items: center; gap: 6px; opacity: 0; max-height: 0; overflow: hidden; transition: .22s; }
        .kf-pay.show { opacity: 1; max-height: 46px; }
        .kf-pay span { font: 700 12px/1 monospace; color: var(--accent); }
        .kf-pay input {
          width: 96px; background: var(--bg); border: 1px solid var(--line); color: var(--text);
          font: 700 13px/1 monospace; padding: 8px 9px; border-radius: 8px; text-align: right;
        }
        .kf-pay input:focus { outline: none; border-color: var(--accent); }

        .kf-fab {
          position: fixed; left: 0; right: 0; bottom: 0;
          background: rgba(6,13,26,.92); backdrop-filter: blur(8px);
          border-top: 1px solid var(--line); padding: 11px 16px;
          display: flex; align-items: center; gap: 14px; justify-content: space-between; z-index: 50;
        }
        .kf-fab .t { font: 700 12px/1 monospace; color: var(--muted); }
        .kf-fab .v { font: 700 17px/1 monospace; color: var(--accent); margin-top: 4px; }
        .kf-reset {
          margin-left: auto; background: transparent; border: 1px solid var(--line); color: var(--muted);
          font: 600 12px/1 'Inter', sans-serif; padding: 9px 13px; border-radius: 9px; cursor: pointer;
        }
        .kf-reset:hover { color: #60a5fa; border-color: #1e3a6e; }

        .kf-empty { padding: 60px 0; text-align: center; color: var(--muted); font: 600 13px 'Inter', sans-serif; }
        .kf-dot { display: inline-block; width: 7px; height: 7px; border-radius: 99px; background: var(--accent); margin: 0 2px; animation: kfb 1s infinite; }
        .kf-dot:nth-child(2) { animation-delay: .15s; }
        .kf-dot:nth-child(3) { animation-delay: .3s; }
        @keyframes kfb { 0%,100% { opacity:.25; transform:translateY(0); } 50% { opacity:1; transform:translateY(-4px); } }

        @media (max-width: 560px) {
          .kf-dash { grid-template-columns: 1fr 1fr; }
          .kf-cell:first-child { grid-column: 1/-1; }
          .kf-item { flex-wrap: wrap; }
          .kf-right { align-items: stretch; width: 100%; flex-direction: row; justify-content: space-between; }
        }
      `}</style>

      <div className="kf-root">
        <div className="kf-wrap">
          <span className="kf-kicker">● Projeto LarMomo</span>
          <h1 className="kf-h1">Kit de Ferramentas</h1>
          <p className="kf-sub">
            Marque <b style={{ color: 'var(--accent)' }}>Sim</b> quando comprar, digite quanto pagou.
            O total se atualiza sozinho e fica salvo.
          </p>

          <div className="kf-dash">
            <div className="kf-cell">
              <div className="lab">Total investido</div>
              <div className="big money">{brl(money)}</div>
              <div className="kf-bar"><i style={{ width: pct + '%' }} /></div>
              <span className="kf-pct">{pct}% concluído</span>
            </div>
            <div className="kf-cell">
              <div className="lab">Comprados</div>
              <div className="big">{bought}<small>/{total}</small></div>
            </div>
            <div className="kf-cell">
              <div className="lab">Faltam</div>
              <div className="big">{left}</div>
            </div>
          </div>

          <div className="kf-filters">
            {[['Todos','todos'],['Faltam','faltam'],['Comprados','comprados']].map(([label, val]) => (
              <button key={val} className={'kf-chip' + (fStatus === val ? ' on' : '')} onClick={() => setFStatus(val)}>{label}</button>
            ))}
            <span style={{ width: 1, background: 'var(--line)', margin: '2px 4px' }} />
            {[['Todas','todas'],['Essencial','Essencial'],['Recomendado','Recomendado'],['Opcional','Opcional']].map(([label, val]) => (
              <button key={val} className={'kf-chip' + (fPrio === val ? ' on' : '')} onClick={() => setFPrio(val)}>{label}</button>
            ))}
          </div>

          {!loaded ? (
            <div className="kf-empty">
              <span className="kf-dot" /><span className="kf-dot" /><span className="kf-dot" />
              <div style={{ marginTop: 14 }}>Carregando seus dados…</div>
            </div>
          ) : visibleCount === 0 ? (
            <div className="kf-empty">Nada por aqui com esse filtro.</div>
          ) : (
            CATS.map(cat => {
              const items = filtered(cat)
              if (!items.length) return null
              const catBought = ITEMS_RAW.filter(i => i.cat === cat && itemState[i.id]?.b).length
              const catTotal = ITEMS_RAW.filter(i => i.cat === cat).length
              return (
                <div key={cat} className="kf-cat">
                  <div className="kf-cat-h">
                    <h2>{cat}</h2>
                    <span className="ct">{catBought} / {catTotal}</span>
                  </div>
                  {items.map(it => (
                    <Item
                      key={it.id}
                      it={it}
                      s={itemState[it.id] || {}}
                      onToggle={toggle}
                      onPrice={setPrice}
                    />
                  ))}
                </div>
              )
            })
          )}
        </div>

        <div className="kf-fab">
          <div>
            <div className="t">TOTAL INVESTIDO</div>
            <div className="v">{brl(money)}</div>
          </div>
          <button className="kf-reset" onClick={reset}>Limpar tudo</button>
        </div>
      </div>
    </>
  )
}

function Item({ it, s, onToggle, onPrice }) {
  const bought = !!s.b
  const priceRef = useRef(null)

  const handleYes = () => {
    onToggle(it.id, true)
    setTimeout(() => priceRef.current?.focus(), 180)
  }

  return (
    <div className={'kf-item' + (bought ? ' bought' : '')}>
      <div className="kf-meta">
        <div className="kf-nm">
          {it.nm}
          <span className={'kf-tag ' + it.pr}>{it.pr}</span>
        </div>
        <div className="kf-fn">{it.fn}</div>
      </div>
      <div className="kf-right">
        <div className="kf-toggle">
          <button className={'no' + (!bought ? ' sel' : '')} onClick={() => onToggle(it.id, false)}>Não</button>
          <button className={'yes' + (bought ? ' sel' : '')} onClick={handleYes}>Sim</button>
        </div>
        <div className={'kf-pay' + (bought ? ' show' : '')}>
          <span>R$</span>
          <input
            ref={priceRef}
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={s.p !== undefined ? s.p : ''}
            onChange={e => onPrice(it.id, e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
