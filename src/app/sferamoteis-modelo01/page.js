'use client';

import { useEffect } from 'react';

export default function SferaMoteis() {

  useEffect(() => {
    // Atualiza o ano automaticamente
    const anoEl = document.getElementById('ano-atual');
    if (anoEl) anoEl.textContent = new Date().getFullYear();

    // Mostrar popup ao carregar a página (se não foi mostrado antes)
    const popupJaMostrado = localStorage.getItem('popupMostrado');
    if (!popupJaMostrado) {
      setTimeout(function () {
        const popup = document.getElementById('popupBoasVindas');
        if (popup) popup.classList.add('ativo');
      }, 800);
    }

    // Fechar popup com tecla ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') fecharPopup();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function fecharPopup() {
    const popup = document.getElementById('popupBoasVindas');
    if (popup) popup.classList.remove('ativo');
    localStorage.setItem('popupMostrado', 'true');
  }

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Breath';
          src: url('fontes/Breath-Regular.woff2') format('woff2'),
               url('fontes/Breath-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Breath';
          src: url('fontes/Breath-Medium.woff2') format('woff2'),
               url('fontes/Breath-Medium.woff') format('woff');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Breath';
          src: url('fontes/Breath-Bold.woff2') format('woff2'),
               url('fontes/Breath-Bold.woff') format('woff');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --cor-primaria: #6B4423;
          --cor-secundaria: #54361C;
          --fundo-escuro: #1a1a1a;
          --texto-claro: #ffffff;
          --texto-cinza: #cccccc;
          --fundo-card: #2a2a2a;
          --overlay-hover: rgba(107, 68, 35, 0.9);
        }
        body {
          font-family: 'Montserrat', sans-serif;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          color: var(--texto-claro);
          line-height: 1.6;
          overflow-x: hidden;
        }
        .cabecalho-principal {
          text-align: center;
          padding: 40px 20px 15px;
          background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
        }
        @media (min-width: 768px) {
          .cabecalho-principal { padding: 60px 20px 20px; }
        }
        .logo-sfera {
          font-family: 'Breath', 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          background: linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-secundaria) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 8px;
        }
        .subtitulo-principal {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: var(--texto-cinza);
          font-weight: 300;
          max-width: 700px;
          margin: 0 auto 15px;
          line-height: 1.8;
        }
        .texto-secundario {
          font-size: clamp(0.9rem, 2vw, 1rem);
          color: var(--texto-cinza);
          font-weight: 400;
          margin-top: 10px;
        }
        .container-principal {
          max-width: 1200px;
          margin: 0 auto;
          padding: 15px 15px 30px;
        }
        @media (min-width: 768px) {
          .container-principal { padding: 20px 20px 40px; }
        }
        .grade-unidades {
          display: grid;
          grid-template-columns: 1fr;
          gap: 25px;
          margin: 15px 0 40px;
        }
        @media (min-width: 768px) {
          .grade-unidades {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 20px 0 50px;
          }
        }
        .card-unidade {
          background: var(--fundo-card);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          animation: surgirDeBaixo 0.6s ease forwards;
        }
        .card-unidade:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 50px rgba(107, 68, 35, 0.4);
          z-index: 10;
        }
        .imagem-unidade {
          width: 100%;
          height: 300px;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }
        .imagem-unidade::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
        }
        .card-unidade:hover .imagem-unidade::before {
          background: var(--overlay-hover);
        }
        .imagem-unidade-rio-motel {
          background-image: url('https://sferamoteis.com.br/wp-content/uploads/2026/02/rio-motel-manaus.webp');
        }
        .imagem-unidade-sfera-motel {
          background-image: url('https://sferamoteis.com.br/wp-content/uploads/2026/02/sfera-motel-manaus.webp');
        }
        .imagem-unidade-eden-pousada {
          background-image: url('https://sferamoteis.com.br/wp-content/uploads/2026/02/eden-motel-manaus.webp');
        }
        .selo-unidade {
          position: absolute;
          top: 20px; right: 20px;
          background: var(--cor-primaria);
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          z-index: 2;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .conteudo-unidade { padding: 30px; }
        .nome-unidade {
          font-family: 'Breath', 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 1.8rem);
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--texto-claro);
          letter-spacing: 2px;
        }
        .localizacao-unidade {
          font-size: 0.95rem;
          color: var(--texto-cinza);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .localizacao-unidade::before { content: "📍"; font-size: 1.1rem; }
        .descricao-unidade {
          font-size: 0.95rem;
          color: var(--texto-cinza);
          line-height: 1.7;
          margin-bottom: 25px;
        }
        .botao-ver-localizacao {
          display: inline-block;
          background: linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-secundaria) 100%);
          color: white;
          padding: 14px 35px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          box-shadow: 0 5px 15px rgba(107, 68, 35, 0.3);
          text-align: center;
        }
        .botao-ver-localizacao:hover {
          transform: scale(1.08);
          box-shadow: 0 15px 40px rgba(107, 68, 35, 0.6);
          color: white;
        }
        .secao-chamada-acao {
          background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.98) 100%);
          padding: 50px 20px;
          border-radius: 15px;
          text-align: center;
          margin: 40px 0;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .secao-chamada-acao { padding: 80px 30px; border-radius: 20px; margin: 60px 0; }
        }
        .secao-chamada-acao::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://sferamoteis.com.br/wp-content/uploads/2026/02/sfera-motel-manaus.webp') center/cover;
          opacity: 0.15;
          z-index: 0;
        }
        .secao-chamada-acao > * { position: relative; z-index: 1; }
        .secao-chamada-acao h2 {
          font-family: 'Breath', 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin-bottom: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 2px;
        }
        .secao-chamada-acao p {
          font-size: clamp(1rem, 2vw, 1.1rem);
          margin-bottom: 40px;
          opacity: 0.9;
          color: #ffffff;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .grupo-botoes-app {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
        }
        @media (min-width: 768px) {
          .grupo-botoes-app { flex-direction: row; gap: 20px; }
        }
        .botao-loja-app {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-secundaria) 100%);
          color: white;
          padding: 12px 25px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(107, 68, 35, 0.4);
          width: 100%;
          max-width: 280px;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .botao-loja-app { width: auto; min-width: 200px; }
        }
        .texto-botao-app { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.3; }
        .texto-pequeno-app { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 400; opacity: 0.95; }
        .texto-grande-app { font-size: 1.1rem; font-weight: 700; }
        .botao-loja-app:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(107, 68, 35, 0.6);
          color: white;
        }
        .rodape-principal {
          text-align: center;
          padding: 40px 20px;
          color: var(--texto-cinza);
          font-size: 0.9rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .rodape-principal p { margin-bottom: 10px; }
        .link-desenvolvedor { color: var(--cor-primaria); text-decoration: none; font-weight: 500; }
        .link-desenvolvedor:hover { text-decoration: underline; }
        .creditos-desenvolvedor { margin-top: 20px; font-size: 0.75rem; opacity: 0.7; }
        @media (max-width: 767px) { .imagem-unidade { height: 250px; } }
        @media (min-width: 768px) { .imagem-unidade { height: 300px; } }
        @keyframes surgirDeBaixo {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-unidade:nth-child(1) { animation-delay: 0.1s; }
        .card-unidade:nth-child(2) { animation-delay: 0.2s; }
        .card-unidade:nth-child(3) { animation-delay: 0.3s; }
        .overlay-popup {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .overlay-popup.ativo { opacity: 1; visibility: visible; }
        .popup-conteudo {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          padding: 40px 25px;
          border-radius: 15px;
          max-width: 600px;
          width: 90%;
          text-align: center;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          border: 2px solid var(--cor-primaria);
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }
        @media (min-width: 768px) {
          .popup-conteudo { padding: 50px 40px; border-radius: 20px; }
        }
        .overlay-popup.ativo .popup-conteudo { transform: scale(1); }
        .popup-fechar {
          position: absolute;
          top: 20px; right: 20px;
          background: none;
          border: none;
          color: var(--texto-cinza);
          font-size: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          line-height: 1;
          width: 40px; height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-fechar:hover { color: white; transform: rotate(90deg); }
        .popup-titulo {
          font-family: 'Breath', 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          color: var(--cor-primaria);
          margin-bottom: 20px;
          font-weight: 700;
          letter-spacing: 2px;
        }
        .popup-texto {
          font-size: 1.1rem;
          color: var(--texto-cinza);
          line-height: 1.8;
          margin-bottom: 30px;
        }
        .popup-botoes-app {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          .popup-botoes-app { flex-direction: row; gap: 15px; }
        }
        .popup-botao-app {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-secundaria) 100%);
          color: white;
          padding: 14px 25px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(107, 68, 35, 0.4);
          width: 100%;
          max-width: 280px;
        }
        @media (min-width: 768px) {
          .popup-botao-app { width: auto; min-width: 200px; }
        }
        .popup-botao-app:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(107, 68, 35, 0.6);
          color: white;
        }
        .popup-texto-app { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.3; }
        .popup-texto-pequeno { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.95; }
        .popup-texto-grande { font-size: 1.1rem; font-weight: 700; }
        .link-privacidade { color: inherit; text-decoration: none; }
        .link-privacidade:hover { text-decoration: underline; }
      `}</style>

      {/* Fontes do Google */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Popup de Boas-Vindas */}
      <div className="overlay-popup" id="popupBoasVindas" onClick={(e) => { if (e.target === e.currentTarget) fecharPopup(); }}>
        <div className="popup-conteudo">
          <button className="popup-fechar" onClick={fecharPopup}>&times;</button>
          <h2 className="popup-titulo">Baixe Nosso App!</h2>
          <p className="popup-texto">
            Reserve sua suíte favorita em poucos cliques. Escolha o horário, selecione a unidade ideal e confirme tudo pelo app. Rápido, fácil e seguro!
          </p>
          <div className="popup-botoes-app">
            <a href="https://play.google.com/store/apps/details?id=br.com.guiademoteis.sferamotel" target="_blank" rel="noopener noreferrer" className="popup-botao-app">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span className="popup-texto-app">
                <span className="popup-texto-pequeno">DISPONÍVEL NO</span>
                <span className="popup-texto-grande">Google Play</span>
              </span>
            </a>
            <a href="https://apps.apple.com/br/app/sfera-motel/id6747433998" target="_blank" rel="noopener noreferrer" className="popup-botao-app">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
              <span className="popup-texto-app">
                <span className="popup-texto-pequeno">BAIXAR NA</span>
                <span className="popup-texto-grande">App Store</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Cabeçalho */}
      <header className="cabecalho-principal">
        <h1 className="logo-sfera">Sfera Motéis</h1>
        <p className="subtitulo-principal">
          Escolha sua unidade e descubra suítes exclusivas, conforto e experiências inesquecíveis.
        </p>
        <p className="texto-secundario">
          Selecione seu destino e aproveite o melhor da hospitalidade Sfera!
        </p>
      </header>

      {/* Container principal */}
      <div className="container-principal">
        <div className="grade-unidades">

          {/* Card Rio Motel */}
          <div className="card-unidade">
            <div className="imagem-unidade imagem-unidade-rio-motel">
              <span className="selo-unidade">Destaque</span>
            </div>
            <div className="conteudo-unidade">
              <h2 className="nome-unidade">Rio Motel</h2>
              <p className="localizacao-unidade">Conforto e sofisticação</p>
              <p className="descricao-unidade">
                Experimente momentos únicos em suítes projetadas para proporcionar máxima privacidade e conforto.
                Ambiente acolhedor com toda infraestrutura que você merece.
              </p>
              <a href="https://share.google/UCR3XpmnozsypT80O" target="_blank" rel="noopener noreferrer" className="botao-ver-localizacao">Ver Localização</a>
            </div>
          </div>

          {/* Card Sfera Motel */}
          <div className="card-unidade">
            <div className="imagem-unidade imagem-unidade-sfera-motel">
              <span className="selo-unidade">Premium</span>
            </div>
            <div className="conteudo-unidade">
              <h2 className="nome-unidade">Sfera Motel</h2>
              <p className="localizacao-unidade">Experiência completa</p>
              <p className="descricao-unidade">
                Nossa unidade principal oferece suítes temáticas, ambiente moderno e serviços diferenciados.
                O lugar perfeito para criar memórias especiais com máximo requinte.
              </p>
              <a href="https://share.google/jmtpUOZFUTzfwLbxZ" target="_blank" rel="noopener noreferrer" className="botao-ver-localizacao">Ver Localização</a>
            </div>
          </div>

          {/* Card Éden Pousada */}
          <div className="card-unidade">
            <div className="imagem-unidade imagem-unidade-eden-pousada">
              <span className="selo-unidade">Relaxante</span>
            </div>
            <div className="conteudo-unidade">
              <h2 className="nome-unidade">Éden Pousada</h2>
              <p className="localizacao-unidade">Tranquilidade e charme</p>
              <p className="descricao-unidade">
                Um refúgio perfeito para quem busca paz e romantismo. Ambientes charmosos,
                aconchegantes e preparados para proporcionar momentos inesquecíveis a dois.
              </p>
              <a href="https://share.google/Hn4d7aP64m0hjXA2Y" target="_blank" rel="noopener noreferrer" className="botao-ver-localizacao">Ver Localização</a>
            </div>
          </div>

        </div>

        {/* Seção CTA */}
        <div className="secao-chamada-acao">
          <h2>Garanta sua suíte favorita!</h2>
          <p>Faça sua reserva direto pelo nosso app. Escolha a suíte ideal, selecione o horário e confirme tudo em poucos cliques.</p>
          <div className="grupo-botoes-app">
            <a href="https://play.google.com/store/apps/details?id=br.com.guiademoteis.sferamotel" target="_blank" rel="noopener noreferrer" className="botao-loja-app">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span className="texto-botao-app">
                <span className="texto-pequeno-app">DISPONÍVEL NO</span>
                <span className="texto-grande-app">Google Play</span>
              </span>
            </a>
            <a href="https://apps.apple.com/br/app/sfera-motel/id6747433998" target="_blank" rel="noopener noreferrer" className="botao-loja-app">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
              <span className="texto-botao-app">
                <span className="texto-pequeno-app">BAIXAR NA</span>
                <span className="texto-grande-app">App Store</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="rodape-principal">
        <p>
          &copy; <span id="ano-atual"></span> Sfera Motéis -{' '}
          <a href="https://sferamoteis.com.br/privacy-policy/" target="_blank" rel="noopener noreferrer" className="link-privacidade">
            Todos os direitos reservados
          </a>
        </p>
        <p>Rio Motel | Sfera Motel | Éden Pousada</p>
        <p className="creditos-desenvolvedor">
          Desenvolvido por{' '}
          <a href="https://buenomidias.com.br" target="_blank" rel="noopener noreferrer" className="link-desenvolvedor">
            Bueno Mídias
          </a>
        </p>
      </footer>
    </>
  );
}