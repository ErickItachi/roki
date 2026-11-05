# Roki Contabilidade — Landing page

Site institucional de página única, estático (HTML + CSS + JS puro, sem build).

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

## Pendências antes de publicar

A identidade visual (logo, vermelho e creme) foi aplicada a partir dos prints do Instagram e do LinkedIn.
Ainda faltam:

| Item | Situação | Onde ajustar |
|---|---|---|
| Tipografia do site | Manrope + Instrument Serif (a logo usa letras próximas da Outfit) | link do Google Fonts em `index.html` e `--font-*` |
| Foto de Roberto e Joyce | Espaço reservado | `assets/img/fundadores.jpg` + bloco `.photo-slot` |
| WhatsApp / e-mail | Não informados — o formulário direciona ao Instagram | objeto `CONTACT` em `assets/js/main.js` |
| CNPJ / CRC | Não informados | rodapé em `index.html` |
| Cargos dos sócios | "Sócio(a)-fundador(a)" — confirmar | seção `#fundadores` |
| Domínio | `canonical` usa `rokicontabilidade.com.br` como suposição | `<head>` em `index.html` |

Dados usados (LinkedIn e Instagram da Roki): fundada em 2022 em Mogi das Cruzes/SP, começou ajudando
amigos com pendências jurídicas e contábeis, 100% online, clientes em mais de 5 estados, todos os portes
e diferentes regimes; especializações: Contabilidade, Tributos, Fiscal, Imposto de Renda, Reforma
Tributária e Atendimento Humanizado; "Atendimento em tempo real, rápido e sem burocracia";
frase "Menos burocracia. Mais segurança. Atendimento de verdade."

Nenhuma formação, registro profissional, número de clientes ou depoimento foi inventado.

## Acessibilidade e desempenho

- Navegação por teclado, link "pular para o conteúdo", foco visível, ARIA no menu.
- Respeita `prefers-reduced-motion` (animações desligadas).
- Sem frameworks: ~40 KB de HTML/CSS/JS antes de compressão.
