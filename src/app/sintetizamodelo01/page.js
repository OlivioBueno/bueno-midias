'use client';
import { useEffect } from 'react';

export default function SintetizaModelo01() {
  useEffect(() => {
    /* ── ANIMAÇÃO DE ENTRADA AO ROLAR ── */
    const elementosReveal = document.querySelectorAll('.revelar');

    const observadorReveal = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observadorReveal.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elementosReveal.forEach(el => {
      const dentroDe  = el.closest('.delay');
      const elEhDelay = el.classList.contains('delay');
      if (!dentroDe && !elEhDelay) observadorReveal.observe(el);
    });

    /* ── ACORDEÃO DO FAQ ── */
    const perguntas = document.querySelectorAll('.pergunta-faq');
    perguntas.forEach(pergunta => {
      pergunta.addEventListener('click', () => {
        const item     = pergunta.parentElement;
        const estaAberto = item.classList.contains('aberto');
        document.querySelectorAll('.item-faq').forEach(i => i.classList.remove('aberto'));
        if (!estaAberto) item.classList.add('aberto');
      });
    });

    /* ── BARRA FLUTUANTE ── */
    const barraFlutuante = document.getElementById('barraFlutuante');
    const onScroll = () => {
      if (!barraFlutuante || !barraFlutuante.classList.contains('delay-visivel')) return;
      if (window.scrollY > 600) barraFlutuante.classList.add('visivel');
      else                       barraFlutuante.classList.remove('visivel');
    };
    window.addEventListener('scroll', onScroll);

    /* ── SISTEMA DE DELAY DO VÍDEO ── */
    const SEGUNDOS_DELAY = 180; /* ← ALTERE AQUI */

    const elementosDelay = document.querySelectorAll('.delay');
    let delayDisparado   = false;

    function liberarConteudo() {
      if (delayDisparado) return;
      delayDisparado = true;
      elementosDelay.forEach((el, indice) => {
        setTimeout(() => {
          el.classList.add('delay-visivel');
          el.querySelectorAll('.revelar').forEach(filho => {
            if (!filho.classList.contains('visivel')) observadorReveal.observe(filho);
          });
          if (el.classList.contains('revelar') && !el.classList.contains('visivel')) {
            observadorReveal.observe(el);
          }
        }, indice * 120);
      });
    }

    if (SEGUNDOS_DELAY <= 0) {
      liberarConteudo();
    } else {
      const video = document.getElementById('videoVsl');
      if (video) {
        const onTimeUpdate = () => {
          if (video.currentTime >= SEGUNDOS_DELAY) liberarConteudo();
        };
        video.addEventListener('timeupdate', onTimeUpdate);
        const timer = setTimeout(liberarConteudo, SEGUNDOS_DELAY * 1000 + 5000);
        return () => {
          video.removeEventListener('timeupdate', onTimeUpdate);
          clearTimeout(timer);
          window.removeEventListener('scroll', onScroll);
          perguntas.forEach(p => p.replaceWith(p.cloneNode(true)));
        };
      } else {
        liberarConteudo();
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --azul-fundo:       #0b0f1a;
          --azul-superficie:  #111827;
          --azul-borda:       #1e2d47;
          --azul-destaque:    #3b82f6;
          --azul-claro:       #60a5fa;
          --dourado:          #fbbf24;
          --dourado-escuro:   #d97706;
          --verde:            #22c55e;
          --verde-escuro:     #16a34a;
          --vermelho:         #ef4444;
          --branco:           #f8fafc;
          --cinza-claro:      #cbd5e1;
          --cinza-medio:      #64748b;
          --cinza-escuro:     #334155;
          --raio-card:        16px;
          --raio-btn:         12px;
          --sombra-azul:      0 0 60px rgba(59,130,246,0.15);
          --sombra-verde:     0 0 30px rgba(34,197,94,0.4);
        }
        .sintetiza-page *, .sintetiza-page *::before, .sintetiza-page *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .sintetiza-page {
          background-color: var(--azul-fundo);
          color: var(--branco);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.7;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .sintetiza-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ruido'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ruido)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        .sintetiza-page h1, .sintetiza-page h2, .sintetiza-page h3, .sintetiza-page h4 {
          font-family: 'Fraunces', serif;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .destaque-dourado {
          background: linear-gradient(90deg, var(--dourado), var(--dourado-escuro));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .destaque-azul   { color: var(--azul-claro); }
        .destaque-verde  { color: var(--verde); }
        .destaque-vermelho { color: var(--vermelho); }
        .texto-muted     { color: var(--cinza-medio); }

        .container {
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }
        .sintetiza-page section { position: relative; z-index: 1; }

        /* CABEÇALHO */
        .cabecalho {
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid rgba(30,45,71,0.8);
          background: rgba(11,15,26,0.95);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }
        .cabecalho img { height: 36px; opacity: 0.92; }

        /* BARRA AVISO */
        .barra-aviso {
          background: linear-gradient(90deg, #1e3a5f, #172554);
          border-bottom: 1px solid rgba(59,130,246,0.2);
          padding: 10px 20px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--azul-claro);
        }
        .barra-aviso span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          animation: pisca 2.5s ease-in-out infinite;
        }
        @keyframes pisca {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }

        /* HERO */
        .hero { padding: 56px 20px 48px; text-align: center; }
        .etiqueta-metodo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.25);
          color: var(--azul-claro);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .hero h1 {
          font-size: clamp(22px, 4vw, 38px);
          color: var(--branco);
          max-width: 760px;
          margin: 0 auto 20px;
        }
        .hero-subtitulo {
          font-size: clamp(15px, 2vw, 19px);
          color: var(--cinza-claro);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        /* CAIXA VÍDEO */
        .caixa-video {
          max-width: 720px;
          margin: 0 auto 40px;
          border-radius: var(--raio-card);
          overflow: hidden;
          border: 1px solid var(--azul-borda);
          background: #000;
          box-shadow: var(--sombra-azul), 0 32px 80px rgba(0,0,0,0.7);
          position: relative;
        }
        .caixa-video::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--azul-destaque), transparent);
          z-index: 2;
        }
        .proporcao-video {
          position: relative;
          padding-bottom: 56.25%;
          background: #000;
        }
        .proporcao-video video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }

        /* BOTÃO CTA */
        .btn-principal {
          display: inline-block;
          background: linear-gradient(135deg, var(--verde) 0%, #4ade80 60%, var(--verde) 100%);
          background-size: 200% auto;
          color: #052e16;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(15px, 2.5vw, 19px);
          letter-spacing: 0.01em;
          padding: 20px 40px;
          border-radius: var(--raio-btn);
          text-decoration: none;
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 520px;
          text-align: center;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: var(--sombra-verde);
          animation: pulsa-cta 3s ease-in-out infinite;
        }
        @keyframes pulsa-cta {
          0%, 100% { box-shadow: var(--sombra-verde); }
          50%       { box-shadow: 0 0 50px rgba(34,197,94,0.6); }
        }
        .btn-principal:hover {
          background-position: right center;
          transform: translateY(-3px) scale(1.01);
        }
        .nota-garantia {
          margin-top: 14px;
          font-size: 12px;
          color: var(--cinza-medio);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .nota-garantia svg { color: var(--verde); flex-shrink: 0; }

        /* SEÇÃO DORES */
        .secao-dores {
          background: var(--azul-superficie);
          padding: 72px 20px;
          border-top: 1px solid var(--azul-borda);
          border-bottom: 1px solid var(--azul-borda);
        }
        .rotulo-secao {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--azul-claro);
          display: block;
          margin-bottom: 12px;
          text-align: center;
        }
        .secao-dores h2 { font-size: clamp(26px, 5vw, 42px); text-align: center; margin-bottom: 10px; }
        .subtitulo-secao {
          text-align: center;
          color: var(--cinza-medio);
          max-width: 520px;
          margin: 0 auto 52px;
          font-size: 16px;
        }
        .grade-dores {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 720px;
          margin: 0 auto;
        }
        @media (min-width: 600px) { .grade-dores { grid-template-columns: 1fr 1fr; } }
        .cartao-dor {
          background: rgba(239,68,68,0.05);
          border: 1px solid rgba(239,68,68,0.18);
          border-radius: var(--raio-card);
          padding: 24px;
          text-align: left;
          transition: border-color 0.3s, transform 0.3s;
        }
        .cartao-dor:hover { border-color: rgba(239,68,68,0.4); transform: translateY(-3px); }
        .icone-dor { font-size: 28px; margin-bottom: 12px; display: block; }
        .cartao-dor h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--branco);
        }
        .cartao-dor p { font-size: 14px; color: var(--cinza-medio); line-height: 1.6; }

        /* SEÇÃO PROBLEMA */
        .secao-problema { padding: 72px 20px; background: var(--azul-fundo); }
        .bloco-citacao {
          border-left: 3px solid var(--azul-destaque);
          padding: 22px 26px;
          background: rgba(59,130,246,0.05);
          border-radius: 0 var(--raio-card) var(--raio-card) 0;
          margin-bottom: 24px;
          font-size: clamp(16px, 2vw, 19px);
          color: var(--cinza-claro);
          line-height: 1.75;
          font-style: italic;
        }
        .bloco-citacao strong { font-style: normal; color: var(--branco); }

        /* SEÇÃO MECANISMO */
        .secao-mecanismo {
          padding: 72px 20px;
          background: var(--azul-superficie);
          border-top: 1px solid var(--azul-borda);
        }
        .grade-comparacao {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 720px;
          margin: 0 auto 56px;
        }
        @media (min-width: 600px) { .grade-comparacao { grid-template-columns: 1fr 1fr; } }
        .caixa-comparacao { border-radius: var(--raio-card); padding: 32px 28px; }
        .caixa-negativa {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.22);
        }
        .caixa-positiva {
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.3);
          box-shadow: 0 0 40px rgba(59,130,246,0.08);
        }
        .titulo-comparacao {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lista-comparacao { list-style: none; display: grid; gap: 14px; }
        .lista-comparacao li {
          font-size: 14px;
          color: var(--cinza-claro);
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }
        .lista-comparacao li span.marcador { flex-shrink: 0; font-size: 15px; margin-top: 1px; }

        /* PILARES */
        .grade-pilares {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 720px;
          margin: 0 auto;
        }
        @media (min-width: 600px) { .grade-pilares { grid-template-columns: repeat(3, 1fr); } }
        .pilar {
          background: var(--azul-fundo);
          border: 1px solid var(--azul-borda);
          border-radius: var(--raio-card);
          padding: 30px 22px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .pilar:hover { border-color: var(--azul-destaque); transform: translateY(-5px); }
        .pilar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--azul-destaque), transparent);
        }
        .numero-pilar {
          font-family: 'Fraunces', serif;
          font-size: 52px;
          color: rgba(59,130,246,0.12);
          line-height: 1;
          margin-bottom: 8px;
          font-weight: 900;
        }
        .pilar h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--azul-claro);
          margin-bottom: 10px;
        }
        .pilar p { font-size: 13px; color: var(--cinza-medio); line-height: 1.65; }

        /* SEÇÃO OFERTA */
        .secao-oferta {
          padding: 72px 20px;
          background: linear-gradient(180deg, var(--azul-fundo) 0%, #060912 100%);
        }
        .grade-itens-oferta {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          max-width: 720px;
          margin: 0 auto 40px;
        }
        .item-oferta {
          background: var(--azul-superficie);
          border: 1px solid var(--azul-borda);
          border-radius: var(--raio-card);
          padding: 18px 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: border-color 0.3s;
        }
        .item-oferta:hover { border-color: var(--azul-destaque); }
        .item-oferta.destaque { border-color: var(--dourado); background: rgba(251,191,36,0.05); }
        .emoji-item { font-size: 26px; flex-shrink: 0; margin-top: 2px; }
        .corpo-item { flex: 1; }
        .corpo-item h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--branco);
          margin-bottom: 4px;
        }
        .corpo-item p { font-size: 13px; color: var(--cinza-medio); line-height: 1.5; }
        .etiqueta-valor {
          font-size: 12px;
          font-weight: 600;
          color: var(--verde);
          margin-top: 6px;
          font-family: 'DM Mono', monospace;
        }

        /* CAIXA PREÇO */
        .caixa-preco {
          max-width: 560px;
          margin: 0 auto;
          background: var(--azul-superficie);
          border: 2px solid rgba(251,191,36,0.45);
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(251,191,36,0.08);
        }
        .caixa-preco::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--dourado-escuro), var(--dourado), var(--dourado-escuro));
        }
        .etiqueta-exclusivo {
          position: absolute;
          top: 0; right: 0;
          background: var(--dourado);
          color: #000;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 0 0 0 12px;
        }
        .valor-riscado { font-size: 14px; color: var(--cinza-medio); text-decoration: line-through; margin-bottom: 4px; }
        .divisor-preco { width: 40px; height: 1px; background: var(--azul-borda); margin: 16px auto; }
        .rotulo-hoje { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--dourado-escuro); margin-bottom: 8px; }
        .preco-parcelado {
          font-family: 'Fraunces', serif;
          font-size: clamp(40px, 9vw, 62px);
          color: var(--dourado);
          line-height: 1;
          margin-bottom: 8px;
        }
        .preco-parcelado sup { font-size: 20px; vertical-align: super; color: var(--cinza-medio); margin-right: 4px; }
        .preco-ou { font-size: 13px; color: var(--cinza-medio); margin-bottom: 6px; }
        .preco-avista { font-size: 20px; font-weight: 700; color: var(--cinza-claro); margin-bottom: 28px; }
        .caixa-preco .btn-principal { display: block; max-width: 100%; font-size: 17px; }

        /* FAQ */
        .secao-faq { padding: 72px 20px; background: var(--azul-fundo); }
        .lista-faq { max-width: 720px; margin: 0 auto; display: grid; gap: 10px; }
        .item-faq {
          background: var(--azul-superficie);
          border: 1px solid var(--azul-borda);
          border-radius: var(--raio-card);
          overflow: hidden;
        }
        .pergunta-faq {
          padding: 20px 24px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          user-select: none;
          color: var(--azul-claro);
          transition: background 0.2s;
        }
        .pergunta-faq:hover { background: rgba(59,130,246,0.05); }
        .pergunta-faq::after {
          content: '+';
          font-size: 22px;
          color: var(--azul-destaque);
          flex-shrink: 0;
          transition: transform 0.3s;
          line-height: 1;
        }
        .item-faq.aberto .pergunta-faq::after { transform: rotate(45deg); }
        .resposta-faq { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .item-faq.aberto .resposta-faq { max-height: 400px; }
        .resposta-faq-interna {
          padding: 16px 24px 24px;
          font-size: 14px;
          color: var(--cinza-medio);
          line-height: 1.75;
          border-top: 1px solid var(--azul-borda);
          margin: 0 24px;
        }

        /* PÚBLICO */
        .secao-publico {
          background: var(--azul-superficie);
          padding: 72px 20px;
          border-top: 1px solid var(--azul-borda);
        }
        .grade-publico { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 720px; margin: 0 auto; }
        @media (min-width: 600px) { .grade-publico { grid-template-columns: 1fr 1fr; } }
        .caixa-publico { border-radius: var(--raio-card); padding: 30px 26px; }
        .publico-sim { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.22); }
        .publico-nao { background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.18); }
        .caixa-publico h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .publico-sim h3 { color: var(--verde); }
        .publico-nao h3 { color: var(--vermelho); }
        .lista-publico { list-style: none; display: grid; gap: 13px; }
        .lista-publico li {
          font-size: 14px;
          color: var(--cinza-claro);
          padding-left: 22px;
          position: relative;
          line-height: 1.55;
        }
        .lista-publico li::before { position: absolute; left: 0; top: 0; font-size: 14px; }
        .publico-sim .lista-publico li::before { content: '✓'; color: var(--verde); }
        .publico-nao .lista-publico li::before { content: '✕'; color: var(--vermelho); }

        /* CTA FINAL */
        .cta-final {
          background: linear-gradient(180deg, #060912 0%, var(--azul-fundo) 100%);
          padding: 88px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-final::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-final h2 { font-size: clamp(28px, 6vw, 50px); max-width: 660px; margin: 0 auto 24px; position: relative; }
        .cta-final p { color: var(--cinza-medio); max-width: 460px; margin: 0 auto 44px; font-size: 17px; position: relative; }
        .cta-final .btn-principal { position: relative; display: inline-block; width: auto; }
        .selo-garantia {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.22);
          border-radius: var(--raio-card);
          padding: 16px 28px;
          margin-top: 32px;
          font-size: 14px;
          color: var(--verde);
          max-width: 440px;
        }
        .icone-garantia { font-size: 30px; flex-shrink: 0; }

        /* RODAPÉ */
        .rodape {
          background: var(--azul-fundo);
          border-top: 1px solid var(--azul-borda);
          padding: 40px 20px;
          text-align: center;
        }
        .rodape img { height: 30px; margin: 0 auto 16px; opacity: 0.45; filter: grayscale(1); display: block; }
        .rodape p { font-size: 12px; color: var(--cinza-escuro); }
        .rodape a { color: var(--cinza-escuro); text-decoration: none; margin: 0 8px; transition: color 0.2s; }
        .rodape a:hover { color: var(--cinza-medio); }
        .credito-agencia { margin-top: 14px; font-size: 11px; color: rgba(100,116,139,0.45); }
        .credito-agencia a { color: rgba(251,191,36,0.45); text-decoration: none; transition: color 0.2s; }
        .credito-agencia a:hover { color: var(--dourado); }

        /* BARRA FLUTUANTE */
        .barra-flutuante {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 1000;
          background: rgba(11,15,26,0.97);
          border-top: 1px solid var(--azul-borda);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          transform: translateY(100%);
          transition: transform 0.4s ease;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
          backdrop-filter: blur(16px);
        }
        .barra-flutuante.visivel { transform: translateY(0); }
        .preco-flutuante { flex: 1; }
        .preco-flutuante small { display: block; font-size: 10px; color: var(--cinza-medio); letter-spacing: 0.06em; text-transform: uppercase; }
        .preco-flutuante strong { font-size: 17px; color: var(--dourado); font-family: 'Fraunces', serif; }
        .btn-flutuante {
          background: var(--verde);
          color: #052e16;
          font-weight: 800;
          font-size: 13px;
          padding: 13px 22px;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-flutuante:hover { background: #4ade80; transform: scale(1.02); }

        /* DELAY */
        .delay { display: none; }
        .delay.delay-visivel {
          display: block;
          animation: entradaSuave 0.7s ease forwards;
        }
        .barra-flutuante.delay-visivel { display: flex; }
        a.btn-principal.delay.delay-visivel,
        .nota-garantia.delay.delay-visivel { display: inline-flex; }
        .nota-garantia.delay.delay-visivel { display: flex; }
        @keyframes entradaSuave {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* REVELAR */
        .revelar { opacity: 0; transform: translateY(30px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .revelar.visivel { opacity: 1; transform: translateY(0); }
        .revelar-delay-1 { transition-delay: 0.1s; }
        .revelar-delay-2 { transition-delay: 0.2s; }
        .revelar-delay-3 { transition-delay: 0.3s; }
        .revelar-delay-4 { transition-delay: 0.4s; }

        @media (max-width: 480px) {
          .hero { padding: 40px 16px 32px; }
          .btn-principal { padding: 17px 20px; }
          .caixa-preco { padding: 28px 18px; }
          .etiqueta-exclusivo { font-size: 9px; padding: 5px 12px; }
        }
      `}</style>

      <div className="sintetiza-page">

        {/* BARRA AVISO */}
        <div className="barra-aviso">
          <span>📺 Assista ao vídeo completo antes de sair desta página</span>
        </div>

        {/* CABEÇALHO */}
        <header className="cabecalho">
          <img
            src="https://sintetizaeducacao.com.br/wp-content/uploads/2021/04/Logo-Sintetiza-Horizontal-Branco.png"
            alt="Sintetiza Educação"
          />
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="etiqueta-metodo revelar">⚡ Método Sintetiza PowerPoint</div>

            <h1 className="revelar revelar-delay-1">
              <span className="destaque-dourado">Ninguém deveria parecer menos competente por causa de um slide ruim.</span><br />
              Aprenda a usar o PowerPoint com estratégia e crie{' '}
              <span className="destaque-dourado">apresentações profissionais que refletem o seu verdadeiro nível.</span>
            </h1>

            <p className="hero-subtitulo revelar revelar-delay-2">
              Em poucas aulas, o Sintetiza ensina como transformar ideias em apresentações claras, organizadas e visualmente profissionais.
            </p>

            <div className="caixa-video revelar revelar-delay-3">
              <div className="proporcao-video">
                <video
                  id="videoVsl"
                  src="https://sintetizaeducacao.com.br/wp-content/uploads/2026/02/VSL-Sintetiza.mp4"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>

            <a href="#oferta" className="btn-principal delay revelar revelar-delay-4">
              SIM! QUERO SER RECONHECIDO →
            </a>

            <div className="nota-garantia delay revelar revelar-delay-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Acesso imediato &nbsp;•&nbsp; 7 dias de garantia &nbsp;•&nbsp; Certificado incluso</span>
            </div>
          </div>
        </section>

        {/* SEÇÃO DORES */}
        <section className="secao-dores delay">
          <div className="container">
            <span className="rotulo-secao">O problema real</span>
            <h2 className="revelar">Você se reconhece em <span className="destaque-azul">alguma dessas situações?</span></h2>
            <p className="subtitulo-secao revelar">São situações reais e muito mais comuns do que parecem.</p>

            <div className="grade-dores">
              <div className="cartao-dor revelar">
                <span className="icone-dor">📱</span>
                <h4>Celulares aparecem durante sua apresentação</h4>
                <p>Você está falando e percebe que a sala está dispersa. Conversas paralelas começam. A reunião vai por água abaixo.</p>
              </div>
              <div className="cartao-dor revelar revelar-delay-1">
                <span className="icone-dor">😶</span>
                <h4>Não percebem o valor do seu trabalho.</h4>
                <p>Você é uma autoridade no tema , mas a forma como você apresenta não comunica isso. O reconhecimento não vem.</p>
              </div>
              <div className="cartao-dor revelar revelar-delay-2">
                <span className="icone-dor">😅</span>
                <h4>Você trava na frente de líderes e diretores</h4>
                <p>Apresentar para o CEO ou a diretoria dá um frio no estômago que parece impossível de controlar.</p>
              </div>
              <div className="cartao-dor revelar revelar-delay-3">
                <span className="icone-dor">🎨</span>
                <h4>Slides que parecem amadores, mesmo com esforço e horas dedicadas.</h4>
                <p>Você dedica horas, mas o resultado final parece genérico, sem identidade e longe do visual que você imagina.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO PROBLEMA */}
        <section className="secao-problema delay">
          <div className="container">
            <span className="rotulo-secao" style={{ textAlign: 'left' }}>Por que isso acontece</span>
            <h2 className="revelar" style={{ marginBottom: '32px' }}>Não é falta de talento. É falta de <span className="destaque-azul">método.</span></h2>

            <div className="bloco-citacao revelar">
              <strong>A faculdade te deu o conhecimento.</strong> <strong>O YouTube te ajuda a se virar.</strong> <strong>A IA promete resolver tudo.</strong>{' '}
              Mas ninguém te ensinou <strong>como juntar tudo isso em uma apresentação que prende, convence e impressiona quem está do outro lado.</strong>
            </div>

            <div className="bloco-citacao revelar">
              Existe uma diferença brutal entre um slide bonito e um slide que <strong>funciona</strong>.
              Entre uma apresentação esquecida em 10 minutos... e uma que faz o diretor virar e perguntar:
              <strong> &quot;Quem é esse profissional?&quot;</strong>
            </div>
          </div>
        </section>

        {/* SEÇÃO MECANISMO */}
        <section className="secao-mecanismo delay">
          <div className="container">
            <span className="rotulo-secao" style={{ textAlign: 'center' }}>O diferencial</span>
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Por que cursos tradicionais <span className="destaque-vermelho">não resolvem</span> isso
            </h2>
            <p className="subtitulo-secao revelar">Eles te ensinam sobre botões. O Sintetiza te ensina a lógica por trás da ferramenta e você resolve qualquer situação.</p>

            <div className="grade-comparacao">
              <div className="caixa-comparacao caixa-negativa revelar">
                <div className="titulo-comparacao destaque-vermelho">
                  <span>✕</span> Ensino Tradicional
                </div>
                <ul className="lista-comparacao">
                  <li><span className="marcador destaque-vermelho">✕</span> 1 a 2 anos de teoria sem prática</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Slides padrão faculdade (poluídos)</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Ninguém presta atenção em você</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Insegurança na hora de apresentar</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Templates genéricos que não comunicam</li>
                </ul>
              </div>
              <div className="caixa-comparacao caixa-positiva revelar revelar-delay-1">
                <div className="titulo-comparacao destaque-azul">
                  <span>★</span> Método Sintetiza
                </div>
                <ul className="lista-comparacao">
                  <li><span className="marcador destaque-verde">✓</span> Resultado já na primeira semana</li>
                  <li><span className="marcador destaque-verde">✓</span> Clareza para transformar ideias em mensagens visuais</li>
                  <li><span className="marcador destaque-verde">✓</span> Uso estratégico do PowerPoint (não só ferramenta)</li>
                  <li><span className="marcador destaque-verde">✓</span> Slides que reforçam sua autoridade</li>
                  <li><span className="marcador destaque-verde">✓</span> Estrutura que funciona em qualquer apresentação</li>
                  <li><span className="marcador destaque-verde">✓</span> Autonomia para criar apresentações profissionais</li>
                </ul>
              </div>
            </div>

            <div className="grade-pilares">
              <div className="pilar revelar">
                <div className="numero-pilar">01</div>
                <h4>Estrutura</h4>
                <p>Como organizar qualquer conteúdo para que faça sentido imediato mesmo que o assunto seja complexo.</p>
              </div>
              <div className="pilar revelar revelar-delay-1">
                <div className="numero-pilar">02</div>
                <h4>Visual com Intenção</h4>
                <p>Slides que guiam o olhar, reforçam sua fala e eliminam as distrações que geram conversas paralelas.</p>
              </div>
              <div className="pilar revelar revelar-delay-2">
                <div className="numero-pilar">03</div>
                <h4>LÓGICA DA APRESENTAÇÃO</h4>
                <p>Como construir uma sequência de slides que conduz o público do começo ao fim.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO OFERTA */}
        <section className="secao-oferta delay" id="oferta">
          <div className="container">
            <span className="rotulo-secao" style={{ textAlign: 'center' }}>Tudo que você leva hoje</span>
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Sua Transformação <span className="destaque-dourado">Começa Agora</span>
            </h2>
            <p className="subtitulo-secao revelar">Um ecossistema completo para transformar sua comunicação profissional.</p>

            <div className="grade-itens-oferta">
              <div className="item-oferta destaque revelar">
                <span className="emoji-item">🎓</span>
                <div className="corpo-item">
                  <h4>CURSO PRINCIPAL — PowerPoint Profissional do Zero ao Avançado</h4>
                  <p>Domine a ferramenta mais usada no mundo corporativo com profundidade real.</p>
                  <span className="etiqueta-valor">Valor: R$ 997</span>
                </div>
              </div>
              <div className="item-oferta revelar">
                <span className="emoji-item">📁</span>
                <div className="corpo-item">
                  <h4>Biblioteca de Arquivos para Acompanhar as Aulas</h4>
                  <p>Pack completo de arquivos prontos para você praticar junto com cada aula do curso.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
              <div className="item-oferta revelar revelar-delay-1">
                <span className="emoji-item">🎨</span>
                <div className="corpo-item">
                  <h4>Guia de Paletas Profissionais para Apresentações</h4>
                  <p>Material com combinações de cores estratégicas para slides que transmitem credibilidade.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
              <div className="item-oferta revelar revelar-delay-2">
                <span className="emoji-item">🔤</span>
                <div className="corpo-item">
                  <h4>Guia de Combinação de Tipografia para Apresentações</h4>
                  <p>Aprenda a escolher e combinar fontes que reforçam sua autoridade visual.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
              <div className="item-oferta revelar revelar-delay-3">
                <span className="emoji-item">🔍</span>
                <div className="corpo-item">
                  <h4>Análise Profissional da Sua Apresentação</h4>
                  <p>Envie sua apresentação e receba feedback da equipe Sintetiza via Chat da Aula.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
              <div className="item-oferta revelar revelar-delay-1">
                <span className="emoji-item">📐</span>
                <div className="corpo-item">
                  <h4>Framework de Estruturação de Apresentações</h4>
                  <p>Planejamento de roteiro para montar o raciocínio antes de abrir o PowerPoint.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
              <div className="item-oferta revelar revelar-delay-2">
                <span className="emoji-item">✅</span>
                <div className="corpo-item">
                  <h4>Checklist de Apresentações Profissionais</h4>
                  <p>Lista completa para validar cada apresentação antes de ir ao ar.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
              <div className="item-oferta revelar revelar-delay-3">
                <span className="emoji-item">🏅</span>
                <div className="corpo-item">
                  <h4>Certificado Profissional Sintetiza</h4>
                  <p>Para colocar no LinkedIn e currículo — sinaliza autoridade de mercado.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
            </div>

            <div className="caixa-preco revelar">
              <div className="etiqueta-exclusivo">Oferta Exclusiva</div>
              <p className="valor-riscado">De R$ 1.335</p>
              <div className="divisor-preco"></div>
              <p className="rotulo-hoje">Hoje, por apenas</p>
              <div className="preco-parcelado">
                <sup>12x de</sup> R$49
              </div>
              <p className="preco-ou">ou</p>
              <p className="preco-avista">R$ 497 à vista</p>
              <a href="SUA_URL_DE_CHECKOUT" className="btn-principal">
                QUERO MINHA VAGA AGORA →
              </a>
              <div className="nota-garantia" style={{ marginTop: '20px', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Pagamento 100% seguro &nbsp;•&nbsp; Acesso imediato</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO FAQ */}
        <section className="secao-faq delay">
          <div className="container">
            <span className="rotulo-secao" style={{ textAlign: 'center' }}>Suas dúvidas</span>
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Respostas <span className="destaque-azul">honestas</span> para as dúvidas reais
            </h2>
            <p className="subtitulo-secao revelar">Sem rodeios. Sem enrolação.</p>

            <div className="lista-faq">
              {[
                {
                  p: 'Preciso saber design para fazer o curso?',
                  r: 'Não! O Sintetiza é focado em processos e ferramentas práticas. Se você sabe clicar e arrastar, você já consegue resultados incríveis. O método te guia passo a passo — sem exigir nenhum background criativo.',
                },
                {
                  p: 'Não tenho talento para design. Conseguirei fazer isso?',
                  r: 'Design de apresentação não é arte — é comunicação visual com regras claras. O método Sintetiza te ensina exatamente quais regras aplicar, em qual ordem, em qualquer situação. O talento vem depois da técnica.',
                },
                {
                  p: 'Não tenho tempo. Minha rotina já está cheia.',
                  r: 'O curso foi desenhado para ser consumido em blocos curtos — com 20 a 30 minutos por dia você já progride. E o mais importante: você começa a aplicar imediatamente. Cada minuto investido já gera resultado na semana seguinte.',
                },
                {
                  p: 'Minha empresa usa Google Slides. Funciona para mim?',
                  r: 'Os princípios do método — estrutura, hierarquia visual, ritmo narrativo — funcionam em qualquer ferramenta. O PowerPoint é o ambiente de prática, mas o que você aprende se transfere diretamente para qualquer plataforma.',
                },
                {
                  p: 'E se eu não gostar? Perco meu dinheiro?',
                  r: 'Não. Você tem 7 dias de garantia incondicional. Se por qualquer motivo você sentir que não era para você, basta pedir o reembolso — devolvemos 100% do valor. Sem burocracia, sem questionamento. O risco é zero.',
                },
              ].map((faq, i) => (
                <div className="item-faq revelar" key={i}>
                  <div className="pergunta-faq">{faq.p}</div>
                  <div className="resposta-faq">
                    <div className="resposta-faq-interna">{faq.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO PÚBLICO */}
        <section className="secao-publico delay">
          <div className="container">
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '48px' }}>
              Para <span className="destaque-verde">quem é</span> — e para quem <span className="destaque-vermelho">não é</span>
            </h2>
            <div className="grade-publico">
              <div className="caixa-publico publico-sim revelar">
                <h3>✅ É para você se...</h3>
                <ul className="lista-publico">
                  <li>Você é profissional corporativo que precisa apresentar resultados e quer ser levado a sério</li>
                  <li>Você é gestor, coordenador ou líder que quer transmitir autoridade e clareza</li>
                  <li>Você é analista que domina o conteúdo, mas trava na hora de comunicar com impacto</li>
                  <li>Você é consultor ou empreendedor que apresenta para clientes e quer fechar mais</li>
                  <li>Você quer se destacar e sabe que comunicação é a habilidade mais subestimada</li>
                </ul>
              </div>
              <div className="caixa-publico publico-nao revelar revelar-delay-1">
                <h3>❌ Não é para você se...</h3>
                <ul className="lista-publico">
                  <li>Você quer aprender design gráfico avançado e se tornar um profissional de criação</li>
                  <li>Você busca curso teórico sem compromisso com aplicação prática imediata</li>
                  <li>Você acredita que apresentação não faz diferença na carreira</li>
                  <li>Você não pretende implementar o que aprender — prefere colecionar cursos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="cta-final delay">
          <div className="container">
            <h2 className="revelar">
              A próxima apresentação vai ser <em style={{ fontStyle: 'italic', color: 'var(--azul-claro)' }}>diferente</em> <br />
              ou vai ser igual à última.
            </h2>
            <p className="revelar">A escolha é sua. O método já está pronto. O que falta é a decisão.</p>

            <a href="#oferta" className="btn-principal revelar" style={{ display: 'inline-block', width: 'auto' }}>
              GARANTIR MINHA VAGA AGORA →
            </a>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="selo-garantia revelar">
                <span className="icone-garantia">🛡️</span>
                <span>
                  <strong style={{ color: 'var(--branco)' }}>Garantia Blindada de 7 dias.</strong><br />
                  Se não gostar, devolvemos 100% do valor. Sem perguntas.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className="rodape">
          <img
            src="https://sintetizaeducacao.com.br/wp-content/uploads/2021/04/Logo-Sintetiza-Horizontal-Branco.png"
            alt="Sintetiza Educação"
          />
          <p>© 2026 Sintetiza Educação — Todos os direitos reservados.</p>
          <p style={{ marginTop: '6px' }}>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </p>
          <p className="credito-agencia">
            Desenvolvido por <a href="https://buenomidias.com.br" target="_blank" rel="noopener noreferrer">BuenoMídias</a>
          </p>
        </footer>

        {/* BARRA FLUTUANTE */}
        <div className="barra-flutuante delay" id="barraFlutuante">
          <div className="preco-flutuante">
            <small>Oferta especial</small>
            <strong>12x de R$49</strong>
          </div>
          <a href="#oferta" className="btn-flutuante">Garantir Vaga →</a>
        </div>

      </div>
    </>
  );
}
