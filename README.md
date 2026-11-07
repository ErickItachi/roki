# Roki Contabilidade — Landing page

Site institucional de página única, estático (HTML + CSS + JS puro, sem build).

## Prévia online

https://roki-contabilidade.vercel.app (projeto `roki-contabilidade` no Vercel, marcado com `noindex`, não aparece no Google).

## Rodar localmente

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080.

## Estrutura

```
index.html            # conteúdo e seções
assets/css/style.css  # identidade visual (tokens no :root), layout, animações
assets/js/main.js     # menu, revelação ao rolar, contadores, formulário
assets/brand/         # logo e favicon oficiais (a enviar)
assets/img/           # foto dos fundadores, imagem de compartilhamento (og-cover.png)
```

Seções: Hero · Sobre · Serviços · Manifesto · Como funciona · Quem somos · Dúvidas · Contato.

## Fontes do conteúdo

- LinkedIn e Instagram da Roki (história, frase da marca, especializações).
- Proposta comercial "Proposta Roki – Walter" (out/2026): 15 anos de mercado, formalização em 2023,
  +40 empresas, 12 estados + DF, comparativo de atendimento, acompanhamento mensal (contábil, fiscal,
  trabalhista), consultoria, rotina (documentos até o dia 10), fotos e registros CRC dos sócios,
  telefones, e-mail, CNPJ e CRC jurídico.
- Valores, descontos e condições comerciais da proposta **não** foram publicados no site.

## Pendências antes de publicar

| Item | Situação | Onde ajustar |
|---|---|---|
| Domínio / indexação | Prévia com `noindex`; ao publicar em roki.com.br, remover e adicionar `<link rel="canonical">` | `<head>` em `index.html` |
| WhatsApp do formulário | Usa o número do Roberto; trocar se preferirem outro | objeto `CONTACT` em `assets/js/main.js` |
| Imagem de compartilhamento | `assets/img/og-cover.jpg` existe no repositório, mas não foi enviada na prévia | `<head>` em `index.html` |

## Acessibilidade e desempenho

- Navegação por teclado, link "pular para o conteúdo", foco visível, ARIA no menu.
- Respeita `prefers-reduced-motion` (animações desligadas).
- Sem frameworks: ~40 KB de HTML/CSS/JS antes de compressão.
