'use client'

import { useEffect } from 'react'

export default function DVSMAIPage() {
  useEffect(() => {
    // Intersection Observer para revelar elementos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visivel')
          }
        })
      },
      { threshold: 0.12 }
    )

    const elementos = document.querySelectorAll('.revelar')
    elementos.forEach((el) => observer.observe(el))

    // Barra flutuante após 600px de scroll
    const barra = document.getElementById('barra-flutuante')
    const handleScroll = () => {
      if (!barra) return
      if (window.scrollY > 600) {
        barra.style.transform = 'translateY(0)'
        barra.style.opacity = '1'
      } else {
        barra.style.transform = 'translateY(100%)'
        barra.style.opacity = '0'
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Acordeão FAQ
    const faqItems = document.querySelectorAll('.faq-item')
    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-pergunta')
      const resp = item.querySelector('.faq-resposta')
      if (btn && resp) {
        btn.addEventListener('click', () => {
          const aberto = resp.style.maxHeight && resp.style.maxHeight !== '0px'
          faqItems.forEach((i) => {
            const r = i.querySelector('.faq-resposta')
            const b = i.querySelector('.faq-pergunta')
            if (r) r.style.maxHeight = '0px'
            if (b) b.setAttribute('aria-expanded', 'false')
          })
          if (!aberto) {
            resp.style.maxHeight = resp.scrollHeight + 'px'
            btn.setAttribute('aria-expanded', 'true')
          }
        })
      }
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background: #070e1a;
          color: #e2e8f0;
          line-height: 1.6;
        }

        .revelar {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .revelar.visivel {
          opacity: 1;
          transform: none;
        }

        .container {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* BARRA AVISO */
        .barra-aviso {
          background: #ef4444;
          color: #fff;
          text-align: center;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        /* CABEÇALHO */
        .cabecalho {
          background: #070e1a;
          border-bottom: 1px solid #1e3a6e;
          position: fixed;
          top: 36px;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 14px 20px;
        }
        .cabecalho-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 18px;
          font-weight: 800;
          color: #f59e0b;
          letter-spacing: -0.01em;
        }
        .logo span {
          color: #fff;
        }
        .badge-header {
          background: #1e3a6e;
          color: #93c5fd;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ESPAÇAMENTO TOPO */
        .topo-espaco {
          height: 100px;
        }

        /* HERO */
        .hero {
          background: linear-gradient(180deg, #0d1929 0%, #070e1a 100%);
          padding: 70px 20px 60px;
          text-align: center;
          border-bottom: 1px solid #1e3a6e;
        }
        .badge-hero {
          display: inline-block;
          background: #1e3a6e;
          color: #f59e0b;
          font-size: 12px;
          font-weight: 800;
          padding: 7px 18px;
          border-radius: 30px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 28px;
          border: 1px solid #f59e0b44;
        }
        .hero h1 {
          font-size: clamp(28px, 5vw, 46px);
          font-weight: 900;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 18px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-subtitulo {
          font-size: clamp(16px, 2.5vw, 21px);
          color: #f59e0b;
          font-weight: 700;
          margin-bottom: 32px;
        }
        .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 36px;
        }
        .pill {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          color: #22c55e;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 30px;
        }
        .btn-cta {
          display: inline-block;
          background: #22c55e;
          color: #000;
          font-size: clamp(15px, 2.5vw, 19px);
          font-weight: 800;
          padding: 18px 44px;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 0 32px #22c55e44;
          border: none;
          cursor: pointer;
        }
        .btn-cta:hover {
          background: #16a34a;
          transform: translateY(-2px);
        }
        .nota-hero {
          margin-top: 16px;
          font-size: 13px;
          color: #94a3b8;
        }
        .nota-hero span {
          color: #f59e0b;
          font-weight: 600;
        }

        /* SEÇÕES GERAIS */
        .secao {
          padding: 64px 20px;
          border-bottom: 1px solid #1e3a6e;
        }
        .secao-titulo {
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .secao-subtitulo {
          font-size: 16px;
          color: #94a3b8;
          margin-bottom: 36px;
        }
        .label-secao {
          font-size: 11px;
          font-weight: 700;
          color: #f59e0b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        /* SEÇÃO PROBLEMA */
        .bloco-citacao {
          background: #0d1929;
          border-left: 4px solid #f59e0b;
          border-radius: 4px;
          padding: 24px 28px;
          margin-bottom: 36px;
          font-size: 16px;
          color: #cbd5e1;
          line-height: 1.8;
        }
        .bloco-citacao strong {
          color: #fff;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }
        .card-pequeno {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }
        .card-pequeno .icone {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .card-pequeno .titulo {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .card-pequeno .desc {
          font-size: 12px;
          color: #64748b;
          line-height: 1.5;
        }

        /* SEÇÃO SEM ESFORÇO */
        .features-linha {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }
        .feature-item {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 10px;
          padding: 24px 20px;
          text-align: center;
        }
        .feature-item .titulo {
          font-size: 16px;
          font-weight: 800;
          color: #22c55e;
          margin-bottom: 8px;
        }
        .feature-item .desc {
          font-size: 13px;
          color: #94a3b8;
        }
        .bloco-virada {
          background: linear-gradient(135deg, #0d1929, #091523);
          border: 1px solid #1e3a6e;
          border-radius: 12px;
          padding: 32px;
        }
        .bloco-virada h3 {
          font-size: 20px;
          font-weight: 800;
          color: #f59e0b;
          margin-bottom: 14px;
        }
        .bloco-virada p {
          font-size: 15px;
          color: #cbd5e1;
          line-height: 1.8;
          margin-bottom: 12px;
        }
        .bloco-virada p:last-child { margin-bottom: 0; }

        /* SEÇÃO LÓGICA */
        .steps-horizontais {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0;
          position: relative;
        }
        .step {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          padding: 24px 18px;
          text-align: center;
          position: relative;
        }
        .step:not(:last-child)::after {
          content: '→';
          position: absolute;
          right: -14px;
          top: 50%;
          transform: translateY(-50%);
          color: #f59e0b;
          font-size: 20px;
          z-index: 2;
          background: #0d1929;
          padding: 0 4px;
        }
        .step:first-child { border-radius: 10px 0 0 10px; }
        .step:last-child { border-radius: 0 10px 10px 0; }
        .step-num {
          width: 36px;
          height: 36px;
          background: #f59e0b;
          color: #000;
          font-size: 16px;
          font-weight: 900;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .step-titulo {
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 6px;
        }
        .step-desc {
          font-size: 12px;
          color: #64748b;
          line-height: 1.5;
        }

        /* SEÇÃO O DESAFIO */
        .cards-beneficios {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .card-beneficio {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 12px;
          padding: 28px 22px;
          border-top: 3px solid #f59e0b;
        }
        .card-beneficio .num {
          font-size: 36px;
          font-weight: 900;
          color: #1e3a6e;
          line-height: 1;
          margin-bottom: 12px;
        }
        .card-beneficio h3 {
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .card-beneficio p {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.6;
        }

        /* SEÇÃO DESCOBERTAS */
        .lista-descobertas {
          display: grid;
          gap: 16px;
        }
        .item-descoberta {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 10px;
          padding: 20px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .item-descoberta .icone {
          font-size: 22px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .item-descoberta h4 {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .item-descoberta p {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
        }

        /* PARA QUEM É / NÃO É */
        .cards-quem {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .cards-quem { grid-template-columns: 1fr; }
          .steps-horizontais { grid-template-columns: 1fr; }
          .step:not(:last-child)::after { display: none; }
          .step:first-child, .step:last-child { border-radius: 0; }
          .step:first-child { border-radius: 10px 10px 0 0; }
          .step:last-child { border-radius: 0 0 10px 10px; }
        }
        .card-quem {
          border-radius: 12px;
          padding: 28px 22px;
        }
        .card-quem-sim {
          background: #052e16;
          border: 1px solid #22c55e44;
        }
        .card-quem-nao {
          background: #1c0a0a;
          border: 1px solid #ef444444;
        }
        .card-quem h3 {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid currentColor;
          opacity: 0.9;
        }
        .card-quem-sim h3 { color: #22c55e; }
        .card-quem-nao h3 { color: #ef4444; }
        .card-quem ul {
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .card-quem ul li {
          font-size: 14px;
          color: #e2e8f0;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.5;
        }
        .card-quem-sim ul li::before {
          content: '✓';
          color: #22c55e;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .card-quem-nao ul li::before {
          content: '✗';
          color: #ef4444;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* SEÇÃO VIDEO SALES MACHINE */
        .casos-uso {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
          margin-bottom: 36px;
        }
        .caso-uso {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 10px;
          padding: 20px 16px;
          text-align: center;
        }
        .caso-uso .icone { font-size: 26px; margin-bottom: 10px; }
        .caso-uso h4 {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .caso-uso p { font-size: 12px; color: #64748b; line-height: 1.5; }

        .bloco-unico {
          background: #0d1929;
          border: 1px solid #f59e0b33;
          border-radius: 12px;
          padding: 28px;
          margin-bottom: 28px;
        }
        .bloco-unico h3 {
          font-size: 17px;
          font-weight: 800;
          color: #f59e0b;
          margin-bottom: 16px;
        }
        .bloco-unico ul {
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .bloco-unico ul li {
          font-size: 14px;
          color: #cbd5e1;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .bloco-unico ul li::before {
          content: '→';
          color: #f59e0b;
          font-weight: 700;
          flex-shrink: 0;
        }
        .quote-fechamento {
          background: linear-gradient(135deg, #0d1929, #091523);
          border: 1px solid #3b82f6;
          border-radius: 10px;
          padding: 24px 28px;
          text-align: center;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          font-style: italic;
        }
        .quote-fechamento span { color: #3b82f6; }

        /* SEÇÃO INVESTIMENTO */
        .card-preco {
          background: #0d1929;
          border: 2px solid #f59e0b;
          border-radius: 16px;
          padding: 40px 32px;
          text-align: center;
          max-width: 440px;
          margin: 0 auto;
        }
        .preco-de {
          font-size: 18px;
          color: #64748b;
          text-decoration: line-through;
          margin-bottom: 6px;
        }
        .preco-por {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }
        .preco-valor {
          font-size: 72px;
          font-weight: 900;
          color: #f59e0b;
          line-height: 1;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }
        .preco-valor sup {
          font-size: 28px;
          vertical-align: super;
          font-weight: 700;
        }
        .preco-copy {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        /* SEÇÃO O QUE VOCÊ RECEBE */
        .lista-recebe {
          list-style: none;
          display: grid;
          gap: 16px;
        }
        .lista-recebe li {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 10px;
          padding: 18px 22px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .lista-recebe li .num {
          background: #f59e0b;
          color: #000;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 900;
          flex-shrink: 0;
        }
        .lista-recebe li .conteudo h4 {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 3px;
        }
        .lista-recebe li .conteudo p {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
        }

        /* SEÇÃO BÔNUS */
        .cards-bonus {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 40px;
        }
        @media (max-width: 620px) {
          .cards-bonus { grid-template-columns: 1fr; }
        }
        .card-bonus {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 12px;
          padding: 26px 22px;
          border-top: 3px solid #3b82f6;
        }
        .badge-bonus {
          display: inline-block;
          background: #1e3a6e;
          color: #93c5fd;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .card-bonus h3 {
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 14px;
          line-height: 1.3;
        }
        .card-bonus ul {
          list-style: none;
          display: grid;
          gap: 8px;
        }
        .card-bonus ul li {
          font-size: 13px;
          color: #94a3b8;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .card-bonus ul li::before {
          content: '✓';
          color: #22c55e;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* 4 PASSOS */
        .passos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 14px;
        }
        .passo {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          border-radius: 10px;
          padding: 20px 16px;
          text-align: center;
        }
        .passo .num {
          width: 38px;
          height: 38px;
          background: #3b82f6;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 900;
          margin: 0 auto 12px;
        }
        .passo h4 {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .passo p { font-size: 12px; color: #64748b; line-height: 1.5; }

        /* TABELA RESUMO */
        .tabela-resumo {
          width: 100%;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
        }
        .tabela-resumo thead tr {
          background: #1e3a6e;
        }
        .tabela-resumo thead th {
          padding: 14px 18px;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
          color: #93c5fd;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .tabela-resumo thead th:last-child { text-align: right; }
        .tabela-resumo tbody tr {
          border-bottom: 1px solid #1e3a6e;
        }
        .tabela-resumo tbody tr:nth-child(odd) { background: #0d1929; }
        .tabela-resumo tbody tr:nth-child(even) { background: #091523; }
        .tabela-resumo tbody td {
          padding: 14px 18px;
          font-size: 14px;
          color: #cbd5e1;
        }
        .tabela-resumo tbody td:last-child {
          text-align: right;
          color: #94a3b8;
          font-weight: 600;
        }
        .tabela-resumo tfoot tr {
          background: #0d1929;
          border-top: 2px solid #f59e0b;
        }
        .tabela-resumo tfoot td {
          padding: 16px 18px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .tabela-resumo tfoot td:last-child {
          text-align: right;
          color: #f59e0b;
          font-size: 18px;
        }
        .total-riscado {
          text-decoration: line-through;
          color: #64748b;
          font-size: 13px;
          font-weight: 400;
          margin-right: 8px;
        }

        /* SEÇÃO URGÊNCIA */
        .card-urgencia {
          background: linear-gradient(135deg, #1a0f00, #0d1929);
          border: 2px solid #f59e0b;
          border-radius: 14px;
          padding: 36px 32px;
          text-align: center;
        }
        .card-urgencia h2 {
          font-size: clamp(18px, 3vw, 24px);
          font-weight: 900;
          color: #f59e0b;
          margin-bottom: 16px;
          line-height: 1.25;
        }
        .card-urgencia p {
          font-size: 15px;
          color: #cbd5e1;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto;
        }
        .card-urgencia strong { color: #fff; }

        /* CTA FINAL */
        .secao-cta-final {
          background: linear-gradient(180deg, #0d1929 0%, #091523 100%);
          padding: 70px 20px;
          text-align: center;
        }
        .secao-cta-final h2 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }
        .secao-cta-final h2 span { color: #22c55e; }
        .secao-cta-final p {
          font-size: 16px;
          color: #94a3b8;
          max-width: 560px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }
        .pills-final {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 32px;
        }
        .pill-final {
          background: #0d1929;
          border: 1px solid #1e3a6e;
          color: #e2e8f0;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 30px;
        }
        .nota-seguranca {
          margin-top: 18px;
          font-size: 12px;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* RODAPÉ */
        .rodape {
          background: #050c18;
          border-top: 1px solid #1e3a6e;
          padding: 32px 20px;
          text-align: center;
        }
        .rodape p {
          font-size: 12px;
          color: #334155;
          line-height: 1.8;
        }
        .rodape a { color: #475569; text-decoration: none; }

        /* BARRA FLUTUANTE */
        #barra-flutuante {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0d1929;
          border-top: 2px solid #1e3a6e;
          padding: 14px 20px;
          z-index: 998;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .barra-flutuante-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .barra-flutuante-texto {
          font-size: 14px;
          font-weight: 600;
          color: #e2e8f0;
        }
        .barra-flutuante-texto span {
          color: #f59e0b;
          font-weight: 800;
        }
        .barra-flutuante-preco {
          font-size: 20px;
          font-weight: 900;
          color: #22c55e;
          white-space: nowrap;
        }
        .btn-flutuante {
          background: #22c55e;
          color: #000;
          font-size: 14px;
          font-weight: 800;
          padding: 11px 24px;
          border-radius: 6px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .btn-flutuante:hover { background: #16a34a; }
        @media (max-width: 520px) {
          .barra-flutuante-texto { display: none; }
          .barra-flutuante-preco { font-size: 17px; }
          .btn-flutuante { font-size: 13px; padding: 10px 18px; }
        }

        /* SEÇÃO VIDEO SALES MACHINE título */
        .vsm-titulo {
          text-align: center;
          margin-bottom: 36px;
        }

        /* Utilitários */
        .texto-centro { text-align: center; }
        .mb-8 { margin-bottom: 8px; }
        .mb-16 { margin-bottom: 16px; }
        .mb-24 { margin-bottom: 24px; }
        .mb-36 { margin-bottom: 36px; }
        .mt-24 { margin-top: 24px; }
        .mt-36 { margin-top: 36px; }
        .cor-ambar { color: #f59e0b; }
        .cor-verde { color: #22c55e; }
        .cor-azul { color: #3b82f6; }
        .cor-vermelho { color: #ef4444; }
        .cor-fraca { color: #64748b; }
      `}</style>

      {/* 1. BARRA AVISO */}
      <div className="barra-aviso">
        🔴 AO VIVO • 12 de Março às 16h — Vagas limitadas
      </div>

      {/* 2. CABEÇALHO */}
      <header className="cabecalho">
        <div className="cabecalho-inner">
          <div className="logo">Bueno <span>Mídias</span></div>
          <div className="badge-header">Desafio • 12 Mar</div>
        </div>
      </header>

      {/* ESPAÇO PARA BARRAS FIXAS */}
      <div className="topo-espaco"></div>

      {/* 3. HERO */}
      <section className="hero">
        <div className="container">
          <div className="revelar">
            <div className="badge-hero">🔴 Desafio ao vivo • 12 de Março às 16h</div>
          </div>
          <h1 className="revelar">
            Como criar vídeos com IA que vendem todos os dias
          </h1>
          <p className="hero-subtitulo revelar">
            Sem equipe. Sem aparecer. Sem edição complexa.
          </p>
          <div className="pills revelar">
            <span className="pill">✓ Ao vivo</span>
            <span className="pill">✓ Acesso à gravação</span>
            <span className="pill">✓ R$ 27 apenas</span>
          </div>
          <div className="revelar">
            <a href="https://sun.eduzz.com/E9OOYPZ59B" className="btn-cta" target="_blank" rel="noopener noreferrer">
              GARANTIR MINHA VAGA POR R$27 →
            </a>
          </div>
          <p className="nota-hero revelar">
            <span>⚡ Vagas limitadas</span> para essa abertura
          </p>
        </div>
      </section>

      {/* 4. SEÇÃO PROBLEMA */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar">O problema</p>
          <h2 className="secao-titulo revelar">O que a maioria ainda não percebeu</h2>
          <div className="bloco-citacao revelar">
            A maioria das pessoas está usando IA para criar <strong>posts bonitos, legendas criativas e conteúdo estético</strong> — e achando que isso é o suficiente para vender.<br /><br />
            Não é.<br /><br />
            Enquanto isso, uma minoria silenciosa descobriu como usar IA para criar <strong>vídeos que têm um único objetivo: converter</strong>. Anúncios. Ofertas diretas. Funis completos. Rodando 24h por dia, sem depender de você aparecer.
          </div>
          <div className="cards-grid">
            <div className="card-pequeno revelar">
              <div className="icone">📢</div>
              <div className="titulo">Anúncios</div>
              <div className="desc">Vídeos criados para tráfego pago que convertem cliques em clientes.</div>
            </div>
            <div className="card-pequeno revelar">
              <div className="icone">💰</div>
              <div className="titulo">Ofertas Diretas</div>
              <div className="desc">Vídeos de vendas que apresentam, convencem e fecham, sem você falar uma palavra.</div>
            </div>
            <div className="card-pequeno revelar">
              <div className="icone">📱</div>
              <div className="titulo">Redes Sociais</div>
              <div className="desc">Conteúdo estratégico que gera audiência qualificada e aquece para a compra.</div>
            </div>
            <div className="card-pequeno revelar">
              <div className="icone">🔁</div>
              <div className="titulo">Funil Completo</div>
              <div className="desc">Vídeos em cada etapa: topo, meio e fundo. Uma máquina automática de vendas.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO SEM ESFORÇO */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar">A grande virada</p>
          <h2 className="secao-titulo revelar">O Mais Impressionante?</h2>
          <p className="secao-subtitulo revelar">Isso tudo é possível sem precisar de estrutura, equipe ou horas na frente do computador.</p>
          <div className="features-linha">
            <div className="feature-item revelar">
              <div className="titulo">Sem aparecer</div>
              <div className="desc">IA gera o vídeo por você. Nenhuma câmera, nenhum constrangimento, nenhuma exposição.</div>
            </div>
            <div className="feature-item revelar">
              <div className="titulo">Sem equipe</div>
              <div className="desc">Você sozinho produz o que antes exigia roteirista, editor e locutor.</div>
            </div>
            <div className="feature-item revelar">
              <div className="titulo">Em minutos</div>
              <div className="desc">Do zero ao vídeo pronto para publicar em menos tempo do que você imagina.</div>
            </div>
          </div>
          <div className="bloco-virada revelar">
            <h3>A Grande Virada — O Jogo da Internet Mudou</h3>
            <p>
              Durante anos, criar vídeos de venda era privilégio de quem tinha orçamento, equipe ou muita coragem para aparecer. Isso acabou.
            </p>
            <p>
              A IA mudou as regras completamente. Hoje, qualquer pessoa com uma boa ideia, um produto ou serviço e o método certo consegue produzir vídeos persuasivos, de alta qualidade, que realmente convertem — sem câmera, sem editor, sem aparecer.
            </p>
            <p>
              Quem aprender isso agora vai sair na frente. E o Desafio Video Sales Machine AI foi criado exatamente para te mostrar como.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO LÓGICA */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar texto-centro">O método</p>
          <h2 className="secao-titulo revelar texto-centro">A Lógica dos Vídeos que Realmente Vendem</h2>
          <p className="secao-subtitulo revelar texto-centro">Todo vídeo de alta conversão segue uma estrutura. Não é sorte, é ciência.</p>
          <div className="steps-horizontais revelar">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-titulo">Atenção</div>
              <div className="step-desc">Os primeiros 3 segundos que prendem ou perdem o espectador para sempre.</div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-titulo">Curiosidade</div>
              <div className="step-desc">O gancho que faz a pessoa querer saber mais e continuar assistindo.</div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-titulo">Desejo</div>
              <div className="step-desc">A transformação apresentada de forma que o espectador queira para si.</div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-titulo">Ação</div>
              <div className="step-desc">O CTA irresistível que converte a atenção em clique, compra ou cadastro.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEÇÃO O DESAFIO */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar">O desafio</p>
          <h2 className="secao-titulo revelar">O Que Você Vai Dominar</h2>
          <p className="secao-subtitulo revelar">Em uma sessão ao vivo intensa e prática, você vai aprender a criar os três tipos de vídeo que mais vendem na internet hoje.</p>
          <div className="cards-beneficios">
            <div className="card-beneficio revelar">
              <div className="num">01</div>
              <h3>Transforme ideias em vídeos persuasivos</h3>
              <p>Parta de uma simples ideia ou produto e use IA para construir um roteiro, visual e narrativa que converte — mesmo que você nunca tenha feito um vídeo antes.</p>
            </div>
            <div className="card-beneficio revelar">
              <div className="num">02</div>
              <h3>Crie anúncios que convertem</h3>
              <p>Aprenda a estrutura exata de anúncios em vídeo que param o scroll, prendem a atenção e fazem pessoas clicarem na sua oferta.</p>
            </div>
            <div className="card-beneficio revelar">
              <div className="num">03</div>
              <h3>Produza vídeos de oferta direta</h3>
              <p>Vídeos de VSL (Video Sales Letter) que apresentam, convencem e fecham vendas enquanto você dorme, trabalha ou descansa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SEÇÃO DESCOBERTAS */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar">Conteúdo</p>
          <h2 className="secao-titulo revelar">Tudo Que Você Vai Descobrir</h2>
          <div className="lista-descobertas">
            <div className="item-descoberta revelar">
              <div className="icone">🔥</div>
              <div>
                <h4>O Método VSM AI na Prática</h4>
                <p>A estrutura completa para criar vídeos de vendas usando inteligência artificial do zero — aplicada ao vivo, passo a passo, sem enrolação.</p>
              </div>
            </div>
            <div className="item-descoberta revelar">
              <div className="icone">🔥</div>
              <div>
                <h4>Ferramentas de IA que Fazem o Trabalho Pesado</h4>
                <p>Quais ferramentas usar, como combiná-las e como extrair o melhor de cada uma para produzir vídeos profissionais em minutos.</p>
              </div>
            </div>
            <div className="item-descoberta revelar">
              <div className="icone">🔥</div>
              <div>
                <h4>Os Prompts que Geram Roteiros Vendedores</h4>
                <p>Os comandos exatos para fazer a IA escrever roteiros persuasivos para anúncios, VSLs e vídeos de oferta — adaptados para qualquer nicho.</p>
              </div>
            </div>
            <div className="item-descoberta revelar">
              <div className="icone">🔥</div>
              <div>
                <h4>Como Montar um Fluxo de Produção Rápido</h4>
                <p>Um sistema replicável que você pode usar toda semana para criar novos vídeos sem depender de editores, equipe ou muito tempo disponível.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PARA QUEM É / NÃO É */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar texto-centro">Clareza</p>
          <h2 className="secao-titulo revelar texto-centro">Esse Desafio é Para Você?</h2>
          <p className="secao-subtitulo revelar texto-centro">Seja honesto consigo mesmo antes de comprar.</p>
          <div className="cards-quem">
            <div className="card-quem card-quem-sim revelar">
              <h3>✓ Para quem é</h3>
              <ul>
                <li>Infoprodutores que querem escalar as vendas sem depender de uma equipe cara</li>
                <li>Anunciantes que buscam criativos de alta performance sem precisar contratar produtoras</li>
                <li>Criadores de conteúdo que querem transformar audiência em receita</li>
                <li>Afiliados que precisam de vídeos para promover produtos com mais autoridade e conversão</li>
              </ul>
            </div>
            <div className="card-quem card-quem-nao revelar">
              <h3>✗ Para quem não é</h3>
              <ul>
                <li>Quem não tem produto, serviço ou oferta para vender (ainda)</li>
                <li>Quem quer apenas acumular likes sem interesse em converter seguidores em clientes</li>
                <li>Quem busca solução mágica e não pretende aplicar o que vai aprender</li>
                <li>Quem não tem nenhum interesse em marketing digital ou vendas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SEÇÃO VIDEO SALES MACHINE */}
      <section className="secao">
        <div className="container">
          <div className="vsm-titulo">
            <p className="label-secao revelar">Video Sales Machine</p>
            <h2 className="secao-titulo revelar">Uma Máquina que Vende Para Você</h2>
            <p className="secao-subtitulo revelar">Vídeos estratégicos funcionam em qualquer modelo de negócio digital.</p>
          </div>
          <div className="casos-uso">
            <div className="caso-uso revelar">
              <div className="icone">📦</div>
              <h4>Produtos Digitais</h4>
              <p>Cursos, ebooks, memberships — vídeos que vendem no automático.</p>
            </div>
            <div className="caso-uso revelar">
              <div className="icone">🎓</div>
              <h4>Mentorias</h4>
              <p>Apresente sua autoridade e feche alunos sem calls de vendas intermináveis.</p>
            </div>
            <div className="caso-uso revelar">
              <div className="icone">🛍️</div>
              <h4>E-commerce</h4>
              <p>Demonstre produtos de forma irresistível e aumente o ticket médio do carrinho.</p>
            </div>
            <div className="caso-uso revelar">
              <div className="icone">🔗</div>
              <h4>Afiliados</h4>
              <p>Promova produtos com vídeos que convertem muito mais que links soltos.</p>
            </div>
          </div>
          <div className="bloco-unico revelar">
            <h3>Um Único Vídeo Bem Estruturado Pode…</h3>
            <ul>
              <li>Substituir uma hora de call de vendas e fechar clientes enquanto você dorme</li>
              <li>Rodar como anúncio por semanas ou meses gerando leads e vendas de forma previsível</li>
              <li>Ser reutilizado em landing pages, e-mail marketing, WhatsApp e redes sociais</li>
              <li>Construir sua autoridade de forma passiva, sem você precisar aparecer todo dia</li>
            </ul>
          </div>
          <div className="quote-fechamento revelar">
            "Vídeo não é mais <span>conteúdo</span>. Vídeo é <span>venda</span>."
          </div>
        </div>
      </section>

      {/* 11. SEÇÃO INVESTIMENTO */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar texto-centro">Investimento</p>
          <h2 className="secao-titulo revelar texto-centro">Quanto Custa Isso Tudo?</h2>
          <p className="secao-subtitulo revelar texto-centro" style={{maxWidth: '560px', margin: '0 auto 36px'}}>
            Um desafio desse nível, com método, bônus e acesso à gravação, facilmente custaria R$197 ou mais. Mas para essa abertura...
          </p>
          <div className="card-preco revelar">
            <div className="preco-de">De R$ 197</div>
            <div className="preco-por">Hoje por apenas</div>
            <div className="preco-valor"><sup>R$</sup>27</div>
            <p className="preco-copy">
              Acesso ao desafio ao vivo, gravação completa e pacote de prompts.<br />
              Pagamento único, sem mensalidade, sem renovação automática.
            </p>
            <a href="https://sun.eduzz.com/E9OOYPZ59B" className="btn-cta" target="_blank" rel="noopener noreferrer">
              GARANTIR MINHA VAGA POR R$27 →
            </a>
          </div>
        </div>
      </section>

      {/* 12. SEÇÃO O QUE VOCÊ RECEBE */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar">Incluso</p>
          <h2 className="secao-titulo revelar">O Que Você Recebe</h2>
          <ul className="lista-recebe">
            <li className="revelar">
              <div className="num">1</div>
              <div className="conteudo">
                <h4>Acesso ao Desafio ao Vivo</h4>
                <p>Participação confirmada na sessão ao vivo do dia 12 de março às 16h, com conteúdo prático e aplicável na hora.</p>
              </div>
            </li>
            <li className="revelar">
              <div className="num">2</div>
              <div className="conteudo">
                <h4>Método Video Sales Machine AI</h4>
                <p>O método completo para criar vídeos que vendem usando inteligência artificial, do roteiro ao vídeo final.</p>
              </div>
            </li>
            <li className="revelar">
              <div className="num">3</div>
              <div className="conteudo">
                <h4>🎁 Bônus: Gravação Completa</h4>
                <p>Acesso à gravação do evento para rever quantas vezes quiser, no seu ritmo, para implementar sem pressa.</p>
              </div>
            </li>
            <li className="revelar">
              <div className="num">4</div>
              <div className="conteudo">
                <h4>🎁 Bônus: Pacote de Prompts</h4>
                <p>Coleção de prompts prontos para criar roteiros, scripts e narrativas de vídeos vendedores em qualquer nicho.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 13. SEÇÃO BÔNUS */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar">Bônus exclusivos</p>
          <h2 className="secao-titulo revelar">Os Bônus Que Vêm Junto</h2>
          <div className="cards-bonus">
            <div className="card-bonus revelar">
              <div className="badge-bonus">Bônus 1</div>
              <h3>Gravação Completa do Desafio</h3>
              <ul>
                <li>Acesso imediato após o evento ao replay completo</li>
                <li>Reveja quantas vezes precisar, no seu ritmo</li>
                <li>Implemente cada parte sem pressão de prazo</li>
              </ul>
            </div>
            <div className="card-bonus revelar">
              <div className="badge-bonus">Bônus 2</div>
              <h3>Pacote Completo de Prompts VSM</h3>
              <ul>
                <li>Prompts prontos para roteiros de anúncios</li>
                <li>Scripts de VSL para venda direta de produtos</li>
                <li>Templates para vídeos de conteúdo persuasivo</li>
                <li>Comandos para adaptar qualquer prompt ao seu nicho</li>
              </ul>
            </div>
          </div>
          <p className="label-secao revelar texto-centro mb-16">Como funciona</p>
          <h3 className="revelar texto-centro" style={{color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '24px'}}>Do Prompt ao Vídeo em 4 Passos</h3>
          <div className="passos-grid">
            <div className="passo revelar">
              <div className="num">1</div>
              <h4>Escolha</h4>
              <p>Selecione o tipo de vídeo que precisa criar: anúncio, VSL ou conteúdo.</p>
            </div>
            <div className="passo revelar">
              <div className="num">2</div>
              <h4>Personalize</h4>
              <p>Adapte o prompt do pacote com as informações do seu produto ou nicho.</p>
            </div>
            <div className="passo revelar">
              <div className="num">3</div>
              <h4>IA gera</h4>
              <p>Cole na ferramenta de IA e obtenha roteiro, visual e narração prontos.</p>
            </div>
            <div className="passo revelar">
              <div className="num">4</div>
              <h4>Publique</h4>
              <p>Exporte e publique. Seu vídeo está no ar vendendo por você.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. TABELA RESUMO */}
      <section className="secao">
        <div className="container">
          <p className="label-secao revelar texto-centro">Resumo</p>
          <h2 className="secao-titulo revelar texto-centro">Tudo que você recebe por R$27</h2>
          <div className="revelar" style={{overflowX: 'auto', marginTop: '28px'}}>
            <table className="tabela-resumo">
              <thead>
                <tr>
                  <th>Item</th>
                  <th style={{textAlign: 'right'}}>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>✅ Acesso ao Desafio ao Vivo — 12 de Março</td>
                  <td>R$ 197</td>
                </tr>
                <tr>
                  <td>✅ Método Video Sales Machine AI</td>
                  <td>R$ 97</td>
                </tr>
                <tr>
                  <td>🎁 Bônus: Gravação Completa do Desafio</td>
                  <td>R$ 47</td>
                </tr>
                <tr>
                  <td>🎁 Bônus: Pacote Completo de Prompts VSM</td>
                  <td>R$ 50</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total</strong></td>
                  <td>
                    <span className="total-riscado">R$ 391</span>
                    <strong>R$ 27</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* 15. SEÇÃO URGÊNCIA */}
      <section className="secao">
        <div className="container">
          <div className="card-urgencia revelar">
            <h2>⚠️ Atenção: Essa Condição é por Tempo Limitado</h2>
            <p>
              Os R$27 são um preço de lançamento exclusivo para essa primeira turma do Desafio VSM AI.
              Depois do evento, o acesso <strong>volta para R$197</strong> — sem aviso prévio, sem desconto especial.
              <br /><br />
              Se você está lendo isso agora, ainda dá tempo. Mas essa janela fecha assim que as vagas esgotarem
              ou quando o evento começar.
            </p>
          </div>
        </div>
      </section>

      {/* 16. CTA FINAL */}
      <section className="secao-cta-final">
        <div className="container">
          <h2 className="revelar">
            Prepare-se Para Transformar IA em Uma <span>Máquina de Vendas</span>
          </h2>
          <p className="revelar">
            No dia 12 de março às 16h, você vai sair com o método, as ferramentas e os prompts para criar vídeos que vendem todos os dias — sem equipe, sem aparecer e sem edição complexa.
          </p>
          <div className="pills-final revelar">
            <span className="pill-final">🎯 Acesso imediato</span>
            <span className="pill-final">🔒 Pagamento seguro</span>
            <span className="pill-final">🚀 Resultado rápido</span>
          </div>
          <div className="revelar">
            <a href="https://sun.eduzz.com/E9OOYPZ59B" className="btn-cta" target="_blank" rel="noopener noreferrer">
              GARANTIR MINHA VAGA POR R$27 →
            </a>
          </div>
          <p className="nota-seguranca revelar">
            🔒 Pagamento 100% seguro via Eduzz · Acesso confirmado por e-mail
          </p>
        </div>
      </section>

      {/* 17. RODAPÉ */}
      <footer className="rodape">
        <div className="container">
          <p style={{color: '#f59e0b', fontWeight: 700, fontSize: '15px', marginBottom: '8px'}}>Bueno Mídias</p>
          <p>
            Desafio Video Sales Machine AI · 12 de Março de 2025 às 16h<br />
            <a href="https://sun.eduzz.com/E9OOYPZ59B">Checkout seguro via Eduzz</a> · R$ 27 · Pagamento único
          </p>
          <p style={{marginTop: '16px'}}>
            © 2025 Bueno Mídias. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* 18. BARRA FLUTUANTE */}
      <div id="barra-flutuante">
        <div className="barra-flutuante-inner">
          <div className="barra-flutuante-texto">
            Desafio VSM AI · <span>12 Mar 16h</span>
          </div>
          <div className="barra-flutuante-preco">R$27</div>
          <a href="https://sun.eduzz.com/E9OOYPZ59B" className="btn-flutuante" target="_blank" rel="noopener noreferrer">
            Garantir Vaga →
          </a>
        </div>
      </div>
    </>
  )
}
