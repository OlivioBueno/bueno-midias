'use client';
import { useEffect } from 'react';

export default function SintetizaModelo03() {
  useEffect(() => {
    /* ── ANIMAÇÃO DE ENTRADA AO ROLAR ── */
    const reveals = document.querySelectorAll('.s3-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('s3-visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => {
      const dentroDe = el.closest('.s3-delay');
      const elEhDelay = el.classList.contains('s3-delay');
      if (!dentroDe && !elEhDelay) revealObserver.observe(el);
    });

    /* ── ACORDEÃO FAQ ── */
    const perguntas = document.querySelectorAll('.s3-faq-pergunta');
    const handleFaq = (e) => {
      const item = e.currentTarget.parentElement;
      const estaAberto = item.classList.contains('s3-aberto');
      document.querySelectorAll('.s3-faq-item').forEach(i => i.classList.remove('s3-aberto'));
      if (!estaAberto) item.classList.add('s3-aberto');
    };
    perguntas.forEach(q => q.addEventListener('click', handleFaq));

    /* ── BARRA FLUTUANTE ── */
    const barraFlutuante = document.getElementById('s3StickyBar');
    const onScroll = () => {
      if (!barraFlutuante || !barraFlutuante.classList.contains('s3-delay-visible')) return;
      if (window.scrollY > 600) barraFlutuante.classList.add('s3-bar-visible');
      else barraFlutuante.classList.remove('s3-bar-visible');
    };
    window.addEventListener('scroll', onScroll);

    /* ── SISTEMA DE DELAY DO VÍDEO ── */
    const DELAY_SECONDS = 180; /* ← ALTERE AQUI */
    const delayEls = document.querySelectorAll('.s3-delay');
    let delayTriggered = false;

    function liberarConteudo() {
      if (delayTriggered) return;
      delayTriggered = true;
      delayEls.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('s3-delay-visible');
          el.querySelectorAll('.s3-reveal').forEach(r => {
            if (!r.classList.contains('s3-visible')) revealObserver.observe(r);
          });
          if (el.classList.contains('s3-reveal') && !el.classList.contains('s3-visible')) {
            revealObserver.observe(el);
          }
        }, i * 120);
      });
    }

    if (DELAY_SECONDS <= 0) {
      liberarConteudo();
    } else {
      const video = document.getElementById('s3Video');
      if (video) {
        const onTimeUpdate = () => {
          if (video.currentTime >= DELAY_SECONDS) liberarConteudo();
        };
        video.addEventListener('timeupdate', onTimeUpdate);
        const timer = setTimeout(liberarConteudo, DELAY_SECONDS * 1000 + 5000);
        return () => {
          video.removeEventListener('timeupdate', onTimeUpdate);
          clearTimeout(timer);
          window.removeEventListener('scroll', onScroll);
          perguntas.forEach(q => q.removeEventListener('click', handleFaq));
        };
      } else {
        liberarConteudo();
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      perguntas.forEach(q => q.removeEventListener('click', handleFaq));
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        html { scroll-behavior: smooth; }
        .s3 *, .s3 *::before, .s3 *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s3 {
          --azul-fundo:   #04203A;
          --azul-medio:   #084783;
          --ambar:        #FFB400;
          --ambar-claro:  #FFD166;
          --ambar-escuro: #CC8F00;
          --branco:       #F4F7FF;
          --cinza-claro:  #B8C9E0;
          --cinza-medio:  #6B85A0;
          --verde:        #2ECC8A;
          --vermelho:     #FF5757;
          --borda-sutil:  rgba(255,180,0,0.14);
          --borda-azul:   rgba(8,71,131,0.7);
          --raio:         14px;
          --raio-lg:      22px;
          --sombra-ambar: 0 0 48px rgba(255,180,0,0.22);
          --sombra-azul:  0 0 60px rgba(4,32,58,0.8);
          background-color: var(--azul-fundo);
          color: var(--branco);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.7;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
        }

        .s3::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .s3 h1, .s3 h2, .s3 h3, .s3 h4 {
          font-family: 'Fraunces', serif;
          line-height: 1.1;
          letter-spacing: -0.025em;
        }

        .s3 .ambar        { color: var(--ambar); }
        .s3 .ambar-italic { color: var(--ambar-claro); font-style: italic; }
        .s3 .muted        { color: var(--cinza-medio); }
        .s3 .verde        { color: var(--verde); }
        .s3 .vermelho     { color: var(--vermelho); }
        .s3 .branco       { color: var(--branco); }

        .s3 .container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .s3 section { position: relative; z-index: 1; }

        /* ── BARRA AVISO ── */
        .s3 .barra-aviso {
          background: var(--azul-medio);
          border-bottom: 1px solid var(--borda-sutil);
          padding: 11px 20px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--ambar);
          position: relative;
          z-index: 10;
        }
        .s3 .barra-aviso span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          animation: s3-pisca-aviso 2.5s ease-in-out infinite;
        }
        @keyframes s3-pisca-aviso {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }

        /* ── CABEÇALHO ── */
        .s3 .cabecalho {
          background: rgba(4,32,58,0.96);
          border-bottom: 1px solid var(--borda-sutil);
          padding: 18px 20px;
          display: flex;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(16px);
        }
        .s3 .cabecalho img { height: 34px; opacity: 0.95; }
        .s3 .cabecalho::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 300px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--ambar), transparent);
          opacity: 0.4;
        }

        /* ── HERO ── */
        .s3 .hero {
          padding: 64px 20px 52px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .s3 .hero::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse at center, rgba(8,71,131,0.45) 0%, transparent 70%);
          pointer-events: none;
        }
        .s3 .hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 480px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--ambar), transparent);
          opacity: 0.35;
        }
        .s3 .etiqueta-metodo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,180,0,0.1);
          border: 1px solid var(--borda-sutil);
          color: var(--ambar);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 100px;
          margin-bottom: 32px;
        }
        .s3 .hero h1 {
          font-size: clamp(30px, 6.5vw, 58px);
          color: var(--branco);
          max-width: 740px;
          margin: 0 auto 22px;
        }
        .s3 .hero-subtitulo {
          font-size: clamp(15px, 2vw, 18px);
          color: var(--cinza-claro);
          max-width: 520px;
          margin: 0 auto 44px;
          line-height: 1.65;
        }

        /* ── CAIXA VÍDEO ── */
        .s3 .caixa-video {
          max-width: 700px;
          margin: 0 auto 44px;
          border-radius: var(--raio-lg);
          overflow: hidden;
          border: 1px solid var(--borda-sutil);
          background: #020e1c;
          box-shadow: var(--sombra-ambar), 0 32px 80px rgba(0,0,0,0.7);
          position: relative;
        }
        .s3 .caixa-video::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--ambar), var(--ambar-claro), var(--ambar), transparent);
          z-index: 2;
        }
        .s3 .proporcao-video {
          position: relative;
          padding-bottom: 56.25%;
          background: #020e1c;
        }
        .s3 .proporcao-video video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #020e1c;
        }

        /* ── BOTÃO CTA ── */
        .s3 .btn-cta {
          display: inline-block;
          background: linear-gradient(135deg, var(--ambar) 0%, var(--ambar-claro) 55%, var(--ambar) 100%);
          background-size: 200% auto;
          color: #03111F;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(15px, 2.5vw, 18px);
          letter-spacing: 0.02em;
          padding: 20px 44px;
          border-radius: var(--raio);
          text-decoration: none;
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 520px;
          text-align: center;
          transition: background-position 0.4s ease, transform 0.25s ease, box-shadow 0.3s ease;
          box-shadow: var(--sombra-ambar);
          animation: s3-pulsa-cta 3s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }
        @keyframes s3-pulsa-cta {
          0%, 100% { box-shadow: 0 0 40px rgba(255,180,0,0.3); }
          50%       { box-shadow: 0 0 60px rgba(255,180,0,0.55); }
        }
        .s3 .btn-cta:hover {
          background-position: right center;
          transform: translateY(-3px) scale(1.015);
        }
        .s3 .nota-garantia {
          margin-top: 14px;
          font-size: 12px;
          color: var(--cinza-medio);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .s3 .nota-garantia svg { flex-shrink: 0; }

        /* ── SEÇÃO DORES ── */
        .s3 .secao-dores {
          background: var(--azul-medio);
          padding: 76px 20px;
          border-top: 1px solid var(--borda-sutil);
          border-bottom: 1px solid var(--borda-sutil);
        }
        .s3 .rotulo {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ambar);
          display: block;
          margin-bottom: 12px;
          opacity: 0.75;
        }
        .s3 .secao-dores h2 {
          font-size: clamp(26px, 5vw, 44px);
          text-align: center;
          margin-bottom: 12px;
        }
        .s3 .subtitulo-secao {
          text-align: center;
          color: var(--cinza-medio);
          max-width: 500px;
          margin: 0 auto 52px;
          font-size: 16px;
        }
        .s3 .grade-dores {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 700px;
          margin: 0 auto;
        }
        @media (min-width: 600px) {
          .s3 .grade-dores { grid-template-columns: 1fr 1fr; }
        }
        .s3 .cartao-dor {
          background: rgba(4,32,58,0.6);
          border: 1px solid rgba(255,87,87,0.18);
          border-radius: var(--raio);
          padding: 26px;
          text-align: left;
          transition: border-color 0.3s, transform 0.3s;
        }
        .s3 .cartao-dor:hover { border-color: rgba(255,87,87,0.4); transform: translateY(-4px); }
        .s3 .icone-dor { font-size: 30px; margin-bottom: 14px; display: block; }
        .s3 .cartao-dor h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--branco);
        }
        .s3 .cartao-dor p { font-size: 14px; color: var(--cinza-medio); line-height: 1.6; }

        /* ── SEÇÃO PROBLEMA ── */
        .s3 .secao-problema { padding: 76px 20px; background: var(--azul-fundo); }
        .s3 .bloco-citacao {
          border-left: 3px solid var(--ambar);
          padding: 22px 28px;
          background: rgba(8,71,131,0.22);
          border-radius: 0 var(--raio) var(--raio) 0;
          margin-bottom: 22px;
          font-size: clamp(16px, 2vw, 19px);
          color: var(--cinza-claro);
          line-height: 1.75;
          font-style: italic;
        }
        .s3 .bloco-citacao strong { font-style: normal; color: var(--branco); }

        /* ── SEÇÃO MECANISMO ── */
        .s3 .secao-mecanismo {
          padding: 76px 20px;
          background: var(--azul-medio);
          border-top: 1px solid var(--borda-sutil);
          border-bottom: 1px solid var(--borda-sutil);
        }
        .s3 .secao-mecanismo h2 {
          font-size: clamp(26px, 5vw, 44px);
          text-align: center;
          margin-bottom: 12px;
        }
        .s3 .tabela-comparacao {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: var(--raio);
          overflow: hidden;
          margin-bottom: 52px;
          font-size: 14px;
        }
        .s3 .tabela-comparacao thead { background: rgba(4,32,58,0.8); }
        .s3 .tabela-comparacao th {
          padding: 14px 16px;
          text-align: center;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          color: var(--cinza-medio);
        }
        .s3 .tabela-comparacao th:last-child { color: var(--ambar); background: rgba(255,180,0,0.08); }
        .s3 .tabela-comparacao td {
          padding: 13px 16px;
          border-top: 1px solid rgba(255,255,255,0.04);
          text-align: center;
          vertical-align: middle;
          background: rgba(4,32,58,0.4);
        }
        .s3 .tabela-comparacao td:first-child { text-align: left; color: var(--cinza-medio); font-size: 13px; }
        .s3 .tabela-comparacao td:last-child { background: rgba(255,180,0,0.05); color: var(--ambar-claro); font-weight: 600; }
        .s3 .tabela-comparacao tr:nth-child(even) td { background: rgba(8,71,131,0.2); }
        .s3 .tabela-comparacao tr:nth-child(even) td:last-child { background: rgba(255,180,0,0.08); }
        .s3 .icone-x     { color: var(--vermelho); font-size: 17px; }
        .s3 .icone-check { color: var(--verde);    font-size: 17px; }
        .s3 .grade-pilares {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          max-width: 700px;
          margin: 0 auto;
        }
        @media (min-width: 600px) {
          .s3 .grade-pilares { grid-template-columns: repeat(3, 1fr); }
        }
        .s3 .pilar {
          background: var(--azul-fundo);
          border: 1px solid var(--borda-sutil);
          border-radius: var(--raio);
          padding: 30px 22px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .s3 .pilar:hover { border-color: var(--ambar); transform: translateY(-5px); }
        .s3 .pilar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--ambar), transparent);
          opacity: 0.6;
        }
        .s3 .numero-pilar {
          font-family: 'Fraunces', serif;
          font-size: 54px;
          color: rgba(255,180,0,0.1);
          line-height: 1;
          margin-bottom: 8px;
          font-weight: 900;
        }
        .s3 .pilar h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ambar);
          margin-bottom: 10px;
        }
        .s3 .pilar p { font-size: 13px; color: var(--cinza-medio); line-height: 1.65; }

        /* ── SEÇÃO OFERTA ── */
        .s3 .secao-oferta { padding: 76px 20px; background: var(--azul-fundo); }
        .s3 .secao-oferta h2 { font-size: clamp(28px, 5vw, 46px); text-align: center; margin-bottom: 10px; }
        .s3 .grade-itens {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          max-width: 700px;
          margin: 0 auto 40px;
        }
        .s3 .item-oferta {
          background: var(--azul-medio);
          border: 1px solid var(--borda-azul);
          border-radius: var(--raio);
          padding: 18px 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: border-color 0.3s, transform 0.25s;
        }
        .s3 .item-oferta:hover { border-color: var(--borda-sutil); transform: translateX(4px); }
        .s3 .item-oferta.destaque { border-color: var(--ambar); background: rgba(255,180,0,0.06); }
        .s3 .emoji-item { font-size: 26px; flex-shrink: 0; margin-top: 2px; }
        .s3 .corpo-item { flex: 1; }
        .s3 .corpo-item h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--branco);
          margin-bottom: 4px;
        }
        .s3 .corpo-item p { font-size: 13px; color: var(--cinza-medio); line-height: 1.5; }
        .s3 .etiqueta-valor {
          font-size: 12px;
          font-weight: 600;
          color: var(--verde);
          margin-top: 6px;
          font-family: 'DM Mono', monospace;
        }

        /* ── CAIXA PREÇO ── */
        .s3 .caixa-preco {
          max-width: 540px;
          margin: 0 auto;
          background: var(--azul-medio);
          border: 2px solid var(--ambar);
          border-radius: var(--raio-lg);
          padding: 44px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: var(--sombra-ambar);
        }
        .s3 .caixa-preco::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--ambar-escuro), var(--ambar-claro), var(--ambar-escuro));
        }
        .s3 .caixa-preco::after {
          content: '';
          position: absolute;
          top: -40px; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 200px;
          background: radial-gradient(ellipse, rgba(255,180,0,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .s3 .etiqueta-exclusivo {
          position: absolute;
          top: 0; right: 0;
          background: var(--ambar);
          color: #03111F;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 7px 18px;
          border-radius: 0 0 0 12px;
        }
        .s3 .valor-riscado { font-size: 15px; color: var(--cinza-medio); text-decoration: line-through; margin-bottom: 4px; }
        .s3 .divisor-preco { width: 40px; height: 1px; background: var(--borda-sutil); margin: 16px auto; }
        .s3 .rotulo-hoje {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ambar-escuro);
          margin-bottom: 8px;
          opacity: 0.8;
        }
        .s3 .preco-principal {
          font-family: 'Fraunces', serif;
          font-size: clamp(44px, 10vw, 68px);
          color: var(--ambar);
          line-height: 1;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .s3 .preco-principal sup { font-size: 22px; vertical-align: super; color: var(--cinza-medio); margin-right: 4px; }
        .s3 .preco-ou { font-size: 13px; color: var(--cinza-medio); margin-bottom: 6px; position: relative; z-index: 1; }
        .s3 .preco-avista { font-size: 20px; font-weight: 700; color: var(--cinza-claro); margin-bottom: 30px; position: relative; z-index: 1; }
        .s3 .caixa-preco .btn-cta { display: block; max-width: 100%; position: relative; z-index: 1; }

        /* ── SEÇÃO FAQ ── */
        .s3 .secao-faq {
          padding: 76px 20px;
          background: var(--azul-medio);
          border-top: 1px solid var(--borda-sutil);
        }
        .s3 .secao-faq h2 { font-size: clamp(26px, 5vw, 44px); text-align: center; margin-bottom: 10px; }
        .s3 .lista-faq { max-width: 700px; margin: 0 auto; display: grid; gap: 10px; }
        .s3 .s3-faq-item {
          background: rgba(4,32,58,0.55);
          border: 1px solid var(--borda-sutil);
          border-radius: var(--raio);
          overflow: hidden;
        }
        .s3 .s3-faq-pergunta {
          padding: 20px 24px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          user-select: none;
          color: var(--branco);
          transition: background 0.2s;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .s3 .s3-faq-pergunta:hover { background: rgba(255,180,0,0.05); }
        .s3 .s3-faq-pergunta::after {
          content: '+';
          font-size: 22px;
          color: var(--ambar);
          flex-shrink: 0;
          transition: transform 0.3s;
          line-height: 1;
        }
        .s3 .s3-faq-item.s3-aberto .s3-faq-pergunta::after { transform: rotate(45deg); }
        .s3 .s3-faq-resposta { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .s3 .s3-faq-item.s3-aberto .s3-faq-resposta { max-height: 400px; }
        .s3 .s3-faq-resposta-interna {
          padding: 16px 24px 24px;
          margin: 0 24px;
          font-size: 14px;
          color: var(--cinza-medio);
          line-height: 1.75;
          border-top: 1px solid var(--borda-sutil);
        }

        /* ── SEÇÃO PÚBLICO ── */
        .s3 .secao-publico {
          padding: 76px 20px;
          background: var(--azul-fundo);
          border-top: 1px solid var(--borda-sutil);
        }
        .s3 .secao-publico h2 { font-size: clamp(26px, 5vw, 44px); text-align: center; margin-bottom: 48px; }
        .s3 .grade-publico { display: grid; grid-template-columns: 1fr; gap: 22px; max-width: 700px; margin: 0 auto; }
        @media (min-width: 600px) {
          .s3 .grade-publico { grid-template-columns: 1fr 1fr; }
        }
        .s3 .caixa-publico { border-radius: var(--raio); padding: 30px 26px; }
        .s3 .publico-sim { background: rgba(46,204,138,0.06); border: 1px solid rgba(46,204,138,0.22); }
        .s3 .publico-nao { background: rgba(255,87,87,0.05); border: 1px solid rgba(255,87,87,0.18); }
        .s3 .caixa-publico h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .s3 .publico-sim h3 { color: var(--verde); }
        .s3 .publico-nao h3 { color: var(--vermelho); }
        .s3 .lista-publico { list-style: none; display: grid; gap: 13px; }
        .s3 .lista-publico li {
          font-size: 14px;
          color: var(--cinza-claro);
          padding-left: 22px;
          position: relative;
          line-height: 1.55;
        }
        .s3 .lista-publico li::before { position: absolute; left: 0; top: 0; font-size: 14px; }
        .s3 .publico-sim .lista-publico li::before { content: '✓'; color: var(--verde); }
        .s3 .publico-nao .lista-publico li::before { content: '✕'; color: var(--vermelho); }

        /* ── CTA FINAL ── */
        .s3 .cta-final {
          padding: 92px 20px;
          text-align: center;
          background: var(--azul-medio);
          border-top: 1px solid var(--borda-sutil);
          position: relative;
          overflow: hidden;
        }
        .s3 .cta-final::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(255,180,0,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .s3 .cta-final h2 { font-size: clamp(28px, 6vw, 52px); max-width: 660px; margin: 0 auto 24px; position: relative; }
        .s3 .cta-final p { color: var(--cinza-medio); max-width: 460px; margin: 0 auto 46px; font-size: 17px; position: relative; }
        .s3 .cta-final .btn-cta { display: inline-block; width: auto; position: relative; }
        .s3 .selo-garantia {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: rgba(46,204,138,0.07);
          border: 1px solid rgba(46,204,138,0.22);
          border-radius: var(--raio);
          padding: 16px 28px;
          margin-top: 32px;
          font-size: 14px;
          color: var(--verde);
          max-width: 440px;
        }
        .s3 .icone-garantia { font-size: 30px; flex-shrink: 0; }

        /* ── RODAPÉ ── */
        .s3 .rodape {
          background: var(--azul-fundo);
          border-top: 1px solid var(--borda-sutil);
          padding: 40px 20px;
          text-align: center;
        }
        .s3 .rodape img { height: 28px; margin: 0 auto 16px; opacity: 0.4; filter: grayscale(1); display: block; }
        .s3 .rodape p { font-size: 12px; color: #2d4a63; }
        .s3 .rodape a { color: #2d4a63; text-decoration: none; margin: 0 8px; transition: color 0.2s; }
        .s3 .rodape a:hover { color: var(--cinza-medio); }
        .s3 .credito { margin-top: 14px; font-size: 11px; color: rgba(107,133,160,0.4); }
        .s3 .credito a { color: rgba(255,180,0,0.4); text-decoration: none; transition: color 0.2s; }
        .s3 .credito a:hover { color: var(--ambar); }

        /* ── BARRA FLUTUANTE ── */
        .s3 .barra-flutuante {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 1000;
          background: rgba(4,32,58,0.97);
          border-top: 1px solid var(--borda-sutil);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          transform: translateY(100%);
          transition: transform 0.4s ease;
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6);
          backdrop-filter: blur(18px);
        }
        .s3 .barra-flutuante.s3-bar-visible { transform: translateY(0); }
        .s3 .preco-flutuante { flex: 1; }
        .s3 .preco-flutuante small { display: block; font-size: 10px; color: var(--cinza-medio); letter-spacing: 0.07em; text-transform: uppercase; font-family: 'DM Mono', monospace; }
        .s3 .preco-flutuante strong { font-size: 18px; color: var(--ambar); font-family: 'Fraunces', serif; }
        .s3 .btn-flutuante {
          background: var(--ambar);
          color: #03111F;
          font-weight: 800;
          font-size: 13px;
          padding: 13px 22px;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .s3 .btn-flutuante:hover { background: var(--ambar-claro); transform: scale(1.03); }

        /* ── SISTEMA DE DELAY ── */
        .s3 .s3-delay { display: none; }
        .s3 .s3-delay.s3-delay-visible { display: block; animation: s3-entradaSuave 0.75s ease forwards; }
        .s3 .barra-flutuante.s3-delay-visible { display: flex; }
        .s3 a.btn-cta.s3-delay.s3-delay-visible { display: inline-block; }
        .s3 .nota-garantia.s3-delay.s3-delay-visible { display: flex; }
        @keyframes s3-entradaSuave {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── ANIMAÇÕES DE REVEAL ── */
        .s3 .s3-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .s3 .s3-reveal.s3-visible { opacity: 1; transform: translateY(0); }
        .s3 .s3-reveal-d1 { transition-delay: 0.1s; }
        .s3 .s3-reveal-d2 { transition-delay: 0.2s; }
        .s3 .s3-reveal-d3 { transition-delay: 0.3s; }
        .s3 .s3-reveal-d4 { transition-delay: 0.4s; }

        @media (max-width: 480px) {
          .s3 .hero { padding: 44px 16px 36px; }
          .s3 .btn-cta { padding: 17px 20px; }
          .s3 .caixa-preco { padding: 30px 18px; }
          .s3 .etiqueta-exclusivo { font-size: 9px; padding: 5px 12px; }
        }
      `}</style>

      <div className="s3">

        {/* BARRA SUPERIOR DE AVISO */}
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
            <div className="etiqueta-metodo s3-reveal">
              ⚡ Método Sintetiza PowerPoint
            </div>
            <h1 className="s3-reveal s3-reveal-d1">
              Chega de ser o &quot;fundo musical&quot; das reuniões.<br />
              Aprenda a prender <span className="ambar-italic">CEOs e Diretores</span> em cada slide.
            </h1>
            <p className="hero-subtitulo s3-reveal s3-reveal-d2">
              O método prático para transformar slides ignorados em apresentações
              que constroem autoridade — e fazem o seu trabalho ser notado.
            </p>
            <div className="caixa-video s3-reveal s3-reveal-d3">
              <div className="proporcao-video">
                <video
                  id="s3Video"
                  src="https://sintetizaeducacao.com.br/wp-content/uploads/2026/02/VSL-Sintetiza.mp4"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
            <a href="#oferta" className="btn-cta s3-delay s3-reveal s3-reveal-d4">
              SIM! QUERO SER RECONHECIDO →
            </a>
            <div className="nota-garantia s3-delay s3-reveal s3-reveal-d4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2ECC8A" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Acesso imediato &nbsp;•&nbsp; 7 dias de garantia &nbsp;•&nbsp; Certificado incluso</span>
            </div>
          </div>
        </section>

        {/* SEÇÃO DORES */}
        <section className="secao-dores s3-delay">
          <div className="container">
            <span className="rotulo" style={{textAlign:'center',display:'block'}}>O problema real</span>
            <h2 className="s3-reveal">Você se reconhece em <span className="ambar">alguma dessas situações?</span></h2>
            <p className="subtitulo-secao s3-reveal">São situações reais — e muito mais comuns do que parecem.</p>
            <div className="grade-dores">
              <div className="cartao-dor s3-reveal">
                <span className="icone-dor">📱</span>
                <h4>Celulares aparecem durante sua apresentação</h4>
                <p>Você está falando e percebe que a sala está dispersa. Conversas paralelas começam. A reunião vai por água abaixo.</p>
              </div>
              <div className="cartao-dor s3-reveal s3-reveal-d1">
                <span className="icone-dor">😶</span>
                <h4>Seu trabalho vale mais do que percebem</h4>
                <p>A entrega é excelente, mas a forma como você apresenta não comunica isso. O reconhecimento não vem.</p>
              </div>
              <div className="cartao-dor s3-reveal s3-reveal-d2">
                <span className="icone-dor">😅</span>
                <h4>Você trava na frente de líderes e diretores</h4>
                <p>Apresentar para o CEO ou a diretoria dá um frio no estômago que parece impossível de controlar.</p>
              </div>
              <div className="cartao-dor s3-reveal s3-reveal-d3">
                <span className="icone-dor">🎨</span>
                <h4>Slides que parecem amadores — mesmo com esforço</h4>
                <p>Você dedica horas, mas o resultado final parece genérico, sem identidade e longe do visual que imagina.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO PROBLEMA REAL */}
        <section className="secao-problema s3-delay">
          <div className="container">
            <span className="rotulo">Por que isso acontece</span>
            <h2 className="s3-reveal" style={{marginBottom:'32px'}}>
              Não é falta de talento.<br />É falta de <span className="ambar">método.</span>
            </h2>
            <div className="bloco-citacao s3-reveal">
              A faculdade te ensinou teoria. O YouTube te ensinou a formatar slide. O Canva te ensinou a deixar bonito.
              Mas <strong>ninguém te ensinou a apresentar de um jeito que prende, convence e impressiona</strong> quem está do outro lado.
            </div>
            <div className="bloco-citacao s3-reveal">
              Existe uma diferença brutal entre um slide bonito e um slide que <strong>funciona</strong>.
              Entre uma apresentação esquecida em 10 minutos... e uma que faz o diretor virar e perguntar:
              <strong>&quot;Quem é esse profissional?&quot;</strong>
            </div>
          </div>
        </section>

        {/* SEÇÃO MECANISMO */}
        <section className="secao-mecanismo s3-delay">
          <div className="container">
            <span className="rotulo" style={{textAlign:'center',display:'block'}}>O diferencial</span>
            <h2 className="s3-reveal">
              Por que cursos tradicionais <span className="vermelho">não resolvem</span> isso
            </h2>
            <p className="subtitulo-secao s3-reveal">Eles te ensinam o botão. O Sintetiza te ensina o porquê.</p>
            <div style={{overflowX:'auto',marginBottom:'52px'}}>
              <table className="tabela-comparacao s3-reveal">
                <thead>
                  <tr>
                    <th style={{textAlign:'left'}}>Critério</th>
                    <th>Ensino Tradicional</th>
                    <th>Método Sintetiza</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Abordagem</td>
                    <td><span className="icone-x">✕</span> Teoria sem prática</td>
                    <td><span className="icone-check">✓</span> Conceito + aplicação</td>
                  </tr>
                  <tr>
                    <td>Tempo para resultado</td>
                    <td><span className="icone-x">✕</span> 1 a 2 anos</td>
                    <td><span className="icone-check">✓</span> Até 30 dias</td>
                  </tr>
                  <tr>
                    <td>Foco</td>
                    <td><span className="icone-x">✕</span> Design genérico</td>
                    <td><span className="icone-check">✓</span> Comunicação e impacto</td>
                  </tr>
                  <tr>
                    <td>Templates</td>
                    <td><span className="icone-x">✕</span> Iguais para todos</td>
                    <td><span className="icone-check">✓</span> Estrutura personalizada</td>
                  </tr>
                  <tr>
                    <td>Prática</td>
                    <td><span className="icone-x">✕</span> Aprende, não pratica</td>
                    <td><span className="icone-check">✓</span> Pratica enquanto aprende</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grade-pilares">
              <div className="pilar s3-reveal">
                <div className="numero-pilar">01</div>
                <h4>Estrutura</h4>
                <p>Como organizar qualquer conteúdo para que faça sentido imediato — mesmo que o assunto seja complexo.</p>
              </div>
              <div className="pilar s3-reveal s3-reveal-d1">
                <div className="numero-pilar">02</div>
                <h4>Visual com Intenção</h4>
                <p>Slides que guiam o olhar, reforçam sua fala e eliminam as distrações que geram conversas paralelas.</p>
              </div>
              <div className="pilar s3-reveal s3-reveal-d2">
                <div className="numero-pilar">03</div>
                <h4>Presença e Ritmo</h4>
                <p>Como apresentar com confiança e autoridade — mesmo que você trave diante de diretores.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO OFERTA */}
        <section className="secao-oferta s3-delay" id="oferta">
          <div className="container">
            <span className="rotulo" style={{textAlign:'center',display:'block'}}>Tudo que você leva hoje</span>
            <h2 className="s3-reveal">
              Sua Transformação <span className="ambar">Começa Agora</span>
            </h2>
            <p className="subtitulo-secao s3-reveal">Um ecossistema completo para transformar sua comunicação profissional.</p>
            <div className="grade-itens">
              <div className="item-oferta destaque s3-reveal">
                <span className="emoji-item">🎓</span>
                <div className="corpo-item">
                  <h4>CURSO PRINCIPAL — PowerPoint Profissional do Zero ao Avançado</h4>
                  <p>Domine a ferramenta mais usada no mundo corporativo com profundidade real.</p>
                  <span className="etiqueta-valor">Valor: R$ 997</span>
                </div>
              </div>
              <div className="item-oferta s3-reveal">
                <span className="emoji-item">🎬</span>
                <div className="corpo-item">
                  <h4>BÔNUS #1 — Masterclass de Storytelling Visual</h4>
                  <p>Como construir narrativas que prendem e convencem do início ao fim.</p>
                  <span className="etiqueta-valor">GRÁTIS</span>
                </div>
              </div>
              <div className="item-oferta s3-reveal s3-reveal-d1">
                <span className="emoji-item">📐</span>
                <div className="corpo-item">
                  <h4>BÔNUS #2 — Estrutura de Apresentações que Convencem</h4>
                  <p>Aprenda a montar o raciocínio antes de abrir o PowerPoint.</p>
                  <span className="etiqueta-valor">GRÁTIS</span>
                </div>
              </div>
              <div className="item-oferta s3-reveal s3-reveal-d2">
                <span className="emoji-item">📊</span>
                <div className="corpo-item">
                  <h4>BÔNUS #3 — Pack de Templates Profissionais Editáveis</h4>
                  <p>+50 layouts prontos: relatório, pitch, onboarding, proposta comercial e mais.</p>
                  <span className="etiqueta-valor">GRÁTIS</span>
                </div>
              </div>
              <div className="item-oferta s3-reveal s3-reveal-d3">
                <span className="emoji-item">🎤</span>
                <div className="corpo-item">
                  <h4>BÔNUS #4 — Mini-Treinamento de Oratória Corporativa</h4>
                  <p>O melhor slide não salva uma apresentação sem confiança e presença.</p>
                  <span className="etiqueta-valor">GRÁTIS</span>
                </div>
              </div>
              <div className="item-oferta s3-reveal s3-reveal-d4">
                <span className="emoji-item">🏅</span>
                <div className="corpo-item">
                  <h4>CERTIFICADO DE ESPECIALISTA RECONHECIDO</h4>
                  <p>Para colocar no LinkedIn e currículo — sinaliza autoridade de mercado.</p>
                  <span className="etiqueta-valor">GRÁTIS</span>
                </div>
              </div>
            </div>
            <div className="caixa-preco s3-reveal">
              <div className="etiqueta-exclusivo">Oferta Exclusiva</div>
              <p className="valor-riscado">De R$ 1.335 em valor total</p>
              <div className="divisor-preco"></div>
              <p className="rotulo-hoje">Hoje, por apenas</p>
              <div className="preco-principal">
                <sup>12x de</sup> R$47
              </div>
              <p className="preco-ou">ou</p>
              <p className="preco-avista">R$ 497 à vista</p>
              <a href="SUA_URL_DE_CHECKOUT" className="btn-cta">
                QUERO MINHA VAGA AGORA →
              </a>
              <div className="nota-garantia" style={{marginTop:'18px',justifyContent:'center'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2ECC8A" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Pagamento 100% seguro &nbsp;•&nbsp; Acesso imediato</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO FAQ */}
        <section className="secao-faq s3-delay">
          <div className="container">
            <span className="rotulo" style={{textAlign:'center',display:'block'}}>Suas dúvidas</span>
            <h2 className="s3-reveal">
              Respostas <span className="ambar">honestas</span> para as dúvidas reais
            </h2>
            <p className="subtitulo-secao s3-reveal">Sem rodeios. Sem enrolação.</p>
            <div className="lista-faq">
              {[
                {
                  p: 'Não tenho talento para design. Conseguirei fazer isso?',
                  r: 'Você não precisa ter talento. Você precisa de método. Design de apresentação não é arte — é comunicação visual com regras claras. O Sintetiza te ensina exatamente quais regras aplicar, em qual ordem, em qualquer situação. O talento vem depois da técnica.',
                },
                {
                  p: 'Não tenho tempo. Minha rotina já está cheia.',
                  r: 'O curso foi desenhado para blocos curtos — com 20 a 30 minutos por dia você já progride. E o mais importante: você começa a aplicar imediatamente. Cada minuto investido gera resultado na semana seguinte.',
                },
                {
                  p: 'Já assisti tutoriais no YouTube. O que isso tem de diferente?',
                  r: 'Tutorial te ensina o botão. O método te ensina o porquê por trás de cada decisão. Você sai do YouTube sabendo fazer uma coisa — e sai da Sintetiza resolvendo qualquer situação de apresentação. É a diferença entre decorar uma receita e saber cozinhar.',
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
                <div key={i} className="s3-faq-item s3-reveal">
                  <button className="s3-faq-pergunta">{faq.p}</button>
                  <div className="s3-faq-resposta">
                    <div className="s3-faq-resposta-interna">{faq.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO PÚBLICO */}
        <section className="secao-publico s3-delay">
          <div className="container">
            <h2 className="s3-reveal">
              Para <span className="verde">quem é</span> — e para quem <span className="vermelho">não é</span>
            </h2>
            <div className="grade-publico">
              <div className="caixa-publico publico-sim s3-reveal">
                <h3>✅ É para você se...</h3>
                <ul className="lista-publico">
                  <li>Você é profissional corporativo que precisa apresentar resultados e quer ser levado a sério</li>
                  <li>Você é gestor, coordenador ou líder que quer transmitir autoridade e clareza</li>
                  <li>Você é analista que domina o conteúdo, mas trava na hora de comunicar com impacto</li>
                  <li>Você é consultor ou empreendedor que apresenta para clientes e quer fechar mais</li>
                  <li>Você quer se destacar e sabe que comunicação é a habilidade mais subestimada</li>
                </ul>
              </div>
              <div className="caixa-publico publico-nao s3-reveal s3-reveal-d1">
                <h3>❌ Não é para você se...</h3>
                <ul className="lista-publico">
                  <li>Você quer aprender design gráfico avançado para se tornar um profissional de criação</li>
                  <li>Você busca curso teórico sem compromisso com aplicação prática imediata</li>
                  <li>Você acredita que apresentação não faz diferença na carreira</li>
                  <li>Você não pretende implementar o que aprender — prefere colecionar cursos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="cta-final s3-delay">
          <div className="container">
            <h2 className="s3-reveal">
              A próxima apresentação vai ser <em style={{color:'var(--ambar-claro)'}}>diferente</em> —<br />
              ou vai ser igual à última.
            </h2>
            <p className="s3-reveal">A escolha é sua. O método já está pronto. O que falta é a decisão.</p>
            <a href="#oferta" className="btn-cta s3-reveal" style={{display:'inline-block',width:'auto'}}>
              GARANTIR MINHA VAGA AGORA →
            </a>
            <div style={{display:'flex',justifyContent:'center'}}>
              <div className="selo-garantia s3-reveal">
                <span className="icone-garantia">🛡️</span>
                <span>
                  <strong style={{color:'var(--branco)'}}>Garantia Blindada de 7 dias.</strong><br />
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
          <p style={{marginTop:'6px'}}>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </p>
          <p className="credito">
            Desenvolvido por <a href="https://buenomidias.com.br" target="_blank" rel="noopener noreferrer">BuenoMídias</a>
          </p>
        </footer>

        {/* BARRA FLUTUANTE */}
        <div className="barra-flutuante s3-delay" id="s3StickyBar">
          <div className="preco-flutuante">
            <small>Oferta especial</small>
            <strong>12x de R$47</strong>
          </div>
          <a href="#oferta" className="btn-flutuante">Garantir Vaga →</a>
        </div>

      </div>
    </>
  );
}
