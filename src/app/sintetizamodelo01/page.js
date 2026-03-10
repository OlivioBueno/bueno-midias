'use client';
// 'use client' é uma diretiva do Next.js App Router.
// Ela informa ao Next.js que este componente deve rodar no navegador (client-side),
// e não apenas no servidor. É obrigatória quando usamos hooks como useEffect,
// ou quando precisamos acessar APIs do browser como document, window, etc.

import { useEffect } from 'react';
// useEffect é um hook do React que executa código com "efeitos colaterais"
// após a renderização do componente. Aqui usamos para:
//  1) Configurar animações de scroll (IntersectionObserver)
//  2) Adicionar eventos de clique (acordeão FAQ)
//  3) Monitorar o scroll para mostrar a barra flutuante
//  4) Controlar o sistema de delay baseado no vídeo

export default function SintetizaModelo01() {
  // Este é o componente principal da página. Em Next.js, o arquivo page.js
  // dentro de uma pasta define automaticamente uma rota — neste caso /sintetizamodelo01.
  // "export default" significa que este é o componente exportado por padrão do arquivo.

  useEffect(() => {
    // O array vazio [] como segundo argumento garante que este efeito
    // roda apenas UMA VEZ, logo após o primeiro render do componente.
    // Isso é equivalente ao "componentDidMount" do React de classe.

    // ─────────────────────────────────────────────────────────────
    // BLOCO 1: ANIMAÇÃO DE ENTRADA AO ROLAR (SCROLL REVEAL)
    // ─────────────────────────────────────────────────────────────
    // Seleciona todos os elementos com classe .revelar na página.
    // Esses elementos começam invisíveis (opacity: 0) e sobem suavemente
    // quando entram na área visível da tela.
    const elementosReveal = document.querySelectorAll('.revelar');

    // IntersectionObserver é uma API nativa do browser que observa quando
    // um elemento entra ou sai da viewport (área visível da tela).
    // É muito mais eficiente do que ficar calculando posições no evento scroll.
    const observadorReveal = new IntersectionObserver((entradas) => {
      // "entradas" é um array de objetos — um para cada elemento observado
      // que mudou de estado (entrou ou saiu da tela).
      entradas.forEach(entrada => {
        // isIntersecting é true quando o elemento está visível na tela
        if (entrada.isIntersecting) {
          // Adiciona a classe .visivel que ativa a transição CSS (opacity: 1, translateY: 0)
          entrada.target.classList.add('visivel');

          // Para de observar este elemento — a animação só deve ocorrer uma vez.
          // Isso evita que o observer continue gastando recursos desnecessariamente.
          observadorReveal.unobserve(entrada.target);
        }
      });
    }, {
      threshold: 0.1,
      // threshold: 0.1 significa "dispare quando 10% do elemento estiver visível".
      // Valor entre 0 (qualquer pixel) e 1 (elemento 100% visível).

      rootMargin: '0px 0px -40px 0px'
      // rootMargin funciona como um margin fictício na viewport.
      // '-40px' no bottom significa: "considere a viewport 40px menor na parte de baixo".
      // Isso faz com que o elemento precise subir um pouco mais antes de ser revelado,
      // criando um efeito mais natural de entrada.
    });

    // Percorre todos os elementos .revelar e decide quais observar agora.
    // Elementos dentro de um bloco .delay só devem ser revelados DEPOIS
    // que o delay liberar o conteúdo — então não os observamos ainda.
    elementosReveal.forEach(el => {
      const dentroDe  = el.closest('.delay');      // verifica se tem um ancestral .delay
      const elEhDelay = el.classList.contains('delay'); // verifica se o próprio elemento é .delay
      if (!dentroDe && !elEhDelay) observadorReveal.observe(el);
      // Só observa o elemento se ele NÃO estiver dentro de um .delay
      // e NÃO for ele mesmo um .delay
    });

    // ─────────────────────────────────────────────────────────────
    // BLOCO 2: ACORDEÃO DO FAQ
    // ─────────────────────────────────────────────────────────────
    // Seleciona todas as perguntas clicáveis do FAQ
    const perguntas = document.querySelectorAll('.pergunta-faq');

    perguntas.forEach(pergunta => {
      pergunta.addEventListener('click', () => {
        // Identifica o item-faq pai (que contém pergunta + resposta)
        const item     = pergunta.parentElement;

        // Verifica se este item já está aberto antes de fechar todos
        const estaAberto = item.classList.contains('aberto');

        // Fecha TODOS os itens abertos — comportamento acordeão:
        // só um item aberto por vez
        document.querySelectorAll('.item-faq').forEach(i => i.classList.remove('aberto'));

        // Se o item clicado estava fechado, abre ele.
        // Se estava aberto, a linha acima já fechou — comportamento de toggle.
        if (!estaAberto) item.classList.add('aberto');
        // A abertura/fechamento é feita por CSS: max-height 0 → 400px
        // com transition, criando a animação suave de expansão.
      });
    });

    // ─────────────────────────────────────────────────────────────
    // BLOCO 3: BARRA FLUTUANTE DE CTA
    // ─────────────────────────────────────────────────────────────
    // A barra flutuante aparece na parte inferior da tela quando o
    // usuário rola além de 600px — uma técnica comum em landing pages
    // para manter o call-to-action sempre visível sem atrapalhar a leitura inicial.
    const barraFlutuante = document.getElementById('barraFlutuante');

    const onScroll = () => {
      // Segurança: se o elemento não existir ou ainda não foi liberado pelo delay, sai.
      // A barra só aparece depois que o delay a tornar visível (delay-visivel),
      // evitando que apareça antes do momento certo.
      if (!barraFlutuante || !barraFlutuante.classList.contains('delay-visivel')) return;

      // Adiciona ou remove a classe .visivel dependendo do scroll atual.
      // window.scrollY é a quantidade de pixels rolados verticalmente.
      if (window.scrollY > 600) barraFlutuante.classList.add('visivel');
      else                       barraFlutuante.classList.remove('visivel');
      // O CSS controla a animação: transform: translateY(100%) → translateY(0)
      // fazendo a barra deslizar para cima a partir de baixo da tela.
    };

    // Registra o listener de scroll — será executado toda vez que o usuário rolar.
    window.addEventListener('scroll', onScroll);

    // ─────────────────────────────────────────────────────────────
    // BLOCO 4: SISTEMA DE DELAY — LIBERA CONTEÚDO APÓS O VÍDEO
    // ─────────────────────────────────────────────────────────────
    // Esta é a lógica central da página de vendas (VSL - Video Sales Letter).
    // Elementos com classe .delay ficam escondidos até que o usuário
    // assista o vídeo até determinado ponto (ou até um tempo máximo passar).
    // Isso incentiva o usuário a assistir o conteúdo antes de ver o preço/CTA.

    const SEGUNDOS_DELAY = 180; /* ← ALTERE AQUI: quantos segundos de vídeo antes de liberar o conteúdo */
    // Se SEGUNDOS_DELAY for 0 ou negativo, tudo é liberado imediatamente (bom para testes).

    // Seleciona todos os elementos que estão "trancados" pelo delay
    const elementosDelay = document.querySelectorAll('.delay');

    // Flag para garantir que a liberação ocorra apenas uma vez,
    // mesmo que múltiplos eventos tentem chamar a função
    let delayDisparado   = false;

    function liberarConteudo() {
      // Proteção contra chamadas múltiplas (ex: timeupdate + timeout disparando juntos)
      if (delayDisparado) return;
      delayDisparado = true;

      // Percorre cada elemento .delay e o libera com uma pequena defasagem
      // entre eles (120ms * índice), criando um efeito visual escalonado —
      // os blocos aparecem um após o outro, não todos ao mesmo tempo.
      elementosDelay.forEach((el, indice) => {
        setTimeout(() => {
          // Adiciona a classe que torna o elemento visível (CSS: display: block + animação)
          el.classList.add('delay-visivel');

          // Agora que o bloco está visível, podemos começar a observar seus
          // filhos .revelar para a animação de scroll individual
          el.querySelectorAll('.revelar').forEach(filho => {
            if (!filho.classList.contains('visivel')) observadorReveal.observe(filho);
          });

          // Se o próprio elemento for .revelar, também o observa
          if (el.classList.contains('revelar') && !el.classList.contains('visivel')) {
            observadorReveal.observe(el);
          }
        }, indice * 120); // 120ms de delay entre cada elemento (0ms, 120ms, 240ms, 360ms...)
      });
    }

    if (SEGUNDOS_DELAY <= 0) {
      // Se delay for zero, libera tudo na hora (útil em ambiente de desenvolvimento)
      liberarConteudo();
    } else {
      // Tenta encontrar o elemento de vídeo na página
      const video = document.getElementById('videoVsl');

      if (video) {
        // "timeupdate" é disparado frequentemente enquanto o vídeo toca.
        // Verificamos se o tempo atual já passou do ponto de liberação.
        const onTimeUpdate = () => {
          if (video.currentTime >= SEGUNDOS_DELAY) liberarConteudo();
        };
        video.addEventListener('timeupdate', onTimeUpdate);

        // Timer de segurança: mesmo que o usuário não assista o vídeo,
        // o conteúdo é liberado após (SEGUNDOS_DELAY * 1000 + 5000) milissegundos.
        // O +5000 (5 segundos) dá uma folga para o caso de o vídeo travar levemente.
        const timer = setTimeout(liberarConteudo, SEGUNDOS_DELAY * 1000 + 5000);

        // Função de limpeza (cleanup) do useEffect:
        // É executada quando o componente é desmontado (ex: navegação para outra página).
        // Remove todos os event listeners para evitar memory leaks.
        return () => {
          video.removeEventListener('timeupdate', onTimeUpdate); // remove listener do vídeo
          clearTimeout(timer);                                    // cancela o timer de segurança
          window.removeEventListener('scroll', onScroll);        // remove listener de scroll
          // Clona os elementos de pergunta para remover todos os listeners de clique
          // (técnica de "reset" de event listeners sem referência direta)
          perguntas.forEach(p => p.replaceWith(p.cloneNode(true)));
        };
      } else {
        // Se não há vídeo na página, libera o conteúdo imediatamente
        liberarConteudo();
      }
    }

    // ─────────────────────────────────────────────────────────────
    // BLOCO 5: PROTEÇÃO CONTRA CÓPIA DE CONTEÚDO
    // ─────────────────────────────────────────────────────────────
    const bloquearCopia   = (e) => e.preventDefault();
    const bloquearMenu    = (e) => e.preventDefault();
    const bloquearSelecao = (e) => e.preventDefault();
    const bloquearTeclado = (e) => {
      const tecla = e.key.toLowerCase();
      // Bloqueia Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+U (ver fonte), Ctrl+S, Ctrl+P
      if (e.ctrlKey && ['c','a','x','u','s','p'].includes(tecla)) e.preventDefault();
      // Bloqueia F12 e PrintScreen
      if (e.key === 'F12' || e.key === 'PrintScreen') e.preventDefault();
    };

    document.addEventListener('copy',        bloquearCopia);
    document.addEventListener('cut',         bloquearCopia);
    document.addEventListener('contextmenu', bloquearMenu);
    document.addEventListener('selectstart', bloquearSelecao);
    document.addEventListener('keydown',     bloquearTeclado);

    // Aplica user-select: none via CSS inline no body
    document.body.style.userSelect = 'none';

    // Cleanup alternativo para o caso de SEGUNDOS_DELAY === 0
    // (quando o bloco if/else acima não retorna a função de cleanup com o vídeo)
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('copy',        bloquearCopia);
      document.removeEventListener('cut',         bloquearCopia);
      document.removeEventListener('contextmenu', bloquearMenu);
      document.removeEventListener('selectstart', bloquearSelecao);
      document.removeEventListener('keydown',     bloquearTeclado);
      document.body.style.userSelect = '';
    };
  }, []); // ← array de dependências vazio: roda só uma vez após o primeiro render

  // ─────────────────────────────────────────────────────────────
  // ESTRUTURA JSX — O QUE É RENDERIZADO NA TELA
  // ─────────────────────────────────────────────────────────────
  // JSX é uma extensão de sintaxe que permite escrever HTML dentro do JavaScript.
  // O React transforma esse JSX em chamadas React.createElement() internamente.
  // Regras importantes do JSX:
  //  - "class" vira "className" (class é palavra reservada em JS)
  //  - Estilos inline usam objeto JS: style={{ propriedade: 'valor' }}
  //  - Expressões JS dentro de chaves: {variavel}, {condicao && <Elemento />}
  //  - Todo JSX deve ter um único elemento raiz (por isso usamos <> ... </>)

  return (
    <>
      {/* O fragmento <> </> agrupa elementos sem criar um nó HTML extra no DOM.
          Precisamos dele porque o return do JSX só pode retornar um elemento raiz. */}

      {/* ═══════════════════════════════════════════════════════════
          BLOCO CSS — Estilos da página inteira
          Usamos <style>{`...`}</style> inline para encapsular todos os
          estilos desta página sem afetar o resto da aplicação.
          Template literals (backticks) permitem escrever o CSS livremente.
      ═══════════════════════════════════════════════════════════ */}
      <style>{`
        /* ─── IMPORTAÇÃO DE FONTES DO GOOGLE FONTS ─────────────────────────────────
           Importamos 3 famílias tipográficas via URL do Google Fonts:
           - Fraunces: Fonte serifada de luxo para títulos (h1, h2, h3)
             ital,opsz,wght especifica variações de itálico, tamanho ótico e peso
           - DM Sans: Fonte sem serifa moderna para texto corrido e UI
           - DM Mono: Fonte monoespaçada para rótulos técnicos e valores
           display=swap: carrega a fonte sem bloquear o render da página (performance)
        ──────────────────────────────────────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        /* ─── VARIÁVEIS CSS (CUSTOM PROPERTIES) ────────────────────────────────────
           :root é o elemento mais alto do documento (equivale a <html>).
           Variáveis CSS definidas aqui ficam disponíveis em TODA a página.
           Sintaxe: --nome-da-variavel: valor;
           Uso: color: var(--azul-destaque);
           Vantagem: mudar a cor aqui altera em todos os lugares que a usam.
        ──────────────────────────────────────────────────────────────────────────── */
        :root {
          --azul-fundo:       #0b0f1a;  /* cor de fundo principal — azul muito escuro, quase preto */
          --azul-superficie:  #111827;  /* um tom levemente mais claro para seções alternadas */
          --azul-borda:       #1e2d47;  /* cor das bordas de cards e separadores */
          --azul-destaque:    #3b82f6;  /* azul vibrante para destaques primários */
          --azul-claro:       #60a5fa;  /* azul mais claro para textos secundários e rótulos */
          --dourado:          #fbbf24;  /* amarelo dourado para preços e elementos premium */
          --dourado-escuro:   #d97706;  /* dourado mais escuro para gradientes e contraste */
          --verde:            #22c55e;  /* verde para CTAs, confirmações e "sim" */
          --verde-escuro:     #16a34a;  /* verde escuro para variações de hover */
          --vermelho:         #ef4444;  /* vermelho para alertas, "não" e pontos negativos */
          --branco:           #f8fafc;  /* branco suave (não #fff puro) — menos agressivo aos olhos */
          --cinza-claro:      #cbd5e1;  /* cinza claro para texto de corpo */
          --cinza-medio:      #64748b;  /* cinza médio para textos secundários e placeholders */
          --cinza-escuro:     #334155;  /* cinza escuro para elementos discretos */
          --raio-card:        16px;     /* border-radius padrão dos cards — canto arredondado suave */
          --raio-btn:         12px;     /* border-radius dos botões — ligeiramente menos arredondado */
          --sombra-azul:      0 0 60px rgba(59,130,246,0.15);  /* sombra difusa azulada para cards */
          --sombra-verde:     0 0 30px rgba(34,197,94,0.4);    /* sombra verde intensa para o botão CTA */
        }

        /* ─── RESET DE BOX MODEL ────────────────────────────────────────────────────
           box-sizing: border-box faz com que padding e border sejam INCLUÍDOS
           na largura/altura total do elemento. Sem isso, adicionar padding aumenta
           o tamanho do elemento inesperadamente.
           margin: 0 e padding: 0 removem os espaçamentos padrão do browser.
           O seletor * com ::before e ::after aplica a todos os elementos e pseudo-elementos.
        ──────────────────────────────────────────────────────────────────────────── */
        .sintetiza-page *, .sintetiza-page *::before, .sintetiza-page *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        /* ─── ESTILOS BASE DA PÁGINA ────────────────────────────────────────────────
           Aplicamos os estilos fundamentais ao container raiz da página (.sintetiza-page)
           em vez de body/html para evitar conflitar com o layout global do Next.js.
        ──────────────────────────────────────────────────────────────────────────── */
        .sintetiza-page {
          background-color: var(--azul-fundo);
          color: var(--branco);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;         /* tamanho base: 1rem = 16px */
          line-height: 1.7;        /* altura de linha: 1.7x o tamanho da fonte — confortável para leitura */
          overflow-x: hidden;      /* esconde scroll horizontal causado por elementos que transbordam */
          -webkit-font-smoothing: antialiased;
          /* antialiased melhora a renderização de fontes no macOS/iOS,
             deixando o texto mais suave e levemente mais fino. */
        }

        /* ─── TEXTURA DE RUÍDO (PSEUDO-ELEMENTO FIXO) ──────────────────────────────
           ::before cria um pseudo-elemento que não existe no HTML mas é renderizado pelo CSS.
           Aqui usamos para adicionar uma textura sutil de "ruído" (noise/grain)
           que é muito usada em design moderno para dar profundidade ao fundo.
           A imagem é um SVG inline codificado como Data URL (evita requisição extra).
           position: fixed + inset: 0 faz o elemento cobrir TODA a viewport sem mover com o scroll.
           pointer-events: none faz com que o elemento não bloqueie cliques.
           z-index: 0 coloca a textura atrás do conteúdo.
        ──────────────────────────────────────────────────────────────────────────── */
        .sintetiza-page::before {
          content: '';
          position: fixed;
          inset: 0;  /* shorthand para top: 0; right: 0; bottom: 0; left: 0 */
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ruido'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ruido)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* ─── TIPOGRAFIA DOS TÍTULOS ────────────────────────────────────────────────
           Aplica a fonte serifada Fraunces em todos os títulos.
           line-height: 1.1 deixa títulos grandes mais compactos (menos espaço entre linhas).
           letter-spacing: -0.02em aperta levemente o espaço entre letras —
           efeito típico em fontes display grandes para parecerem mais "tight" e elegantes.
        ──────────────────────────────────────────────────────────────────────────── */
        .sintetiza-page h1, .sintetiza-page h2, .sintetiza-page h3, .sintetiza-page h4 {
          font-family: 'Fraunces', serif;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        /* ─── CLASSES DE DESTAQUE TIPOGRÁFICO ───────────────────────────────────────
           Estas classes são aplicadas em <span> dentro dos títulos
           para colorir partes específicas do texto.
        ──────────────────────────────────────────────────────────────────────────── */

        /* Efeito de texto com gradiente (técnica CSS moderna):
           1. Define um gradiente linear como background
           2. background-clip: text recorta o background na forma do texto
           3. -webkit-text-fill-color: transparent torna o texto transparente
              para o background (gradiente) aparecer "através" das letras
           O prefixo -webkit- garante compatibilidade com Chrome/Safari. */
        .destaque-dourado {
          background: linear-gradient(90deg, var(--dourado), var(--dourado-escuro));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .destaque-azul   { color: var(--azul-claro); }
        .destaque-verde  { color: var(--verde); }
        .destaque-vermelho { color: var(--vermelho); }
        .texto-muted     { color: var(--cinza-medio); } /* texto discreto, menos importante */

        /* ─── CONTAINER CENTRALIZADO ────────────────────────────────────────────────
           Padrão clássico de layout: largura máxima + margin auto para centralizar.
           max-width: 860px evita que linhas de texto fiquem largas demais em telas grandes
           (mais de ~75 caracteres por linha prejudica a leitura).
           padding: 0 20px garante uma margem lateral em telas pequenas (mobile).
           position: relative + z-index: 1 garante que o conteúdo fique acima
           do pseudo-elemento de textura (z-index: 0).
        ──────────────────────────────────────────────────────────────────────────── */
        .container {
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }
        /* Garante que as seções também fiquem acima da textura de fundo */
        .sintetiza-page section { position: relative; z-index: 1; }

        /* ─── CABEÇALHO (HEADER FIXO) ───────────────────────────────────────────────
           O cabeçalho usa position: sticky + top: 0 para "grudar" no topo
           enquanto o usuário rola — mas só aparece quando rola até ele
           (ao contrário de position: fixed que fica sempre visível).
           backdrop-filter: blur(12px) cria o efeito "frosted glass" (vidro fosco)
           — o conteúdo atrás do header fica desfocado. Requer que o background
           tenha alguma transparência (rgba) para o efeito ser visível.
           z-index: 100 garante que fique acima de todo o conteúdo da página.
        ──────────────────────────────────────────────────────────────────────────── */
        .cabecalho {
          padding: 20px;
          display: flex;               /* flexbox para alinhar o logo facilmente */
          justify-content: center;     /* centraliza horizontalmente */
          align-items: center;         /* centraliza verticalmente */
          border-bottom: 1px solid rgba(30,45,71,0.8);
          background: rgba(11,15,26,0.95); /* 95% opaco — levemente transparente para o blur */
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px); /* efeito de desfoque no que está atrás do header */
        }
        .cabecalho img { height: 36px; opacity: 0.92; } /* logo levemente transparente — visual suave */

        /* ─── BARRA DE AVISO (BANNER SUPERIOR) ──────────────────────────────────────
           Faixa estreita de texto acima do cabeçalho para mensagens urgentes.
           text-transform: uppercase + letter-spacing: 0.08em é a combinação
           clássica para "all caps" legível — espaçamento compensa a condensação visual.
        ──────────────────────────────────────────────────────────────────────────── */
        .barra-aviso {
          background: linear-gradient(90deg, #1e3a5f, #172554); /* gradiente sutil de azul escuro */
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
          display: inline-flex;      /* flex para alinhar ícone + texto lado a lado */
          align-items: center;
          gap: 8px;
          animation: pisca 2.5s ease-in-out infinite; /* animação de pulsação aplicada aqui */
        }

        /* ─── ANIMAÇÃO DE PISCA ──────────────────────────────────────────────────────
           @keyframes define uma animação CSS reutilizável.
           "pisca" faz o elemento alternar entre opacity 1 e 0.55,
           criando um efeito de pulsação suave que chama a atenção.
           A curva ease-in-out faz a transição começar e terminar devagar.
        ──────────────────────────────────────────────────────────────────────────── */
        @keyframes pisca {
          0%, 100% { opacity: 1; }    /* início e fim: totalmente visível */
          50%       { opacity: 0.55; } /* meio: levemente transparente */
        }

        /* ─── SEÇÃO HERO (ÁREA PRINCIPAL DE ENTRADA) ────────────────────────────────
           O "hero" é a primeira seção que o usuário vê. É a mais importante
           da landing page — deve capturar atenção imediatamente.
           text-align: center centraliza todo o conteúdo desta seção.
        ──────────────────────────────────────────────────────────────────────────── */
        .hero { padding: 56px 20px 48px; text-align: center; }

        /* Etiqueta pequena acima do título principal — funciona como "tag de categoria"
           border-radius: 100px cria uma pílula (pill shape) independente do conteúdo */
        .etiqueta-metodo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59,130,246,0.1);          /* azul 10% opaco como fundo */
          border: 1px solid rgba(59,130,246,0.25);   /* borda azul sutil */
          color: var(--azul-claro);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px; /* valor grande garante forma de pílula perfeita */
          margin-bottom: 28px;
        }

        /* ─── CLAMP() — TIPOGRAFIA RESPONSIVA AUTOMÁTICA ────────────────────────────
           clamp(MIN, IDEAL, MAX) é uma função CSS que define um valor fluido:
           - MIN: tamanho mínimo (em telas muito pequenas)
           - IDEAL: tamanho baseado em viewport (ex: 4vw = 4% da largura da tela)
           - MAX: tamanho máximo (em telas grandes)
           Resultado: o texto cresce/encolhe sozinho com a tela, sem media queries!
           Exemplo: clamp(22px, 4vw, 38px)
             → em mobile 375px: 4vw = 15px → usa mínimo 22px
             → em tablet 700px: 4vw = 28px → usa 28px
             → em desktop 1200px: 4vw = 48px → usa máximo 38px
        ──────────────────────────────────────────────────────────────────────────── */
        .hero h1 {
          font-size: clamp(22px, 4vw, 38px); /* responsivo: min 22px, ideal 4vw, max 38px */
          color: var(--branco);
          max-width: 760px;
          margin: 0 auto 20px; /* centraliza e adiciona espaço abaixo */
        }
        .hero-subtitulo {
          font-size: clamp(15px, 2vw, 19px); /* responsivo: menor que o h1 */
          color: var(--cinza-claro);
          max-width: 560px;   /* linha mais curta para subtítulos — melhor leitura */
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        /* ─── CAIXA DO VÍDEO ────────────────────────────────────────────────────────
           Container que envolve o player de vídeo com borda e sombras.
           overflow: hidden corta os cantos do vídeo seguindo o border-radius do container.
           box-shadow usa duas sombras ao mesmo tempo (separadas por vírgula):
           1ª: var(--sombra-azul) → brilho azul externo
           2ª: 0 32px 80px rgba(0,0,0,0.7) → sombra preta profunda abaixo
        ──────────────────────────────────────────────────────────────────────────── */
        .caixa-video {
          max-width: 720px;
          margin: 0 auto 40px;
          border-radius: var(--raio-card);
          overflow: hidden;
          border: 1px solid var(--azul-borda);
          background: #000;
          box-shadow: var(--sombra-azul), 0 32px 80px rgba(0,0,0,0.7);
          position: relative; /* necessário para posicionar o ::before */
        }

        /* Linha brilhante decorativa no topo da caixa de vídeo —
           cria a ilusão de um "frame" premium no player */
        .caixa-video::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          /* gradiente que some nas bordas: transparente → azul → transparente */
          background: linear-gradient(90deg, transparent, var(--azul-destaque), transparent);
          z-index: 2; /* acima do vídeo */
        }

        /* ─── PROPORÇÃO RESPONSIVA DO VÍDEO (ASPECT RATIO HACK) ─────────────────────
           Técnica clássica para manter proporção 16:9 em qualquer tamanho de tela.
           padding-bottom: 56.25% = 9/16 * 100% (a proporção 16:9 em percentual)
           O padding-bottom é calculado baseado na LARGURA do elemento,
           então o elemento cresce em altura proporcionalmente à sua largura.
           Os elementos filhos usam position: absolute + inset: 0 para preencherem
           completamente o container com proporção correta.
        ──────────────────────────────────────────────────────────────────────────── */
        .proporcao-video {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 → 9÷16 = 0.5625 → 56.25% */
          background: #000;
        }
        .proporcao-video video {
          position: absolute;
          inset: 0;       /* top, right, bottom, left = 0 */
          width: 100%;
          height: 100%;
          background: #000;
        }

        /* ─── BOTÃO CTA PRINCIPAL ────────────────────────────────────────────────────
           O botão mais importante da página — deve ser impossível de ignorar.
           Estratégias usadas:
           1. Gradiente animado (background-size + background-position no hover)
           2. Sombra verde brilhante que pulsa
           3. Efeito de elevação no hover (translateY + scale)
           4. Font-weight 800 (extrabold) + tamanho clamp responsivo
        ──────────────────────────────────────────────────────────────────────────── */
        .btn-principal {
          display: inline-block;
          /* Gradiente com 3 paradas: começa verde, vai para verde claro, volta para verde
             background-size: 200% faz o gradiente ser o dobro do tamanho do botão —
             isso permite "deslizar" o gradiente no hover mudando background-position */
          background: linear-gradient(135deg, var(--verde) 0%, #4ade80 60%, var(--verde) 100%);
          background-size: 200% auto;
          color: #052e16;    /* verde-escuríssimo quase preto para máximo contraste no texto */
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;  /* extrabold — máximo impacto visual */
          font-size: clamp(15px, 2.5vw, 19px); /* responsivo */
          letter-spacing: 0.01em;
          padding: 20px 40px;
          border-radius: var(--raio-btn);
          text-decoration: none; /* remove sublinhado (é uma tag <a>) */
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 520px;
          text-align: center;
          /* transition define o que anima e em quanto tempo:
             background-position (deslize do gradiente), transform (elevação), box-shadow */
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: var(--sombra-verde);
          animation: pulsa-cta 3s ease-in-out infinite; /* pulsação constante para chamar atenção */
        }

        /* ─── ANIMAÇÃO DE PULSA-CTA ──────────────────────────────────────────────────
           A sombra verde alterna entre o valor padrão e uma versão mais intensa,
           criando o efeito de "respiração" (pulse) no botão.
        ──────────────────────────────────────────────────────────────────────────── */
        @keyframes pulsa-cta {
          0%, 100% { box-shadow: var(--sombra-verde); }                   /* sombra normal */
          50%       { box-shadow: 0 0 50px rgba(34,197,94,0.6); }          /* sombra intensa */
        }

        /* No hover: desliza o gradiente para a direita (efeito shimmer)
           e levanta levemente o botão com translateY e scale */
        .btn-principal:hover {
          background-position: right center; /* move o gradiente — cria efeito de luz deslizando */
          transform: translateY(-3px) scale(1.01); /* eleva 3px e escala 1% */
        }

        /* Texto pequeno abaixo do botão com ícone de check e garantias */
        .nota-garantia {
          margin-top: 14px;
          font-size: 12px;
          color: var(--cinza-medio);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        /* flex-shrink: 0 impede que o SVG encolha se o texto precisar de espaço */
        .nota-garantia svg { color: var(--verde); flex-shrink: 0; }

        /* ─── SEÇÃO DORES ────────────────────────────────────────────────────────────
           Seção que lista os "pontos de dor" do público-alvo.
           Fundo levemente diferente (--azul-superficie) cria separação visual
           das seções adjacentes sem usar imagens.
        ──────────────────────────────────────────────────────────────────────────── */
        .secao-dores {
          background: var(--azul-superficie);
          padding: 72px 20px;
          border-top: 1px solid var(--azul-borda);
          border-bottom: 1px solid var(--azul-borda);
        }

        /* Rótulo pequeno acima dos títulos das seções — funciona como chapéu/eyebrow text.
           DM Mono (monospace) dá um ar técnico/preciso ao rótulo.
           display: block transforma o <span> em block para aceitar margin. */
        .rotulo-secao {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em; /* espaçamento amplo para texto caixa-alta pequeno */
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

        /* ─── GRADE DE CARDS DE DOR ──────────────────────────────────────────────────
           CSS Grid com coluna única no mobile, 2 colunas a partir de 600px.
           A media query faz a transição de layout responsivo.
        ──────────────────────────────────────────────────────────────────────────── */
        .grade-dores {
          display: grid;
          grid-template-columns: 1fr;  /* 1 coluna no mobile */
          gap: 16px;
          max-width: 720px;
          margin: 0 auto;
        }
        /* Media query: quando a tela tem pelo menos 600px de largura, muda para 2 colunas */
        @media (min-width: 600px) { .grade-dores { grid-template-columns: 1fr 1fr; } }

        /* Card individual de dor — fundo e borda vermelhos sutis comunicam o problema */
        .cartao-dor {
          background: rgba(239,68,68,0.05);    /* vermelho 5% opaco — visível mas sutil */
          border: 1px solid rgba(239,68,68,0.18); /* borda vermelha translúcida */
          border-radius: var(--raio-card);
          padding: 24px;
          text-align: left;
          transition: border-color 0.3s, transform 0.3s; /* animação suave no hover */
        }
        /* Hover: borda mais visível + leve elevação (translateY negativo = sobe) */
        .cartao-dor:hover { border-color: rgba(239,68,68,0.4); transform: translateY(-3px); }
        .icone-dor { font-size: 28px; margin-bottom: 12px; display: block; }
        .cartao-dor h4 {
          font-family: 'DM Sans', sans-serif; /* sem serifa para subtítulos de cards */
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--branco);
        }
        .cartao-dor p { font-size: 14px; color: var(--cinza-medio); line-height: 1.6; }

        /* ─── SEÇÃO PROBLEMA ─────────────────────────────────────────────────────────
           Volta ao fundo original (--azul-fundo) para criar ritmo visual
           alternando entre as duas cores de fundo ao longo da página.
        ──────────────────────────────────────────────────────────────────────────── */
        .secao-problema { padding: 72px 20px; background: var(--azul-fundo); }

        /* ─── BLOCO DE CITAÇÃO ───────────────────────────────────────────────────────
           Estilo inspirado em blockquote editorial.
           A borda esquerda azul é o elemento visual característico.
           border-radius aplicado apenas nos cantos direitos (0 para esquerda)
           respeita a borda esquerda reta onde a linha azul está.
        ──────────────────────────────────────────────────────────────────────────── */
        .bloco-citacao {
          border-left: 3px solid var(--azul-destaque); /* linha azul vertical à esquerda */
          padding: 22px 26px;
          background: rgba(59,130,246,0.05); /* fundo azul levíssimo para destacar */
          border-radius: 0 var(--raio-card) var(--raio-card) 0;
          /* 0 = canto superior esquerdo, raio-card = superior direito, raio-card = inferior direito, 0 = inferior esquerdo */
          margin-bottom: 24px;
          font-size: clamp(16px, 2vw, 19px);
          color: var(--cinza-claro);
          line-height: 1.75;
          font-style: italic; /* texto em itálico enfatiza o tom de reflexão/análise */
        }
        /* <strong> dentro de itálico: remove o itálico para contraste visual */
        .bloco-citacao strong { font-style: normal; color: var(--branco); }

        /* ─── SEÇÃO MECANISMO (COMPARAÇÃO) ──────────────────────────────────────────
           Mostra lado a lado o "antes" (ensino tradicional) e o "depois" (método Sintetiza).
           Esse padrão de comparação é muito comum em landing pages — ajuda a justificar o produto.
        ──────────────────────────────────────────────────────────────────────────── */
        .secao-mecanismo {
          padding: 72px 20px;
          background: var(--azul-superficie);
          border-top: 1px solid var(--azul-borda);
        }
        .grade-comparacao {
          display: grid;
          grid-template-columns: 1fr;  /* mobile: coluna única (empilhado) */
          gap: 20px;
          max-width: 720px;
          margin: 0 auto 56px;
        }
        @media (min-width: 600px) { .grade-comparacao { grid-template-columns: 1fr 1fr; } }
        .caixa-comparacao { border-radius: var(--raio-card); padding: 32px 28px; }

        /* Caixa negativa: tons vermelhos para comunicar o problema */
        .caixa-negativa {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.22);
        }

        /* Caixa positiva: tons azuis para comunicar a solução.
           box-shadow extra reforça o destaque desta caixa (a "boa" opção) */
        .caixa-positiva {
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.3);
          box-shadow: 0 0 40px rgba(59,130,246,0.08); /* brilho azul suave externo */
        }

        /* Título dentro de cada caixa de comparação */
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

        /* Lista de itens sem bullet points — usamos spans personalizados como marcadores */
        .lista-comparacao { list-style: none; display: grid; gap: 14px; }
        .lista-comparacao li {
          font-size: 14px;
          color: var(--cinza-claro);
          display: flex;
          align-items: flex-start; /* alinha no topo caso o texto quebre linha */
          gap: 10px;
          line-height: 1.5;
        }
        /* flex-shrink: 0 impede que o marcador (✕ ou ✓) encolha */
        .lista-comparacao li span.marcador { flex-shrink: 0; font-size: 15px; margin-top: 1px; }

        /* ─── PILARES DO MÉTODO ───────────────────────────────────────────────────────
           Cards dos 3 pilares do curso — layout de 3 colunas no desktop.
        ──────────────────────────────────────────────────────────────────────────── */
        .grade-pilares {
          display: grid;
          grid-template-columns: 1fr; /* mobile: 1 coluna */
          gap: 20px;
          max-width: 720px;
          margin: 0 auto;
        }
        /* Desktop: 3 colunas iguais com repeat(3, 1fr) */
        @media (min-width: 600px) { .grade-pilares { grid-template-columns: repeat(3, 1fr); } }

        .pilar {
          background: var(--azul-fundo);
          border: 1px solid var(--azul-borda);
          border-radius: var(--raio-card);
          padding: 30px 22px;
          text-align: center;
          position: relative; /* necessário para o ::before */
          overflow: hidden;   /* corta o ::before nos cantos arredondados */
          transition: border-color 0.3s, transform 0.3s;
        }
        .pilar:hover { border-color: var(--azul-destaque); transform: translateY(-5px); }

        /* Linha decorativa no topo de cada pilar (mesmo efeito da caixa de vídeo) */
        .pilar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--azul-destaque), transparent);
        }

        /* Número grande e desbotado (01, 02, 03) — elemento decorativo de fundo
           A baixa opacidade (0.12) faz ele parecer um watermark decorativo */
        .numero-pilar {
          font-family: 'Fraunces', serif;
          font-size: 52px;
          color: rgba(59,130,246,0.12); /* azul quase invisível — apenas decorativo */
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

        /* ─── SEÇÃO OFERTA ───────────────────────────────────────────────────────────
           Gradiente de fundo diferente cria separação visual e sensação de
           "área especial" da oferta.
        ──────────────────────────────────────────────────────────────────────────── */
        .secao-oferta {
          padding: 72px 20px;
          /* gradiente vertical: começa com o azul-fundo e vai para quase-preto */
          background: linear-gradient(180deg, var(--azul-fundo) 0%, #060912 100%);
        }

        /* Grade de itens da oferta (lista de bônus) — coluna única em todos os tamanhos */
        .grade-itens-oferta {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          max-width: 720px;
          margin: 0 auto 40px;
        }

        /* Cada item da oferta: emoji + texto lado a lado com flexbox */
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
        /* Item destaque: borda e fundo dourados para o item mais valioso */
        .item-oferta.destaque { border-color: var(--dourado); background: rgba(251,191,36,0.05); }
        /* flex-shrink: 0 impede o emoji de encolher quando o texto for longo */
        .emoji-item { font-size: 26px; flex-shrink: 0; margin-top: 2px; }
        /* flex: 1 faz o corpo de texto ocupar todo o espaço restante */
        .corpo-item { flex: 1; }
        .corpo-item h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--branco);
          margin-bottom: 4px;
        }
        .corpo-item p { font-size: 13px; color: var(--cinza-medio); line-height: 1.5; }
        /* Etiqueta de valor em fonte monoespaçada — dá aparência de "preço técnico/oficial" */
        .etiqueta-valor {
          font-size: 12px;
          font-weight: 600;
          color: var(--verde);
          margin-top: 6px;
          font-family: 'DM Mono', monospace;
        }

        /* ─── CAIXA DE PREÇO ─────────────────────────────────────────────────────────
           O elemento central da oferta — deve comunicar valor e urgência.
           Borda dourada semi-opaca (0.45) cria o visual "premium" sem ser excessivo.
           border-radius: 24px levemente maior que --raio-card para destaque.
        ──────────────────────────────────────────────────────────────────────────── */
        .caixa-preco {
          max-width: 560px;
          margin: 0 auto;
          background: var(--azul-superficie);
          border: 2px solid rgba(251,191,36,0.45); /* borda dourada semi-opaca */
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          position: relative;  /* necessário para o ::before e etiqueta-exclusivo */
          overflow: hidden;    /* corta a etiqueta e o ::before nos cantos */
          box-shadow: 0 0 60px rgba(251,191,36,0.08); /* brilho dourado externo difuso */
        }

        /* Linha dourada gradiente no topo da caixa de preço */
        .caixa-preco::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px; /* um pouco mais grossa que as outras linhas decorativas */
          background: linear-gradient(90deg, var(--dourado-escuro), var(--dourado), var(--dourado-escuro));
        }

        /* ─── ETIQUETA "OFERTA EXCLUSIVA" (CORNER BADGE) ────────────────────────────
           Posicionada no canto superior direito com position: absolute.
           border-radius: 0 0 0 12px arredonda apenas o canto INFERIOR ESQUERDO,
           criando o formato de "aba" que parece surgir do canto.
        ──────────────────────────────────────────────────────────────────────────── */
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
          border-radius: 0 0 0 12px; /* apenas canto inferior esquerdo arredondado */
        }

        /* Preço original riscado — cria âncora de valor para a comparação com o preço real */
        .valor-riscado { font-size: 14px; color: var(--cinza-medio); text-decoration: line-through; margin-bottom: 4px; }
        /* Linha divisória simples entre o preço riscado e o preço atual */
        .divisor-preco { width: 40px; height: 1px; background: var(--azul-borda); margin: 16px auto; }
        /* Rótulo acima do preço principal */
        .rotulo-hoje { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--dourado-escuro); margin-bottom: 8px; }

        /* ─── PREÇO PRINCIPAL (GRANDE E DOURADO) ────────────────────────────────────
           Usa clamp para ser responsivo — em mobile fica menor, no desktop fica enorme.
           Fraunces dá o caráter premium ao número de preço.
        ──────────────────────────────────────────────────────────────────────────── */
        .preco-parcelado {
          font-family: 'Fraunces', serif;
          font-size: clamp(40px, 9vw, 62px); /* responsivo: 40px a 62px */
          color: var(--dourado);
          line-height: 1;
          margin-bottom: 8px;
        }
        /* <sup> é o elemento HTML de sobrescrito.
           vertical-align: super posiciona acima da linha base. */
        .preco-parcelado sup { font-size: 20px; vertical-align: super; color: var(--cinza-medio); margin-right: 4px; }
        .preco-ou { font-size: 13px; color: var(--cinza-medio); margin-bottom: 6px; }
        .preco-avista { font-size: 20px; font-weight: 700; color: var(--cinza-claro); margin-bottom: 28px; }
        /* Override do botão dentro da caixa de preço: display block para largura total */
        .caixa-preco .btn-principal { display: block; max-width: 100%; font-size: 17px; }

        /* ─── SEÇÃO FAQ (PERGUNTAS FREQUENTES) ──────────────────────────────────────
           O FAQ usa o padrão acordeão: apenas uma resposta aberta por vez.
           A animação é feita com max-height: 0 → max-height: 400px no CSS,
           controlada pela classe .aberto adicionada via JavaScript.
        ──────────────────────────────────────────────────────────────────────────── */
        .secao-faq { padding: 72px 20px; background: var(--azul-fundo); }
        .lista-faq { max-width: 720px; margin: 0 auto; display: grid; gap: 10px; }

        /* Container de cada item FAQ */
        .item-faq {
          background: var(--azul-superficie);
          border: 1px solid var(--azul-borda);
          border-radius: var(--raio-card);
          overflow: hidden; /* necessário para a animação de max-height funcionar corretamente */
        }

        /* Área clicável da pergunta */
        .pergunta-faq {
          padding: 20px 24px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;    /* muda o cursor para indicar que é clicável */
          display: flex;
          align-items: center;
          justify-content: space-between; /* texto à esquerda, ícone à direita */
          gap: 12px;
          user-select: none;  /* impede que o texto seja selecionado ao clicar rapidamente */
          color: var(--azul-claro);
          transition: background 0.2s;
        }
        .pergunta-faq:hover { background: rgba(59,130,246,0.05); }

        /* ─── ÍCONE DO ACORDEÃO (PSEUDO-ELEMENTO ::after) ────────────────────────────
           Usamos ::after para adicionar o ícone "+" sem precisar de HTML extra.
           transition: transform permite animar a rotação quando o item abre.
        ──────────────────────────────────────────────────────────────────────────── */
        .pergunta-faq::after {
          content: '+';         /* ícone padrão (fechado) */
          font-size: 22px;
          color: var(--azul-destaque);
          flex-shrink: 0;       /* não deixa o ícone encolher */
          transition: transform 0.3s; /* anima a rotação */
          line-height: 1;
        }
        /* Quando o item pai tem classe .aberto, rotaciona o "+" em 45° → vira "×" */
        .item-faq.aberto .pergunta-faq::after { transform: rotate(45deg); }

        /* ─── ANIMAÇÃO DO ACORDEÃO COM MAX-HEIGHT ────────────────────────────────────
           Técnica: max-height: 0 + overflow: hidden esconde a resposta.
           Ao adicionar .aberto, max-height vai para 400px com transition.
           IMPORTANTE: CSS não consegue animar "height: auto", então usamos
           max-height com um valor grande o suficiente para qualquer conteúdo.
           O transition suaviza a abertura/fechamento.
        ──────────────────────────────────────────────────────────────────────────── */
        .resposta-faq { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .item-faq.aberto .resposta-faq { max-height: 400px; } /* abre suavemente até 400px */

        /* Conteúdo interno da resposta — borda superior separa visualmente da pergunta */
        .resposta-faq-interna {
          padding: 16px 24px 24px;
          font-size: 14px;
          color: var(--cinza-medio);
          line-height: 1.75;
          border-top: 1px solid var(--azul-borda);
          margin: 0 24px; /* margem horizontal cria um recuo visual interno */
        }

        /* ─── SEÇÃO PÚBLICO-ALVO ─────────────────────────────────────────────────────
           Duas colunas lado a lado: "É para você" e "Não é para você".
           Essa clareza ajuda o visitante a se identificar (ou não) com o produto.
        ──────────────────────────────────────────────────────────────────────────── */
        .secao-publico {
          background: var(--azul-superficie);
          padding: 72px 20px;
          border-top: 1px solid var(--azul-borda);
        }
        .grade-publico { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 720px; margin: 0 auto; }
        @media (min-width: 600px) { .grade-publico { grid-template-columns: 1fr 1fr; } }
        .caixa-publico { border-radius: var(--raio-card); padding: 30px 26px; }
        /* Verde para "sim" — reforça a identidade positiva */
        .publico-sim { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.22); }
        /* Vermelho para "não" — reforça a exclusão clara */
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
          padding-left: 22px; /* espaço para o marcador pseudo-elemento */
          position: relative;  /* necessário para o ::before funcionar */
          line-height: 1.55;
        }
        /* Marcador personalizado via ::before — evita bullet padrão do browser */
        .lista-publico li::before { position: absolute; left: 0; top: 0; font-size: 14px; }
        .publico-sim .lista-publico li::before { content: '✓'; color: var(--verde); }
        .publico-nao .lista-publico li::before { content: '✕'; color: var(--vermelho); }

        /* ─── CTA FINAL (CHAMADA PARA AÇÃO FINAL) ────────────────────────────────────
           A última seção antes do rodapé. Tem um gradiente invertido do da seção-oferta
           (começa no quase-preto e vai para azul-fundo) criando ritmo visual.
           O ::before adiciona um brilho radial central (spotlight) que "ilumina"
           o CTA de baixo, direcionando atenção ao botão.
        ──────────────────────────────────────────────────────────────────────────── */
        .cta-final {
          background: linear-gradient(180deg, #060912 0%, var(--azul-fundo) 100%);
          padding: 88px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Efeito de "spotlight" — gradiente radial centralizado */
        .cta-final::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%); /* centraliza exatamente no meio */
          width: 700px; height: 500px;
          /* radial-gradient: círculo azul que esmaece até transparente */
          background: radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%);
          pointer-events: none; /* não bloqueia cliques */
        }
        .cta-final h2 { font-size: clamp(28px, 6vw, 50px); max-width: 660px; margin: 0 auto 24px; position: relative; }
        .cta-final p { color: var(--cinza-medio); max-width: 460px; margin: 0 auto 44px; font-size: 17px; position: relative; }
        /* Override: botão inline (auto width) no CTA final */
        .cta-final .btn-principal { position: relative; display: inline-block; width: auto; }

        /* Selo de garantia — card verde sutil que reforça a segurança da compra */
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

        /* ─── RODAPÉ ─────────────────────────────────────────────────────────────────
           Logo em escala de cinza (filter: grayscale(1)) e baixa opacidade (0.45)
           para deixá-la discreta — o foco no rodapé é nos links legais, não na marca.
        ──────────────────────────────────────────────────────────────────────────── */
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
        /* Crédito da agência bem discreto — apenas 11px e baixa opacidade */
        .credito-agencia { margin-top: 14px; font-size: 11px; color: rgba(100,116,139,0.45); }
        .credito-agencia a { color: rgba(251,191,36,0.45); text-decoration: none; transition: color 0.2s; }
        .credito-agencia a:hover { color: var(--dourado); }

        /* ─── BARRA FLUTUANTE (STICKY CTA BAR) ──────────────────────────────────────
           Barra fixada na parte inferior da tela que aparece quando o usuário rola.
           position: fixed com bottom: 0 + left/right: 0 gruda na borda inferior.
           transform: translateY(100%) esconde a barra abaixo da tela (fora do viewport).
           Quando .visivel é adicionada via JS, translateY volta a 0 — barra sobe.
           backdrop-filter: blur(16px) aplica o efeito frosted glass na barra.
           will-change seria ideal aqui (mas não está no código) — melhora performance
           de animações ao avisar o browser para criar uma camada de composição.
        ──────────────────────────────────────────────────────────────────────────── */
        .barra-flutuante {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 1000; /* acima de absolutamente tudo na página */
          background: rgba(11,15,26,0.97); /* quase totalmente opaco */
          border-top: 1px solid var(--azul-borda);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          transform: translateY(100%); /* começa completamente abaixo da tela */
          transition: transform 0.4s ease; /* animação suave de deslizamento */
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6); /* sombra apontando para cima */
          backdrop-filter: blur(16px); /* efeito de vidro fosco */
        }
        /* Estado visível: remove a translação, trazendo a barra de volta para a posição natural */
        .barra-flutuante.visivel { transform: translateY(0); }

        /* Área de preço dentro da barra — ocupa todo espaço disponível (flex: 1) */
        .preco-flutuante { flex: 1; }
        .preco-flutuante small { display: block; font-size: 10px; color: var(--cinza-medio); letter-spacing: 0.06em; text-transform: uppercase; }
        .preco-flutuante strong { font-size: 17px; color: var(--dourado); font-family: 'Fraunces', serif; }

        /* Botão compacto dentro da barra — flex-shrink: 0 não deixa ele encolher */
        .btn-flutuante {
          background: var(--verde);
          color: #052e16;
          font-weight: 800;
          font-size: 13px;
          padding: 13px 22px;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap; /* impede que o texto do botão quebre em duas linhas */
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-flutuante:hover { background: #4ade80; transform: scale(1.02); }

        /* ─── SISTEMA DE DELAY — CLASSES CSS ────────────────────────────────────────
           Elementos com .delay começam com display: none (completamente escondidos).
           Quando o JS libera, adiciona .delay-visivel que:
           1. Muda para display: block
           2. Aplica a animação entradaSuave (opacity 0→1 + translateY 28px→0)

           Existem exceções para elementos que precisam de display diferentes
           (flex para a barra flutuante, inline-flex para botões e notas).
        ──────────────────────────────────────────────────────────────────────────── */
        .delay { display: none; } /* escondido por padrão — aguarda liberação do delay */
        .delay.delay-visivel {
          display: block;
          animation: entradaSuave 0.7s ease forwards;
          /* forwards: mantém o estado final da animação (opacity: 1, translateY: 0)
             sem isso o elemento voltaria ao estado inicial após a animação terminar */
        }
        /* Exceção: a barra flutuante usa display: flex */
        .barra-flutuante.delay-visivel { display: flex; }
        /* Exceção: botões e nota de garantia usam display: inline-flex */
        a.btn-principal.delay.delay-visivel,
        .nota-garantia.delay.delay-visivel { display: inline-flex; }
        .nota-garantia.delay.delay-visivel { display: flex; }

        /* ─── ANIMAÇÃO DE ENTRADA SUAVE ──────────────────────────────────────────────
           Usada pelos elementos .delay quando são liberados.
           O elemento desliza 28px de baixo para cima enquanto aparece (opacity 0→1).
        ──────────────────────────────────────────────────────────────────────────── */
        @keyframes entradaSuave {
          from { opacity: 0; transform: translateY(28px); } /* começa transparente, 28px abaixo */
          to   { opacity: 1; transform: translateY(0); }    /* termina visível, na posição correta */
        }

        /* ─── SISTEMA DE REVEAL (ANIMAÇÃO DE SCROLL) ────────────────────────────────
           Elementos com .revelar começam invisíveis e posicionados 30px abaixo.
           O IntersectionObserver (no JS) adiciona .visivel quando o elemento entra na tela.
           transition define a animação: 0.65s de duração com curva ease.

           As classes revelar-delay-N adicionam atraso progressivo via transition-delay,
           fazendo elementos irmãos aparecerem em cascata (um após o outro).
        ──────────────────────────────────────────────────────────────────────────── */
        .revelar { opacity: 0; transform: translateY(30px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .revelar.visivel { opacity: 1; transform: translateY(0); } /* estado final após reveal */
        /* Atrasos escalonados para criar efeito cascata em elementos irmãos */
        .revelar-delay-1 { transition-delay: 0.1s; } /* atrasa 100ms */
        .revelar-delay-2 { transition-delay: 0.2s; } /* atrasa 200ms */
        .revelar-delay-3 { transition-delay: 0.3s; } /* atrasa 300ms */
        .revelar-delay-4 { transition-delay: 0.4s; } /* atrasa 400ms */

        /* ─── AJUSTES PARA TELAS MUITO PEQUENAS (< 480px) ───────────────────────────
           max-width: 480px cobre a maioria dos celulares pequenos.
           Reduzimos paddings e tamanhos de fonte para melhor aproveitamento do espaço.
        ──────────────────────────────────────────────────────────────────────────── */
        @media (max-width: 480px) {
          .hero { padding: 40px 16px 32px; }
          .btn-principal { padding: 17px 20px; }          /* botão menos alto em mobile */
          .caixa-preco { padding: 28px 18px; }            /* caixa de preço menos espaçosa */
          .etiqueta-exclusivo { font-size: 9px; padding: 5px 12px; } /* etiqueta menor */
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
          ESTRUTURA HTML DA PÁGINA
          Envolvida em um div com className="sintetiza-page" para
          escopo de estilos — evita conflito com o resto da aplicação.
      ═══════════════════════════════════════════════════════════ */}
      <div className="sintetiza-page">

        {/* ─── BARRA DE AVISO (TOPO DA PÁGINA) ───────────────────────────────────────
            Primeira coisa que o usuário vê — instrução para assistir o vídeo.
            O texto pisca levemente graças à animação CSS "pisca".
        ──────────────────────────────────────────────────────────────────────────── */}
        <div className="barra-aviso">
          <span>📺 Assista ao vídeo completo antes de sair desta página</span>
        </div>

        {/* ─── CABEÇALHO COM LOGO ──────────────────────────────────────────────────────
            <header> é um elemento semântico HTML5 — indica ao browser e leitores
            de tela que este é o cabeçalho da página.
            É sticky (gruda no topo) com efeito de vidro fosco (backdrop-filter).
        ──────────────────────────────────────────────────────────────────────────── */}
        <header className="cabecalho">
          {/* alt é obrigatório para acessibilidade — descreve a imagem para leitores de tela */}
          <img
            src="https://sintetizaeducacao.com.br/wp-content/uploads/2021/04/Logo-Sintetiza-Horizontal-Branco.png"
            alt="Sintetiza Educação"
          />
        </header>

        {/* ═══════════════════════════════════════════════════════════
            SEÇÃO HERO — PRIMEIRO IMPACTO
            Esta é a seção mais importante da landing page.
            Deve responder em segundos: "O que é isso? Para quem é? Por que me importo?"
            Contém: etiqueta de método, título principal, subtítulo, vídeo VSL e CTA.
        ═══════════════════════════════════════════════════════════ */}
        <section className="hero">
          <div className="container">

            {/* Etiqueta "pill" acima do título — contextualiza o método.
                Tem classe .revelar para aparecer com animação de scroll. */}
            <div className="etiqueta-metodo revelar">⚡ Método Sintetiza PowerPoint</div>

            {/* Título principal (H1) — deve existir apenas um H1 por página (SEO).
                revelar-delay-1 faz ele aparecer 100ms depois da etiqueta (cascata). */}
            <h1 className="revelar revelar-delay-1">
              <span className="destaque-dourado">Ninguém deveria parecer menos competente por causa de um slide ruim.</span><br />
              Aprenda a usar o PowerPoint com estratégia e crie{' '}
              {/* {' '} é necessário em JSX para adicionar um espaço entre elementos inline
                  sem ele, o espaço entre o texto e o <span> seria removido */}
              <span className="destaque-dourado">apresentações profissionais que refletem o seu verdadeiro nível.</span>
            </h1>

            {/* Subtítulo — complementa o H1 com proposta de valor mais concreta */}
            <p className="hero-subtitulo revelar revelar-delay-2">
              Em poucas aulas, o Sintetiza ensina como transformar ideias em apresentações claras, organizadas e visualmente profissionais.
            </p>

            {/* ─── PLAYER DE VÍDEO (VSL — Video Sales Letter) ────────────────────────
                O vídeo é o coração da landing page. O sistema de delay do useEffect
                monitora este vídeo (id="videoVsl") para liberar o restante do conteúdo.

                Atributos importantes:
                - controls: exibe os controles nativos do browser (play, pause, volume...)
                - playsInline: em iOS, impede que o vídeo abra em tela cheia automaticamente
                - preload="metadata": carrega apenas as informações básicas do vídeo (duração,
                  dimensões) sem baixar o vídeo completo — melhor performance inicial

                A caixa .caixa-video e o wrapper .proporcao-video garantem
                que o vídeo mantenha a proporção 16:9 em qualquer tamanho de tela.
            ──────────────────────────────────────────────────────────────────────── */}
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

            {/* ─── BOTÃO CTA PRINCIPAL (COM DELAY) ───────────────────────────────────
                Este botão tem a classe .delay — fica escondido até o vídeo atingir
                o tempo configurado (SEGUNDOS_DELAY no useEffect).
                É um link <a> que rola a página até a seção #oferta.
                Também tem .revelar para animar quando o delay o liberar.
            ──────────────────────────────────────────────────────────────────────── */}
            <a href="#oferta" className="btn-principal delay revelar revelar-delay-4">
              SIM! QUERO SER RECONHECIDO →
            </a>

            {/* Nota de garantia abaixo do botão — também tem delay para aparecer junto com o botão.
                O SVG inline é um ícone de check (✓) desenhado com polyline. */}
            <div className="nota-garantia delay revelar revelar-delay-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                {/* polyline desenha uma linha em zigue-zague pelos pontos especificados — forma o "check" */}
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Acesso imediato &nbsp;•&nbsp; 7 dias de garantia &nbsp;•&nbsp; Certificado incluso</span>
              {/* &nbsp; é o código HTML para "non-breaking space" — espaço que não quebra linha */}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEÇÃO DORES — TEM CLASSE .delay
            Só aparece quando o sistema de delay libera o conteúdo.
            Lista os "pontos de dor" que o público-alvo reconhece.
            Em copywriting, identificar as dores do leitor cria conexão emocional.
        ═══════════════════════════════════════════════════════════ */}
        <section className="secao-dores delay">
          <div className="container">
            <span className="rotulo-secao">O problema real</span>
            <h2 className="revelar">Você se reconhece em <span className="destaque-azul">alguma dessas situações?</span></h2>
            <p className="subtitulo-secao revelar">São situações reais e muito mais comuns do que parecem.</p>

            {/* Grade de cards de dor — 1 coluna (mobile) ou 2 colunas (desktop) */}
            <div className="grade-dores">
              {/* Cada cartão usa revelar-delay-N crescente para efeito cascata */}
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

        {/* ═══════════════════════════════════════════════════════════
            SEÇÃO PROBLEMA — TEM CLASSE .delay
            Explica a causa raiz do problema (não é talento, é método).
            Usa blocos de citação para um tom reflexivo e direto.
            Técnica de copywriting: "problema → causa → solução".
        ═══════════════════════════════════════════════════════════ */}
        <section className="secao-problema delay">
          <div className="container">
            {/* style={{ textAlign: 'left' }} sobrescreve o text-align: center do .rotulo-secao */}
            <span className="rotulo-secao" style={{ textAlign: 'left' }}>Por que isso acontece</span>
            <h2 className="revelar" style={{ marginBottom: '32px' }}>Não é falta de talento. É falta de <span className="destaque-azul">método.</span></h2>

            {/* Blocos de citação com texto forte — <strong> em palavras-chave */}
            <div className="bloco-citacao revelar">
              <strong>A faculdade te deu o conhecimento.</strong> <strong>O YouTube te ajuda a se virar.</strong> <strong>A IA promete resolver tudo.</strong>{' '}
              Mas ninguém te ensinou <strong>como juntar tudo isso em uma apresentação que prende, convence e impressiona quem está do outro lado.</strong>
            </div>

            <div className="bloco-citacao revelar">
              Existe uma diferença brutal entre um slide bonito e um slide que <strong>funciona</strong>.
              Entre uma apresentação esquecida em 10 minutos... e uma que faz o diretor virar e perguntar:
              {/* &quot; é a entidade HTML para aspas duplas — necessário em JSX para evitar
                  conflito com as aspas do próprio atributo, ou simplesmente boa prática. */}
              <strong> &quot;Quem é esse profissional?&quot;</strong>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEÇÃO MECANISMO — TEM CLASSE .delay
            Mostra a diferença entre a abordagem tradicional e o Sintetiza.
            Tabela de comparação + 3 pilares do método.
        ═══════════════════════════════════════════════════════════ */}
        <section className="secao-mecanismo delay">
          <div className="container">
            <span className="rotulo-secao" style={{ textAlign: 'center' }}>O diferencial</span>
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Por que cursos tradicionais <span className="destaque-vermelho">não resolvem</span> isso
            </h2>
            <p className="subtitulo-secao revelar">Eles te ensinam sobre botões. O Sintetiza te ensina a lógica por trás da ferramenta e você resolve qualquer situação.</p>

            {/* Grade de comparação: caixa vermelha (problema) vs caixa azul (solução) */}
            <div className="grade-comparacao">

              {/* Caixa negativa — lista do que a abordagem tradicional NÃO oferece */}
              <div className="caixa-comparacao caixa-negativa revelar">
                <div className="titulo-comparacao destaque-vermelho">
                  <span>✕</span> Ensino Tradicional
                </div>
                <ul className="lista-comparacao">
                  {/* Cada <li> usa um <span> com classe .marcador para o ícone colorido */}
                  <li><span className="marcador destaque-vermelho">✕</span> 1 a 2 anos de teoria sem prática</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Slides padrão faculdade (poluídos)</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Ninguém presta atenção em você</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Insegurança na hora de apresentar</li>
                  <li><span className="marcador destaque-vermelho">✕</span> Templates genéricos que não comunicam</li>
                </ul>
              </div>

              {/* Caixa positiva — lista do que o Sintetiza oferece */}
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

            {/* Os 3 pilares do método — cards numerados com animação cascata */}
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

        {/* ═══════════════════════════════════════════════════════════
            SEÇÃO OFERTA — TEM CLASSE .delay + id="oferta"
            O id="oferta" permite que os links href="#oferta" rolem até aqui.
            Lista todos os bônus incluídos + caixa de preço principal.
        ═══════════════════════════════════════════════════════════ */}
        <section className="secao-oferta delay" id="oferta">
          <div className="container">
            <span className="rotulo-secao" style={{ textAlign: 'center' }}>Tudo que você leva hoje</span>
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Sua Transformação <span className="destaque-dourado">Começa Agora</span>
            </h2>
            <p className="subtitulo-secao revelar">Um ecossistema completo para transformar sua comunicação profissional.</p>

            {/* Lista de itens da oferta — cada um com emoji, título, descrição e valor */}
            <div className="grade-itens-oferta">

              {/* Item destaque (borda dourada) — o produto principal */}
              <div className="item-oferta destaque revelar">
                <span className="emoji-item">🎓</span>
                <div className="corpo-item">
                  <h4>CURSO PRINCIPAL — PowerPoint Profissional do Zero ao Avançado</h4>
                  <p>Domine a ferramenta mais usada no mundo corporativo com profundidade real.</p>
                  <span className="etiqueta-valor">Valor: R$ 997</span>
                </div>
              </div>

              {/* Bônus 1 */}
              <div className="item-oferta revelar">
                <span className="emoji-item">📁</span>
                <div className="corpo-item">
                  <h4>Biblioteca de Arquivos para Acompanhar as Aulas</h4>
                  <p>Pack completo de arquivos prontos para você praticar junto com cada aula do curso.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>

              {/* Bônus 2 — revelar-delay-1 para aparição escalonada */}
              <div className="item-oferta revelar revelar-delay-1">
                <span className="emoji-item">🎨</span>
                <div className="corpo-item">
                  <h4>Guia de Paletas Profissionais para Apresentações</h4>
                  <p>Material com combinações de cores estratégicas para slides que transmitem credibilidade.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>

              {/* Bônus 3 */}
              <div className="item-oferta revelar revelar-delay-2">
                <span className="emoji-item">🔤</span>
                <div className="corpo-item">
                  <h4>Guia de Combinação de Tipografia para Apresentações</h4>
                  <p>Aprenda a escolher e combinar fontes que reforçam sua autoridade visual.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>

              {/* Bônus 4 */}
              <div className="item-oferta revelar revelar-delay-3">
                <span className="emoji-item">🔍</span>
                <div className="corpo-item">
                  <h4>Análise Profissional da Sua Apresentação</h4>
                  <p>Envie sua apresentação e receba feedback da equipe Sintetiza via Chat da Aula.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>

              {/* Bônus 5 */}
              <div className="item-oferta revelar revelar-delay-1">
                <span className="emoji-item">📐</span>
                <div className="corpo-item">
                  <h4>Framework de Estruturação de Apresentações</h4>
                  <p>Planejamento de roteiro para montar o raciocínio antes de abrir o PowerPoint.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>

              {/* Bônus 6 */}
              <div className="item-oferta revelar revelar-delay-2">
                <span className="emoji-item">✅</span>
                <div className="corpo-item">
                  <h4>Checklist de Apresentações Profissionais</h4>
                  <p>Lista completa para validar cada apresentação antes de ir ao ar.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>

              {/* Bônus 7 */}
              <div className="item-oferta revelar revelar-delay-3">
                <span className="emoji-item">🏅</span>
                <div className="corpo-item">
                  <h4>Certificado Profissional Sintetiza</h4>
                  <p>Para colocar no LinkedIn e currículo — sinaliza autoridade de mercado.</p>
                  <span className="etiqueta-valor">INCLUSO</span>
                </div>
              </div>
            </div>

            {/* ─── CAIXA DE PREÇO ─────────────────────────────────────────────────────
                O elemento de conversão central — preço, parcelamento e botão de compra.
                "etiqueta-exclusivo" é um badge posicionado no canto superior direito.
                O preço riscado cria "âncora de valor" antes de revelar o preço real.
            ──────────────────────────────────────────────────────────────────────── */}
            <div className="caixa-preco revelar">
              {/* Badge de canto — position: absolute dentro do position: relative da caixa */}
              <div className="etiqueta-exclusivo">Oferta Exclusiva</div>

              {/* Preço original (riscado) — estratégia de ancoragem de preço */}
              <p className="valor-riscado">De R$ 1.335</p>
              <div className="divisor-preco"></div>
              <p className="rotulo-hoje">Hoje, por apenas</p>

              {/* Preço parcelado em destaque — <sup> para "12x de" acima do número */}
              <div className="preco-parcelado">
                <sup>12x de</sup> R$49
              </div>
              <p className="preco-ou">ou</p>
              <p className="preco-avista">R$ 497 à vista</p>

              {/* Link de compra — substituir "SUA_URL_DE_CHECKOUT" pela URL real */}
              <a href="SUA_URL_DE_CHECKOUT" className="btn-principal">
                QUERO MINHA VAGA AGORA →
              </a>

              {/* Nota de segurança de pagamento */}
              <div className="nota-garantia" style={{ marginTop: '20px', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Pagamento 100% seguro &nbsp;•&nbsp; Acesso imediato</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEÇÃO FAQ — TEM CLASSE .delay
            Perguntas frequentes em formato acordeão.
            Usa .map() do JavaScript para renderizar cada pergunta dinamicamente
            a partir de um array de objetos { p: pergunta, r: resposta }.
        ═══════════════════════════════════════════════════════════ */}
        <section className="secao-faq delay">
          <div className="container">
            <span className="rotulo-secao" style={{ textAlign: 'center' }}>Suas dúvidas</span>
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Respostas <span className="destaque-azul">honestas</span> para as dúvidas reais
            </h2>
            <p className="subtitulo-secao revelar">Sem rodeios. Sem enrolação.</p>

            <div className="lista-faq">
              {/* ─── RENDERIZAÇÃO DINÂMICA COM .map() ──────────────────────────────────
                  O array de objetos FAQ é mapeado para elementos JSX.
                  Cada objeto tem: p (pergunta) e r (resposta).

                  .map() itera sobre o array e retorna um novo array de elementos JSX.
                  O parâmetro "i" é o índice (0, 1, 2...).

                  key={i} é OBRIGATÓRIO em listas do React — serve como identificador único
                  para o React saber qual elemento atualizar quando a lista mudar.
                  Em produção, prefira usar um ID único em vez do índice do array.
              ──────────────────────────────────────────────────────────────────────── */}
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
                /* key={i} identifica unicamente cada item para o React */
                <div className="item-faq revelar" key={i}>
                  {/* .pergunta-faq é o elemento clicável — o JS adiciona 'aberto' no pai .item-faq */}
                  <div className="pergunta-faq">{faq.p}</div>
                  {/* .resposta-faq começa com max-height: 0 (escondida) e abre via CSS quando .aberto */}
                  <div className="resposta-faq">
                    <div className="resposta-faq-interna">{faq.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEÇÃO PÚBLICO-ALVO — TEM CLASSE .delay
            Duas colunas: "Para quem é" (verde) e "Para quem não é" (vermelho).
            Técnica de copywriting: a clareza de exclusão aumenta a conversão
            de quem realmente é o público-alvo.
        ═══════════════════════════════════════════════════════════ */}
        <section className="secao-publico delay">
          <div className="container">
            <h2 className="revelar" style={{ textAlign: 'center', marginBottom: '48px' }}>
              Para <span className="destaque-verde">quem é</span> — e para quem <span className="destaque-vermelho">não é</span>
            </h2>
            <div className="grade-publico">

              {/* Coluna "É para você" — fundo e texto em verde */}
              <div className="caixa-publico publico-sim revelar">
                <h3>✅ É para você se...</h3>
                <ul className="lista-publico">
                  {/* ::before do CSS adiciona "✓" verde antes de cada <li> */}
                  <li>Você é profissional corporativo que precisa apresentar resultados e quer ser levado a sério</li>
                  <li>Você é gestor, coordenador ou líder que quer transmitir autoridade e clareza</li>
                  <li>Você é analista que domina o conteúdo, mas trava na hora de comunicar com impacto</li>
                  <li>Você é consultor ou empreendedor que apresenta para clientes e quer fechar mais</li>
                  <li>Você quer se destacar e sabe que comunicação é a habilidade mais subestimada</li>
                </ul>
              </div>

              {/* Coluna "Não é para você" — fundo e texto em vermelho */}
              <div className="caixa-publico publico-nao revelar revelar-delay-1">
                <h3>❌ Não é para você se...</h3>
                <ul className="lista-publico">
                  {/* ::before do CSS adiciona "✕" vermelho antes de cada <li> */}
                  <li>Você quer aprender design gráfico avançado e se tornar um profissional de criação</li>
                  <li>Você busca curso teórico sem compromisso com aplicação prática imediata</li>
                  <li>Você acredita que apresentação não faz diferença na carreira</li>
                  <li>Você não pretende implementar o que aprender — prefere colecionar cursos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA FINAL — TEM CLASSE .delay
            Última chance de conversão antes do rodapé.
            Tom mais emocional e direto — confronta o visitante com a escolha.
            Inclui o selo de garantia para remover qualquer objeção restante.
        ═══════════════════════════════════════════════════════════ */}
        <section className="cta-final delay">
          <div className="container">
            {/* Título com contraste emocional — "diferente" vs "igual à última" */}
            <h2 className="revelar">
              A próxima apresentação vai ser <em style={{ fontStyle: 'italic', color: 'var(--azul-claro)' }}>diferente</em> <br />
              ou vai ser igual à última.
              {/* <br /> em JSX é auto-fechado (br /), diferente do HTML puro (br) */}
            </h2>
            <p className="revelar">A escolha é sua. O método já está pronto. O que falta é a decisão.</p>

            {/* Botão com display: inline-block e width: auto para não ocupar 100% */}
            <a href="#oferta" className="btn-principal revelar" style={{ display: 'inline-block', width: 'auto' }}>
              GARANTIR MINHA VAGA AGORA →
            </a>

            {/* Wrapper flex para centralizar o selo de garantia */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Selo de garantia — reforça a segurança da compra, remove objeção de risco */}
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

        {/* ═══════════════════════════════════════════════════════════
            RODAPÉ — Sem classe .delay (sempre visível)
            <footer> é elemento semântico HTML5 — indica o rodapé da página.
            Contém: logo, copyright, links legais e crédito da agência.
            Logo em escala de cinza e semi-transparente — visual discreto.
        ═══════════════════════════════════════════════════════════ */}
        <footer className="rodape">
          {/* Logo com grayscale e opacity baixa — apenas referência visual discreta */}
          <img
            src="https://sintetizaeducacao.com.br/wp-content/uploads/2021/04/Logo-Sintetiza-Horizontal-Branco.png"
            alt="Sintetiza Educação"
          />
          <p>© 2026 Sintetiza Educação — Todos os direitos reservados.</p>
          <p style={{ marginTop: '6px' }}>
            {/* Links de política de privacidade e termos de uso — obrigatórios por lei */}
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </p>
          {/* Crédito da agência — muito discreto (opacity 0.45 via CSS) */}
          <p className="credito-agencia">
            {/* target="_blank" abre em nova aba; rel="noopener noreferrer" é obrigatório
                por segurança quando se usa target="_blank" com links externos */}
            Desenvolvido por <a href="https://buenomidias.com.br" target="_blank" rel="noopener noreferrer">BuenoMídias</a>
          </p>
        </footer>

        {/* ═══════════════════════════════════════════════════════════
            BARRA FLUTUANTE — TEM CLASSE .delay
            Elemento fixado na parte inferior da tela (position: fixed no CSS).
            Fica escondido até o delay liberar (.delay-visivel via JS),
            e depois aparece/desaparece baseado no scroll (> 600px).
            Contém: resumo do preço + botão compacto de CTA.
        ═══════════════════════════════════════════════════════════ */}
        <div className="barra-flutuante delay" id="barraFlutuante">
          {/* Área de preço — flex: 1 no CSS faz ocupar todo espaço disponível */}
          <div className="preco-flutuante">
            <small>Oferta especial</small>
            <strong>12x de R$49</strong>
          </div>
          {/* Botão compacto — leva o usuário até a seção de oferta */}
          <a href="#oferta" className="btn-flutuante">Garantir Vaga →</a>
        </div>

      </div>
    </>
  );
}
