'use client';
import { useEffect } from 'react';

export default function SintetizaModelo02() {
  useEffect(() => {
    /* ── ANIMAÇÃO DE ENTRADA AO ROLAR ── */
    const reveals = document.querySelectorAll('.s2-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('s2-visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => {
      const dentroDe = el.closest('.s2-delay');
      const elEhDelay = el.classList.contains('s2-delay');
      if (!dentroDe && !elEhDelay) revealObserver.observe(el);
    });

    /* ── ACORDEÃO FAQ ── */
    const perguntas = document.querySelectorAll('.faq-question');
    const handleFaq = (e) => {
      const item = e.currentTarget.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    };
    perguntas.forEach(q => q.addEventListener('click', handleFaq));

    /* ── BARRA FLUTUANTE ── */
    const stickyBar = document.getElementById('stickyBar');
    const onScroll = () => {
      if (!stickyBar || !stickyBar.classList.contains('s2-delay-visible')) return;
      if (window.scrollY > 600) stickyBar.classList.add('s2-bar-visible');
      else stickyBar.classList.remove('s2-bar-visible');
    };
    window.addEventListener('scroll', onScroll);

    /* ── SISTEMA DE DELAY DO VÍDEO ── */
    const DELAY_SECONDS = 180; /* ← ALTERE AQUI */

    const delayEls = document.querySelectorAll('.s2-delay');
    let delayTriggered = false;

    function liberarConteudo() {
      if (delayTriggered) return;
      delayTriggered = true;
      delayEls.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('s2-delay-visible');
          el.querySelectorAll('.s2-reveal').forEach(r => {
            if (!r.classList.contains('s2-visible')) revealObserver.observe(r);
          });
          if (el.classList.contains('s2-reveal') && !el.classList.contains('s2-visible')) {
            revealObserver.observe(el);
          }
        }, i * 120);
      });
    }

    if (DELAY_SECONDS <= 0) {
      liberarConteudo();
    } else {
      const video = document.getElementById('vslVideo');
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
        .s2 {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-dim: #8A6D2F;
          --black: #0A0A0A;
          --dark: #111111;
          --surface: #181818;
          --surface2: #222222;
          --border: rgba(201,168,76,0.18);
          --text: #F0EDE6;
          --muted: #888880;
          --danger: #E55050;
          --green: #4CAF7D;
          --radius: 12px;
          --radius-lg: 20px;

          background: var(--black);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.65;
          overflow-x: hidden;
        }

        .s2 *, .s2 *::before, .s2 *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s2::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        .s2 h1, .s2 h2, .s2 h3, .s2 h4 {
          font-family: 'Playfair Display', serif;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .s2 .gold { color: var(--gold); }
        .s2 .gold-light { color: var(--gold-light); }
        .s2 .muted { color: var(--muted); }
        .s2 .danger-text { color: var(--danger); }
        .s2 .green-text { color: var(--green); }

        .s2 .container {
          width: 100%;
          max-width: 780px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .s2 section { position: relative; z-index: 1; }

        /* TOPBAR */
        .s2 .topbar {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 10px 20px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--gold);
          text-transform: uppercase;
        }
        .s2 .topbar span {
          display: inline-block;
          animation: s2-pulse-text 2s infinite;
        }
        @keyframes s2-pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        /* HERO */
        .s2 .hero {
          background: var(--dark);
          padding: 60px 20px 50px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .s2 .hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 500px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .s2 .hero-eyebrow {
          display: inline-block;
          background: rgba(201,168,76,0.12);
          border: 1px solid var(--border);
          color: var(--gold);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .s2 .hero h1 {
          font-size: clamp(28px, 6vw, 52px);
          color: var(--text);
          max-width: 720px;
          margin: 0 auto 20px;
        }
        .s2 .hero h1 em { font-style: italic; color: var(--gold-light); }
        .s2 .hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          color: var(--muted);
          max-width: 540px;
          margin: 0 auto 40px;
        }

        /* VÍDEO */
        .s2 .video-wrapper {
          max-width: 680px;
          margin: 0 auto 40px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          position: relative;
          background: #0D0D0D;
          box-shadow: 0 0 60px rgba(201,168,76,0.12), 0 30px 80px rgba(0,0,0,0.6);
        }
        .s2 .video-ratio {
          position: relative;
          padding-bottom: 56.25%;
          background: #0D0D0D;
        }
        .s2 .video-ratio video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #0D0D0D;
        }

        /* BOTÃO CTA */
        .s2 .btn-primary {
          display: inline-block;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 60%, var(--gold) 100%);
          background-size: 200% auto;
          color: #0A0A0A;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: clamp(14px, 2.5vw, 17px);
          letter-spacing: 0.02em;
          padding: 18px 40px;
          border-radius: var(--radius);
          text-decoration: none;
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 480px;
          text-align: center;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: 0 8px 32px rgba(201,168,76,0.35);
          animation: s2-cta-pulse 3s ease-in-out infinite;
        }
        @keyframes s2-cta-pulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(201,168,76,0.35); }
          50% { box-shadow: 0 8px 48px rgba(201,168,76,0.55); }
        }
        .s2 .btn-primary:hover { background-position: right center; transform: translateY(-2px); }

        .s2 .guarantee-note {
          margin-top: 12px;
          font-size: 12px;
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* SEÇÃO DORES */
        .s2 .pain {
          background: var(--dark);
          padding: 70px 20px;
          text-align: center;
        }
        .s2 .pain h2 { font-size: clamp(24px, 5vw, 40px); margin-bottom: 16px; }
        .s2 .pain-lead { color: var(--muted); max-width: 520px; margin: 0 auto 48px; font-size: 17px; }
        .s2 .pain-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 680px;
          margin: 0 auto;
        }
        @media(min-width: 600px) { .s2 .pain-grid { grid-template-columns: 1fr 1fr; } }
        .s2 .pain-card {
          background: var(--surface);
          border: 1px solid rgba(229,80,80,0.2);
          border-radius: var(--radius);
          padding: 24px;
          text-align: left;
          transition: border-color 0.3s;
        }
        .s2 .pain-card:hover { border-color: rgba(229,80,80,0.45); }
        .s2 .pain-icon { font-size: 28px; margin-bottom: 12px; display: block; }
        .s2 .pain-card h4 { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; margin-bottom: 8px; color: var(--text); }
        .s2 .pain-card p { font-size: 14px; color: var(--muted); line-height: 1.55; }

        /* SEÇÃO SCRIPT */
        .s2 .script-section {
          background: var(--surface);
          padding: 70px 20px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .s2 .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-dim);
          display: block;
          margin-bottom: 12px;
        }
        .s2 .script-section h2 { font-size: clamp(26px, 5vw, 42px); margin-bottom: 32px; }
        .s2 .quote-block {
          border-left: 3px solid var(--gold);
          padding: 20px 24px;
          background: rgba(201,168,76,0.05);
          border-radius: 0 var(--radius) var(--radius) 0;
          margin-bottom: 24px;
          font-size: clamp(16px, 2vw, 19px);
          color: var(--text);
          line-height: 1.7;
          font-style: italic;
        }
        .s2 .quote-block strong { font-style: normal; color: var(--gold-light); }

        /* SEÇÃO MECANISMO */
        .s2 .mechanism { padding: 70px 20px; background: var(--black); }
        .s2 .mechanism h2 { font-size: clamp(24px, 5vw, 40px); text-align: center; margin-bottom: 12px; }
        .s2 .mechanism-lead { text-align: center; color: var(--muted); max-width: 520px; margin: 0 auto 48px; }

        .s2 .compare-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 48px;
          font-size: 14px;
        }
        .s2 .compare-table thead { background: var(--surface2); }
        .s2 .compare-table th {
          padding: 14px 16px;
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--muted);
        }
        .s2 .compare-table th:last-child { color: var(--gold); background: rgba(201,168,76,0.1); }
        .s2 .compare-table td {
          padding: 13px 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          vertical-align: middle;
        }
        .s2 .compare-table td:first-child { text-align: left; color: var(--muted); }
        .s2 .compare-table td:last-child { background: rgba(201,168,76,0.05); color: var(--gold-light); font-weight: 600; }
        .s2 .compare-table tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        .s2 .compare-table tr:nth-child(even) td:last-child { background: rgba(201,168,76,0.07); }
        .s2 .x-icon { color: var(--danger); font-size: 18px; }
        .s2 .check-icon { color: var(--green); font-size: 18px; }

        .s2 .pillars {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 680px;
          margin: 0 auto;
        }
        @media(min-width: 600px) { .s2 .pillars { grid-template-columns: repeat(3, 1fr); } }
        .s2 .pillar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .s2 .pillar:hover { border-color: var(--gold); transform: translateY(-4px); }
        .s2 .pillar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .s2 .pillar-num {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: rgba(201,168,76,0.15);
          line-height: 1;
          margin-bottom: 8px;
          font-weight: 900;
        }
        .s2 .pillar h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--gold-light);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .s2 .pillar p { font-size: 14px; color: var(--muted); line-height: 1.6; }

        /* SEÇÃO OFERTA */
        .s2 .offer {
          background: var(--surface);
          padding: 70px 20px;
          border-top: 1px solid var(--border);
        }
        .s2 .offer h2 { font-size: clamp(26px, 5vw, 42px); text-align: center; margin-bottom: 8px; }
        .s2 .offer-sub { text-align: center; color: var(--muted); margin-bottom: 48px; font-size: 16px; }
        .s2 .offer-items {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          max-width: 680px;
          margin: 0 auto 40px;
        }
        .s2 .offer-item {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: border-color 0.3s;
        }
        .s2 .offer-item:hover { border-color: var(--gold); }
        .s2 .offer-item.main { border-color: var(--gold); background: rgba(201,168,76,0.06); }
        .s2 .offer-emoji { font-size: 28px; flex-shrink: 0; margin-top: 2px; }
        .s2 .offer-item-body { flex: 1; }
        .s2 .offer-item-body h4 { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .s2 .offer-item-body p { font-size: 13px; color: var(--muted); line-height: 1.5; }
        .s2 .offer-price-tag { font-size: 12px; font-weight: 600; color: var(--green); margin-top: 8px; font-family: 'DM Mono', monospace; }

        /* CAIXA PREÇO */
        .s2 .pricing-box {
          max-width: 520px;
          margin: 0 auto;
          background: var(--dark);
          border: 1px solid var(--gold);
          border-radius: var(--radius-lg);
          padding: 36px 28px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(201,168,76,0.12);
        }
        .s2 .pricing-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold-dim), var(--gold-light), var(--gold-dim));
        }
        .s2 .pricing-total-label { font-size: 13px; color: var(--muted); letter-spacing: 0.05em; margin-bottom: 4px; }
        .s2 .pricing-strike-value { font-size: 22px; color: var(--muted); text-decoration: line-through; margin-bottom: 16px; }
        .s2 .pricing-divider { width: 40px; height: 1px; background: var(--border); margin: 0 auto 16px; }
        .s2 .pricing-label-2 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-dim); margin-bottom: 8px; }
        .s2 .pricing-installments {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 8vw, 56px);
          color: var(--gold-light);
          line-height: 1;
          margin-bottom: 8px;
        }
        .s2 .pricing-installments span { font-size: 20px; color: var(--muted); vertical-align: super; margin-right: 4px; }
        .s2 .pricing-or { font-size: 13px; color: var(--muted); margin-bottom: 8px; }
        .s2 .pricing-cash { font-size: 22px; font-weight: 700; color: var(--gold); margin-bottom: 24px; }
        .s2 .pricing-box .btn-primary { font-size: 16px; padding: 18px 32px; }

        /* FAQ */
        .s2 .objections { padding: 70px 20px; background: var(--black); }
        .s2 .objections h2 { font-size: clamp(24px, 5vw, 40px); text-align: center; margin-bottom: 8px; }
        .s2 .objections-sub { text-align: center; color: var(--muted); margin-bottom: 48px; }
        .s2 .faq-list { max-width: 680px; margin: 0 auto; display: grid; gap: 12px; }
        .s2 .faq-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .s2 .faq-question {
          padding: 20px 24px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          user-select: none;
          transition: background 0.2s;
          color: var(--text);
        }
        .s2 .faq-question:hover { background: var(--surface2); }
        .s2 .faq-question::after {
          content: '+';
          font-size: 22px;
          color: var(--gold);
          flex-shrink: 0;
          transition: transform 0.3s;
          line-height: 1;
        }
        .s2 .faq-item.open .faq-question::after { transform: rotate(45deg); }
        .s2 .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .s2 .faq-item.open .faq-answer { max-height: 400px; }
        .s2 .faq-answer-inner {
          padding: 16px 24px 24px;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          border-top: 1px solid var(--border);
          margin: 0 24px;
        }

        /* PARA QUEM É */
        .s2 .for-who {
          background: var(--surface);
          padding: 70px 20px;
          border-top: 1px solid var(--border);
        }
        .s2 .for-who h2 { font-size: clamp(24px, 5vw, 40px); text-align: center; margin-bottom: 48px; }
        .s2 .who-grid { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 680px; margin: 0 auto; }
        @media(min-width: 600px) { .s2 .who-grid { grid-template-columns: 1fr 1fr; } }
        .s2 .who-box { border-radius: var(--radius); padding: 28px 24px; }
        .s2 .who-yes { background: rgba(76,175,125,0.08); border: 1px solid rgba(76,175,125,0.25); }
        .s2 .who-no { background: rgba(229,80,80,0.06); border: 1px solid rgba(229,80,80,0.2); }
        .s2 .who-box h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .s2 .who-yes h3 { color: var(--green); }
        .s2 .who-no h3 { color: var(--danger); }
        .s2 .who-list { list-style: none; display: grid; gap: 12px; }
        .s2 .who-list li { font-size: 14px; color: var(--muted); padding-left: 24px; position: relative; line-height: 1.5; }
        .s2 .who-list li::before { position: absolute; left: 0; top: 0; font-size: 14px; }
        .s2 .who-yes .who-list li::before { content: '✓'; color: var(--green); }
        .s2 .who-no .who-list li::before { content: '✕'; color: var(--danger); }

        /* CTA FINAL */
        .s2 .final-cta {
          background: var(--dark);
          padding: 80px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .s2 .final-cta::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .s2 .final-cta h2 { font-size: clamp(28px, 6vw, 50px); max-width: 640px; margin: 0 auto 24px; position: relative; }
        .s2 .final-cta p { color: var(--muted); max-width: 460px; margin: 0 auto 40px; font-size: 17px; position: relative; }
        .s2 .guarantee-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(76,175,125,0.08);
          border: 1px solid rgba(76,175,125,0.25);
          border-radius: var(--radius);
          padding: 14px 24px;
          margin-top: 28px;
          font-size: 14px;
          color: var(--green);
          max-width: 420px;
        }
        .s2 .guarantee-badge-icon { font-size: 28px; flex-shrink: 0; }

        /* RODAPÉ */
        .s2 footer {
          background: var(--black);
          border-top: 1px solid var(--border);
          padding: 32px 20px;
          text-align: center;
        }
        .s2 footer .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--gold);
          margin-bottom: 8px;
        }
        .s2 footer p { font-size: 12px; color: var(--muted); }
        .s2 footer a { color: var(--muted); text-decoration: none; margin: 0 8px; transition: color 0.2s; }
        .s2 footer a:hover { color: var(--text); }

        /* BARRA FLUTUANTE */
        .s2 .sticky-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 1000;
          background: var(--dark);
          border-top: 1px solid var(--gold);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transform: translateY(100%);
          transition: transform 0.4s ease;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.5);
        }
        .s2 .sticky-bar.s2-bar-visible { transform: translateY(0); }
        .s2 .sticky-bar-price { flex: 1; }
        .s2 .sticky-bar-price small { display: block; font-size: 10px; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
        .s2 .sticky-bar-price strong { font-size: 18px; color: var(--gold-light); font-family: 'Playfair Display', serif; }
        .s2 .btn-small {
          background: var(--gold);
          color: #0A0A0A;
          font-weight: 700;
          font-size: 13px;
          padding: 12px 20px;
          border-radius: var(--radius);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* DELAY */
        .s2-delay { display: none; }
        .s2-delay.s2-delay-visible {
          display: block;
          animation: s2-fadeSlideUp 0.7s ease forwards;
        }
        .s2 .sticky-bar.s2-delay-visible { display: flex; }
        a.btn-primary.s2-delay.s2-delay-visible,
        .guarantee-note.s2-delay.s2-delay-visible { display: inline-flex; }
        .guarantee-note.s2-delay.s2-delay-visible { display: flex; }
        @keyframes s2-fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* REVELAR */
        .s2-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .s2-reveal.s2-visible { opacity: 1; transform: translateY(0); }
        .s2-reveal.s2-reveal-delay-1 { transition-delay: 0.1s; }
        .s2-reveal.s2-reveal-delay-2 { transition-delay: 0.2s; }
        .s2-reveal.s2-reveal-delay-3 { transition-delay: 0.3s; }
        .s2-reveal.s2-reveal-delay-4 { transition-delay: 0.4s; }

        @media(max-width: 480px) {
          .s2 .hero { padding: 48px 16px 40px; }
          .s2 .btn-primary { padding: 16px 24px; }
          .s2 .pricing-box { padding: 28px 20px; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono&display=swap"
        rel="stylesheet"
      />

      <div className="s2">

        {/* TOPBAR */}
        <div className="topbar">
          <span>🔥 Assista ao vídeo completo antes de sair desta página</span>
        </div>

        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-eyebrow s2-reveal">Método Sintetiza PowerPoint</div>
            <h1 className="s2-reveal s2-reveal-delay-1">
              Chega de Ser <em>Ignorado</em> em Apresentações.<br />
              Aprenda a Prender CEOs e Diretores em Cada Slide.
            </h1>
            <p className="hero-sub s2-reveal s2-reveal-delay-2">
              Enquanto você apresenta, as pessoas estão no celular. Isso não é falta de conteúdo — é falta de método. E tem solução.
            </p>

            <div className="video-wrapper s2-reveal s2-reveal-delay-3">
              <div className="video-ratio">
                <video
                  id="vslVideo"
                  src="https://sintetizaeducacao.com.br/wp-content/uploads/2026/02/VSL-Sintetiza.mp4"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>

            <a href="#oferta" className="btn-primary s2-reveal s2-reveal-delay-4 s2-delay">
              Quero Apresentar com Autoridade →
            </a>
            <div className="guarantee-note s2-reveal s2-reveal-delay-4 s2-delay">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF7D" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Acesso imediato &nbsp;•&nbsp; 7 dias de garantia &nbsp;•&nbsp; Certificado incluso</span>
            </div>
          </div>
        </section>

        {/* SEÇÃO DORES */}
        <section className="pain s2-delay">
          <div className="container">
            <h2 className="s2-reveal">Você se Reconhece em <span className="gold">alguma dessas situações?</span></h2>
            <p className="pain-lead s2-reveal">São situações reais — e muito mais comuns do que parecem.</p>
            <div className="pain-grid">
              <div className="pain-card s2-reveal">
                <span className="pain-icon">📱</span>
                <h4>Celulares aparecem durante sua apresentação</h4>
                <p>Você está falando e percebe que a sala está dispersa. Conversas paralelas começam. A reunião vai por água abaixo.</p>
              </div>
              <div className="pain-card s2-reveal s2-reveal-delay-1">
                <span className="pain-icon">😶</span>
                <h4>Seu trabalho vale mais do que percebem</h4>
                <p>A entrega é excelente, mas a forma como você apresenta não comunica isso. O reconhecimento não vem.</p>
              </div>
              <div className="pain-card s2-reveal s2-reveal-delay-2">
                <span className="pain-icon">😅</span>
                <h4>Você trava na frente de líderes e diretores</h4>
                <p>Apresentar para o CEO ou a diretoria dá um frio no estômago que parece impossível de controlar.</p>
              </div>
              <div className="pain-card s2-reveal s2-reveal-delay-3">
                <span className="pain-icon">🎨</span>
                <h4>Slides que parecem amadores — mesmo com esforço</h4>
                <p>Você dedica horas, mas o resultado final parece genérico, sem identidade e longe do visual que você imagina.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO PROBLEMA REAL */}
        <section className="script-section s2-delay">
          <div className="container">
            <span className="section-label">O problema real</span>
            <h2 className="s2-reveal">Não é falta de <span className="gold">talento.</span><br />É falta de método.</h2>
            <div className="quote-block s2-reveal">
              A faculdade te ensinou teoria. O YouTube te ensinou a formatar slide. O Canva te ensinou a deixar bonito. Mas{' '}
              <strong>ninguém te ensinou a apresentar de um jeito que prende, convence e impressiona</strong> quem está do outro lado.
            </div>
            <div className="quote-block s2-reveal">
              Existe uma diferença brutal entre um slide bonito e um slide que <strong>funciona</strong>. Entre uma apresentação
              esquecida em 10 minutos... e uma que faz o diretor virar e perguntar:{' '}
              <strong>&apos;Quem é esse profissional?&apos;</strong>
            </div>
            <p className="s2-reveal" style={{ color: 'var(--muted)', fontSize: '16px', marginTop: '24px' }}>
              A Sintetiza Educação foi criada exatamente para fechar essa lacuna — com um método prático, direto e aplicável desde a primeira semana.
            </p>
          </div>
        </section>

        {/* SEÇÃO MECANISMO */}
        <section className="mechanism s2-delay">
          <div className="container">
            <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>O mecanismo</span>
            <h2 className="s2-reveal">Por que cursos tradicionais <span className="gold">não resolvem</span> isso</h2>
            <p className="mechanism-lead s2-reveal">Eles te ensinam o botão. O Sintetiza te ensina o porquê — e você sai resolvendo qualquer situação.</p>

            <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
              <table className="compare-table s2-reveal">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Critério</th>
                    <th>Ensino Tradicional</th>
                    <th>Método Sintetiza</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Abordagem', '✕ Teoria + teoria', '✓ Conceito + aplicação'],
                    ['Tempo para resultado', '✕ 1 a 2 anos', '✓ Até 30 dias'],
                    ['Foco', '✕ Design genérico', '✓ Comunicação e impacto'],
                    ['Templates', '✕ Genéricos, iguais', '✓ Estrutura personalizada'],
                    ['Prática', '✕ Aprende, não pratica', '✓ Pratica enquanto aprende'],
                  ].map(([criterio, negativo, positivo], i) => (
                    <tr key={i}>
                      <td>{criterio}</td>
                      <td><span className="x-icon">✕</span> {negativo.slice(2)}</td>
                      <td><span className="check-icon">✓</span> {positivo.slice(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pillars">
              <div className="pillar s2-reveal">
                <div className="pillar-num">01</div>
                <h4>Estrutura</h4>
                <p>Como organizar qualquer conteúdo para que faça sentido imediato — mesmo que o assunto seja complexo.</p>
              </div>
              <div className="pillar s2-reveal s2-reveal-delay-1">
                <div className="pillar-num">02</div>
                <h4>Visual com Intenção</h4>
                <p>Como criar slides que guiam o olhar, reforçam sua fala e eliminam as distrações que geram conversas paralelas.</p>
              </div>
              <div className="pillar s2-reveal s2-reveal-delay-2">
                <div className="pillar-num">03</div>
                <h4>Presença e Ritmo</h4>
                <p>Como apresentar com confiança e autoridade — mesmo que você treme na base na frente de diretores.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO OFERTA */}
        <section className="offer s2-delay" id="oferta">
          <div className="container">
            <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>A oferta completa</span>
            <h2 className="s2-reveal">Tudo que você leva <span className="gold">hoje</span></h2>
            <p className="offer-sub s2-reveal">Um ecossistema completo para transformar sua comunicação profissional.</p>

            <div className="offer-items">
              {[
                { emoji: '🎓', main: true, titulo: 'CURSO PRINCIPAL — PowerPoint Profissional do Zero ao Avançado', desc: 'Domine a ferramenta mais usada no mundo corporativo com profundidade real — de quem sabe usar para quem precisa impressionar.', valor: 'Valor: R$ 497', delay: '' },
                { emoji: '📐', main: false, titulo: 'BÔNUS #1 — Estrutura de Apresentações que Convencem', desc: 'Aprenda a montar o raciocínio antes de abrir o PowerPoint. A apresentação começa no papel, não na tela.', valor: 'Valor: R$ 197', delay: '' },
                { emoji: '🎨', main: false, titulo: 'BÔNUS #2 — Design Thinking Aplicado a Slides Corporativos', desc: 'Princípios de design que qualquer pessoa consegue aplicar — sem precisar de talento artístico.', valor: 'Valor: R$ 197', delay: 's2-reveal-delay-1' },
                { emoji: '📊', main: false, titulo: 'BÔNUS #3 — Biblioteca de Templates Profissionais Editáveis', desc: '+50 layouts prontos: relatório, pitch, onboarding, treinamento, proposta comercial.', valor: 'Valor: R$ 297', delay: 's2-reveal-delay-2' },
                { emoji: '🎤', main: false, titulo: 'BÔNUS #4 — Mini-Treinamento de Oratória para Apresentações Corporativas', desc: 'Porque o melhor slide do mundo não salva uma apresentação sem confiança e presença.', valor: 'Valor: R$ 147', delay: 's2-reveal-delay-3' },
                { emoji: '🏅', main: false, titulo: 'CERTIFICADO DE CONCLUSÃO RECONHECIDO', desc: 'Para colocar no LinkedIn, currículo e mostrar que você levou o desenvolvimento profissional a sério.', valor: 'Incluso', delay: 's2-reveal-delay-4' },
              ].map((item, i) => (
                <div className={`offer-item${item.main ? ' main' : ''} s2-reveal${item.delay ? ' ' + item.delay : ''}`} key={i}>
                  <span className="offer-emoji">{item.emoji}</span>
                  <div className="offer-item-body">
                    <h4>{item.titulo}</h4>
                    <p>{item.desc}</p>
                    <span className="offer-price-tag">{item.valor}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-box s2-reveal">
              <p className="pricing-total-label">Valor total do pacote completo</p>
              <p className="pricing-strike-value">R$ 1.335</p>
              <div className="pricing-divider"></div>
              <p className="pricing-label-2">Hoje, por apenas</p>
              <div className="pricing-installments">
                <span>12x</span> R$47
              </div>
              <p className="pricing-or">ou</p>
              <p className="pricing-cash">R$ 497 à vista</p>
              <a href="#" className="btn-primary" style={{ display: 'block' }}>
                Quero Apresentar com Autoridade →
              </a>
              <div className="guarantee-note" style={{ marginTop: '16px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF7D" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Acesso imediato &nbsp;•&nbsp; Pagamento 100% seguro</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="objections s2-delay">
          <div className="container">
            <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>Suas dúvidas</span>
            <h2 className="s2-reveal">Respostas <span className="gold">honestas</span><br />para as dúvidas reais</h2>
            <p className="objections-sub s2-reveal">Sem rodeios. Sem enrolação.</p>
            <div className="faq-list">
              {[
                {
                  p: 'Não tenho talento para design. Conseguirei fazer isso?',
                  r: 'Boa notícia: você não precisa ter talento. Você precisa de método. Design de apresentação não é arte — é comunicação visual com regras claras. O método Sintetiza te ensina exatamente quais regras aplicar, em qual ordem, em qualquer situação. Alunos que nunca tinham aberto o PowerPoint profissionalmente saíram criando apresentações que receberam elogios de diretores. O talento vem depois da técnica.',
                },
                {
                  p: 'Não tenho tempo. Minha rotina já está cheia.',
                  r: 'O curso foi desenhado para ser consumido em blocos curtos — você consegue progredir com 20 a 30 minutos por dia. E o mais importante: você começa a aplicar imediatamente. Isso significa que cada minuto investido no curso já gera resultado na semana seguinte. Não é mais um curso para terminar um dia — é uma habilidade que você usa enquanto aprende.',
                },
                {
                  p: 'Já assisti tutoriais no YouTube. O que isso tem de diferente?',
                  r: 'Tutorial te ensina o botão. O método te ensina o porquê por trás de cada decisão. Você sai do YouTube sabendo fazer uma coisa específica — e sai da Sintetiza sabendo resolver qualquer situação de apresentação, mesmo as que nunca viu antes. É a diferença entre decorar uma receita e saber cozinhar.',
                },
                {
                  p: 'Minha empresa usa Google Slides. Funciona para mim?',
                  r: 'Os princípios do método — estrutura, hierarquia visual, ritmo narrativo — funcionam em qualquer ferramenta. O PowerPoint é o ambiente de prática, mas o que você aprende se transfere diretamente para qualquer plataforma. Alunos que migraram para Google Slides relataram que aplicaram tudo sem dificuldade.',
                },
                {
                  p: 'E se eu não gostar? Perco meu dinheiro?',
                  r: 'Não. Você tem 7 dias de garantia incondicional. Se por qualquer motivo — ou sem motivo nenhum — você sentir que não era para você, basta pedir o reembolso e devolvemos 100% do valor. Sem burocracia, sem questionamento. O risco é zero. A decisão de continuar sendo ignorado em reuniões — esse sim é o risco real.',
                },
              ].map((faq, i) => (
                <div className="faq-item s2-reveal" key={i}>
                  <div className="faq-question">{faq.p}</div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARA QUEM É */}
        <section className="for-who s2-delay">
          <div className="container">
            <h2 className="s2-reveal">Para <span className="gold">quem é</span> — e para quem <span className="danger-text">não é</span></h2>
            <div className="who-grid">
              <div className="who-box who-yes s2-reveal">
                <h3>✅ É para você se...</h3>
                <ul className="who-list">
                  <li>Você é profissional corporativo que precisa apresentar resultados e quer ser levado a sério</li>
                  <li>Você é gestor, coordenador ou líder que quer transmitir autoridade e clareza</li>
                  <li>Você é analista que domina o conteúdo, mas trava na hora de comunicar com impacto</li>
                  <li>Você é consultor ou empreendedor que apresenta para clientes e quer fechar mais</li>
                  <li>Você quer se destacar e sabe que comunicação é a habilidade mais subestimada</li>
                </ul>
              </div>
              <div className="who-box who-no s2-reveal s2-reveal-delay-1">
                <h3>❌ Não é para você se...</h3>
                <ul className="who-list">
                  <li>Você quer aprender design gráfico avançado e se tornar um profissional de criação</li>
                  <li>Você busca curso teórico e acadêmico sem compromisso com aplicação prática</li>
                  <li>Você acredita que apresentação não faz diferença na carreira</li>
                  <li>Você não pretende implementar o que aprender — prefere colecionar cursos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="final-cta s2-delay">
          <div className="container">
            <h2 className="s2-reveal">
              A próxima apresentação vai ser <em>diferente</em> — ou vai ser igual à última.
            </h2>
            <p className="s2-reveal">A escolha é sua. O método já está pronto. O que falta é a decisão.</p>
            <a href="#oferta" className="btn-primary s2-reveal" style={{ display: 'inline-block', width: 'auto' }}>
              Quero Apresentar com Autoridade →
            </a>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="guarantee-badge s2-reveal">
                <span className="guarantee-badge-icon">🛡️</span>
                <span>
                  <strong style={{ color: 'var(--text)' }}>Garantia de 7 dias.</strong>{' '}
                  Se não gostar, devolvemos 100% do valor. Sem perguntas.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer>
          <div className="logo-text">Sintetiza Educação</div>
          <p>© 2026 Sintetiza Educação — Todos os direitos reservados.</p>
          <p style={{ marginTop: '6px' }}>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </p>
          <p style={{ marginTop: '14px', fontSize: '11px', color: 'rgba(136,136,128,0.5)' }}>
            Desenvolvido por{' '}
            <a href="https://buenomidias.com.br" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-dim)', textDecoration: 'none' }}>
              BuenoMídias
            </a>
          </p>
        </footer>

        {/* BARRA FLUTUANTE */}
        <div className="sticky-bar s2-delay" id="stickyBar">
          <div className="sticky-bar-price">
            <small>Oferta especial</small>
            <strong>12x de R$47</strong>
          </div>
          <a href="#oferta" className="btn-small">Garantir Vaga →</a>
        </div>

      </div>
    </>
  );
}
