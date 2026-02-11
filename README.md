# ⚡ Bueno Mídias — Performance Digital

> Versão 1.6.0 — Site institucional focado em performance, UX e internacionalização.

## Sobre

Bueno Mídias é uma agência que transforma dados em resultados através de engenharia aplicada ao marketing. Este repositório contém o site institucional da agência, construído com foco em alta performance, acessibilidade e experiência do usuário.

## Status

- Versão: **v1.6.0**
- Suporte a: Português (PT-BR) e Inglês (EN-US)
- Deploy: Vercel

## Tecnologias

- Framework: Next.js
- Estilização: Tailwind CSS
- Internacionalização: Implementação personalizada baseada em JSON
- Hospedagem/Deploy: Vercel

## Funcionalidades principais

- Language Switcher: alternância instantânea entre idiomas sem recarregar a página.
- Branding renovado: novo favicon SVG com design minimalista e gradiente dinâmico.
- Dicionário dinâmico: textos centralizados em arquivos JSON para manutenção simples.

## Estrutura relevante do projeto

- Traduções: [src/translations/en.json](src/translations/en.json), [src/translations/pt.json](src/translations/pt.json)
- Contexto de idioma: [src/contexts/LanguageContext.jsx](src/contexts/LanguageContext.jsx)
- Hook de tradução: [src/hooks/useTranslation.js](src/hooks/useTranslation.js)
- Componentes principais: [src/components](src/components)

## Como rodar o projeto localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

```
http://localhost:3000
```

Observação: em alguns ambientes a porta pode ser `3001`.

## Boas práticas

- Mantenha as traduções em [src/translations](src/translations).
- Prefira componentes funcionais e hooks para novas implementações.
- Utilize classes utilitárias do Tailwind para consistência de estilo.

## Contribuição

1. Forke o repositório.
2. Crie uma branch com a sua feature: `git checkout -b feature/nome-da-feature`.
3. Faça commits pequenos e claros.
4. Abra um pull request descrevendo as mudanças.

## Contato

Para dúvidas ou parceria, entre em contato com a equipe da Bueno Mídias.

---

Arquivo gerado automaticamente — ajuste o conteúdo conforme necessário antes do commit.
