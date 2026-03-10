'use client'
import Link from 'next/link'

const linkWhatsapp = 'https://wa.me/5511969107843?text=Olá! Vi a proposta de Landing Page e quero dar continuidade.'

const entregaveis = [
  'Design UI/UX moderno e exclusivo (não é template)',
  'Desenvolvimento 100% responsivo (Mobile-First)',
  'Animações e micro-interações de alto impacto',
  'Estrutura otimizada para conversão (CRO)',
  'Código limpo em React (pode ser convertido para HTML)',
  'Integração com plataforma de pagamento (Hotmart, Kiwify etc.)',
  'Seção de FAQ interativa',
  'Otimização de performance (Core Web Vitals)',
  '1 rodada de revisão inclusa',
  'Entrega em até 7 dias úteis',
]

const diferenciais = [
  { emoji: '🎨', titulo: 'Design Exclusivo',     descricao: 'Criado do zero, sem templates genéricos. Identidade visual única para o seu produto.' },
  { emoji: '📱', titulo: 'Mobile-First Real',    descricao: 'Pensado primeiro para celular — onde mais de 80% das vendas acontecem.' },
  { emoji: '⚡', titulo: 'Alta Performance',     descricao: 'Otimizado para Core Web Vitals. Página rápida converte mais.' },
  { emoji: '📈', titulo: 'Foco em Conversão',   descricao: 'Cada bloco da página é estratégico: headline, prova social, oferta e CTA.' },
  { emoji: '🔗', titulo: 'Integrações Prontas', descricao: 'Checkout, pixel de rastreamento e ferramentas de analytics configurados.' },
  { emoji: '🛡️', titulo: 'Código Limpo',        descricao: 'React componentizado, fácil de manter e escalar. Ou exportado para HTML estático.' },
]

const passos = [
  { num: '01', texto: 'Aprovação desta proposta' },
  { num: '02', texto: 'Pagamento do sinal (50%)' },
  { num: '03', texto: 'Briefing detalhado e alinhamento visual' },
  { num: '04', texto: 'Desenvolvimento (5–7 dias úteis)' },
  { num: '05', texto: 'Revisão e ajustes finais' },
  { num: '06', texto: 'Entrega + pagamento final' },
]

export default function PropostaLP() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        :root {
          --fundo:      #060d1a;
          --superficie: #0c1829;
          --borda:      #1e3a6e;
          --azul:       #2563eb;
          --azul-claro: #3b82f6;
          --dourado:    #f59e0b;
          --dourado-claro: #fbbf24;
          --verde:      #22c55e;
          --branco:     #f8fafc;
          --cinza:      #94a3b8;
          --cinza-esc:  #334155;
        }
        .lp-page { background: var(--fundo); color: var(--branco); font-family: 'Inter', sans-serif; min-height: 100vh; }
        .lp-page *, .lp-page *::before, .lp-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .lp-container { max-width: 820px; margin: 0 auto; padding: 0 20px; }

        /* CABEÇALHO */
        .lp-header {
          background: var(--superficie);
          border-bottom: 1px solid var(--borda);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(12px);
        }
        .lp-header-logo { font-size: 16px; font-weight: 700; color: var(--branco); text-decoration: none; }
        .lp-header-logo span { color: var(--azul-claro); }
        .lp-header-badge {
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--dourado);
          background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25);
          padding: 5px 12px; border-radius: 100px;
        }

        /* HERO DA PROPOSTA */
        .lp-hero {
          padding: 64px 20px 48px;
          text-align: center;
          border-bottom: 1px solid var(--borda);
          background: linear-gradient(180deg, rgba(37,99,235,0.06) 0%, transparent 100%);
        }
        .lp-rotulo {
          display: inline-block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--azul-claro); margin-bottom: 16px;
        }
        .lp-hero h1 {
          font-size: clamp(26px, 5vw, 42px); font-weight: 800;
          line-height: 1.15; color: var(--branco); margin-bottom: 8px;
        }
        .lp-hero h1 span { color: var(--azul-claro); }
        .lp-hero-sub { font-size: 15px; color: var(--cinza); margin-bottom: 36px; }

        /* CARD CLIENTE */
        .lp-card-cliente {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; max-width: 560px; margin: 0 auto;
          background: var(--superficie); border: 1px solid var(--borda); border-radius: 12px;
          overflow: hidden;
        }
        @media (max-width: 480px) { .lp-card-cliente { grid-template-columns: 1fr; } }
        .lp-cliente-item { padding: 20px 24px; border-right: 1px solid var(--borda); }
        .lp-cliente-item:last-child { border-right: none; }
        .lp-cliente-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cinza); margin-bottom: 6px; }
        .lp-cliente-valor { font-size: 15px; font-weight: 700; color: var(--branco); }
        .lp-cliente-sub { font-size: 12px; color: var(--cinza); margin-top: 2px; }
        .lp-validade { font-size: 11px; color: var(--dourado); margin-top: 4px; }

        /* SEÇÕES */
        .lp-secao { padding: 56px 20px; border-bottom: 1px solid var(--borda); }
        .lp-secao-titulo {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--azul-claro); margin-bottom: 20px;
        }
        .lp-secao-titulo::before {
          content: ''; display: block; width: 3px; height: 18px;
          background: var(--azul); border-radius: 2px; flex-shrink: 0;
        }

        /* SOBRE O PROJETO */
        .lp-sobre-texto {
          font-size: 16px; color: var(--cinza); line-height: 1.75;
          background: var(--superficie); border: 1px solid var(--borda);
          border-left: 3px solid var(--azul); border-radius: 0 12px 12px 0;
          padding: 20px 24px;
        }

        /* TABELA DE ENTREGÁVEIS */
        .lp-tabela { width: 100%; border-collapse: collapse; }
        .lp-tabela thead tr { background: rgba(37,99,235,0.12); }
        .lp-tabela th {
          padding: 12px 16px; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase; text-align: left;
          color: var(--azul-claro); border-bottom: 1px solid var(--borda);
        }
        .lp-tabela th:last-child { text-align: center; }
        .lp-tabela td {
          padding: 14px 16px; font-size: 14px; color: var(--branco);
          border-bottom: 1px solid rgba(30,58,110,0.4); vertical-align: middle;
        }
        .lp-tabela td:last-child { text-align: center; }
        .lp-tabela tr:last-child td { border-bottom: none; }
        .lp-tabela tr:hover td { background: rgba(37,99,235,0.05); }
        .lp-check { color: var(--verde); font-size: 18px; }
        .lp-tabela-wrap {
          border: 1px solid var(--borda); border-radius: 12px;
          overflow: hidden; background: var(--superficie);
        }

        /* CAIXA PREÇO */
        .lp-preco-wrap { max-width: 480px; margin: 0 auto; }
        .lp-preco-card {
          background: var(--superficie);
          border: 2px solid rgba(245,158,11,0.4);
          border-radius: 16px; padding: 36px 32px; text-align: center;
          position: relative; overflow: hidden;
        }
        .lp-preco-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--dourado), var(--dourado-claro), var(--dourado));
        }
        .lp-preco-pacote {
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--dourado); margin-bottom: 12px;
        }
        .lp-preco-valor {
          font-size: clamp(38px, 8vw, 56px); font-weight: 800;
          color: var(--dourado-claro); line-height: 1; margin-bottom: 6px;
        }
        .lp-preco-valor sup { font-size: 20px; vertical-align: super; }
        .lp-preco-parcelado { font-size: 14px; color: var(--cinza); margin-bottom: 24px; }
        .lp-preco-parcelado strong { color: var(--branco); }

        /* CONDIÇÕES */
        .lp-condicoes { display: grid; gap: 10px; max-width: 480px; margin: 0 auto; }
        .lp-condicao-item {
          display: flex; align-items: flex-start; gap: 10px;
          background: var(--superficie); border: 1px solid var(--borda);
          border-radius: 10px; padding: 14px 16px; font-size: 14px; color: var(--cinza);
        }
        .lp-condicao-item span:first-child { color: var(--verde); flex-shrink: 0; font-size: 16px; }

        /* DIFERENCIAIS */
        .lp-grade-diferenciais {
          display: grid; grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 600px) { .lp-grade-diferenciais { grid-template-columns: 1fr 1fr; } }
        .lp-diferencial {
          display: flex; gap: 14px; align-items: flex-start;
          background: var(--superficie); border: 1px solid var(--borda);
          border-radius: 12px; padding: 20px;
          transition: border-color 0.2s;
        }
        .lp-diferencial:hover { border-color: var(--azul); }
        .lp-diferencial-emoji { font-size: 26px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
        .lp-diferencial h4 { font-size: 14px; font-weight: 700; color: var(--branco); margin-bottom: 4px; }
        .lp-diferencial p { font-size: 13px; color: var(--cinza); line-height: 1.55; }

        /* PRÓXIMOS PASSOS */
        .lp-passos { display: grid; gap: 12px; }
        .lp-passo {
          display: flex; align-items: center; gap: 16px;
          background: var(--superficie); border: 1px solid var(--borda);
          border-radius: 12px; padding: 16px 20px;
        }
        .lp-passo-num {
          font-size: 22px; font-weight: 800; color: rgba(37,99,235,0.3);
          font-variant-numeric: tabular-nums; flex-shrink: 0; line-height: 1; width: 32px;
        }
        .lp-passo-texto { font-size: 15px; color: var(--branco); font-weight: 500; }

        /* CTA FINAL */
        .lp-cta {
          padding: 64px 20px; text-align: center;
          background: linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.05) 100%);
        }
        .lp-cta h2 { font-size: clamp(22px, 4vw, 34px); font-weight: 800; color: var(--branco); margin-bottom: 10px; }
        .lp-cta p { font-size: 15px; color: var(--cinza); margin-bottom: 32px; }
        .lp-btn-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--verde); color: #052e16;
          font-size: 16px; font-weight: 800; padding: 18px 40px;
          border-radius: 12px; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 30px rgba(34,197,94,0.35);
        }
        .lp-btn-cta:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(34,197,94,0.5); }
        .lp-garantia-nota { margin-top: 14px; font-size: 12px; color: var(--cinza); }

        /* RODAPÉ */
        .lp-rodape {
          background: var(--superficie); border-top: 1px solid var(--borda);
          padding: 24px 20px; text-align: center;
          font-size: 12px; color: var(--cinza-esc);
        }
        .lp-rodape a { color: var(--cinza); text-decoration: none; }
        .lp-rodape a:hover { color: var(--branco); }

        @media (max-width: 480px) {
          .lp-hero { padding: 40px 16px 32px; }
          .lp-secao { padding: 40px 16px; }
          .lp-preco-card { padding: 28px 20px; }
        }
      `}</style>

      <div className="lp-page">

        {/* CABEÇALHO */}
        <header className="lp-header">
          <Link href="/" className="lp-header-logo">
            Bueno<span> Mídias</span>
          </Link>
          <span className="lp-header-badge">Proposta Comercial</span>
        </header>

        {/* HERO */}
        <div className="lp-hero">
          <div className="lp-container">
            <span className="lp-rotulo">Proposta Comercial</span>
            <h1>Desenvolvimento de<br /><span>Landing Page Premium</span></h1>
            <p className="lp-hero-sub">Proposta personalizada — design exclusivo, alta conversão, entrega em 7 dias úteis.</p>

            <div className="lp-card-cliente">
              <div className="lp-cliente-item">
                <p className="lp-cliente-label">Cliente</p>
                <p className="lp-cliente-valor">Você</p>
                <p className="lp-cliente-sub">seu site</p>
              </div>
              <div className="lp-cliente-item">
                <p className="lp-cliente-label">Data</p>
                <p className="lp-cliente-valor">xx de mmmm de 2026</p>
                <p className="lp-validade">⏳ Válido por 15 dias</p>
              </div>
            </div>
          </div>
        </div>

        {/* SOBRE O PROJETO */}
        <section className="lp-secao">
          <div className="lp-container">
            <div className="lp-secao-titulo">Sobre o Projeto</div>
            <p className="lp-sobre-texto">
              Desenvolvimento de Landing Page de alta conversão, com foco em design moderno,
              mobile-first e estrutura otimizada para campanhas de tráfego pago. O objetivo é transformar visitantes
              em compradores — com cada bloco da página estrategicamente planejado para isso.
            </p>
          </div>
        </section>

        {/* ENTREGÁVEIS */}
        <section className="lp-secao">
          <div className="lp-container">
            <div className="lp-secao-titulo">O que está incluso</div>
            <div className="lp-tabela-wrap">
              <table className="lp-tabela">
                <thead>
                  <tr>
                    <th>Entregável</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {entregaveis.map((item, i) => (
                    <tr key={i}>
                      <td>{item}</td>
                      <td><span className="lp-check">✓</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* INVESTIMENTO */}
        <section className="lp-secao">
          <div className="lp-container">
            <div className="lp-secao-titulo">Investimento</div>
            <div className="lp-preco-wrap">
              <div className="lp-preco-card">
                <p className="lp-preco-pacote">Pacote Landing Page Premium</p>
                <div className="lp-preco-valor"><sup>R$</sup> 3.900</div>
                <p className="lp-preco-parcelado">ou <strong>3x de R$ 1.300,00</strong> sem juros</p>
                <a href={linkWhatsapp} target="_blank" rel="noopener noreferrer" className="lp-btn-cta" style={{ display: 'inline-flex', marginBottom: '0' }}>
                  Quero fechar agora →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONDIÇÕES DE PAGAMENTO */}
        <section className="lp-secao">
          <div className="lp-container">
            <div className="lp-secao-titulo">Condições de Pagamento</div>
            <div className="lp-condicoes">
              <div className="lp-condicao-item">
                <span>💳</span>
                <span><strong style={{ color: 'var(--branco)' }}>50% na aprovação</strong> — R$ 1.950,00 para iniciar o desenvolvimento</span>
              </div>
              <div className="lp-condicao-item">
                <span>✅</span>
                <span><strong style={{ color: 'var(--branco)' }}>50% na entrega final</strong> — R$ 1.950,00 após aprovação da página</span>
              </div>
              <div className="lp-condicao-item">
                <span>🏦</span>
                <span><strong style={{ color: 'var(--branco)' }}>Formas aceitas:</strong> PIX, transferência bancária ou cartão de crédito</span>
              </div>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="lp-secao">
          <div className="lp-container">
            <div className="lp-secao-titulo">Diferenciais desta Proposta</div>
            <div className="lp-grade-diferenciais">
              {diferenciais.map((d, i) => (
                <div className="lp-diferencial" key={i}>
                  <span className="lp-diferencial-emoji">{d.emoji}</span>
                  <div>
                    <h4>{d.titulo}</h4>
                    <p>{d.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRÓXIMOS PASSOS */}
        <section className="lp-secao">
          <div className="lp-container">
            <div className="lp-secao-titulo">Próximos Passos</div>
            <div className="lp-passos">
              {passos.map((p) => (
                <div className="lp-passo" key={p.num}>
                  <span className="lp-passo-num">{p.num}</span>
                  <span className="lp-passo-texto">{p.texto}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <div className="lp-cta">
          <div className="lp-container">
            <h2>Pronto para começar?</h2>
            <p>Responda esta proposta e entramos em contato em até 1 hora útil para alinhar os próximos passos.</p>
            <a href={linkWhatsapp} target="_blank" rel="noopener noreferrer" className="lp-btn-cta">
              💬 Aceitar Proposta via WhatsApp
            </a>
            <p className="lp-garantia-nota">Proposta válida por 15 dias a partir da data de emissão.</p>
          </div>
        </div>

        {/* RODAPÉ */}
        <footer className="lp-rodape">
          <p>© 2026 Bueno Mídias — <a href="/">buenomdias.com.br</a></p>
          <p style={{ marginTop: '4px' }}>Desenvolvido com ♥ pela equipe Bueno Mídias</p>
        </footer>

      </div>
    </>
  )
}
