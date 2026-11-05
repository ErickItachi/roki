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

A pesquisa não conseguiu acessar o Instagram nem o LinkedIn da Roki (bloqueados no ambiente de
desenvolvimento) e não encontrou fontes públicas alternativas. Por isso:

| Item | Situação | Onde ajustar |
|---|---|---|
| Paleta oficial | Provisória (azul-marinho + dourado discreto) | `--brand-*` em `assets/css/style.css` |
| Tipografia oficial | Provisória (Manrope + Instrument Serif) | link do Google Fonts em `index.html` e `--font-*` |
| Logotipo | Nome em texto; nenhuma logo foi criada | `assets/brand/` + bloco `.brand` |
| Foto de Roberto e Joyce | Espaço reservado | `assets/img/fundadores.jpg` + bloco `.photo-slot` |
| WhatsApp / e-mail | Não informados — o formulário direciona ao Instagram | objeto `CONTACT` em `assets/js/main.js` |
| CNPJ / CRC | Não informados | rodapé em `index.html` |
| Lista de serviços | Baseada na descrição do LinkedIn fornecida no briefing | seção `#servicos` |
| Cargos dos sócios | "Sócio(a)-fundador(a)" — confirmar | seção `#fundadores` |
| Domínio | `canonical` usa `rokicontabilidade.com.br` como suposição | `<head>` em `index.html` |

Dados usados (vindos do briefing, origem LinkedIn): fundada em 2022, origem em Mogi das Cruzes/SP,
100% online, clientes em mais de cinco estados, diferentes portes e regimes, atuação em
contabilidade, tributos, fiscal, Imposto de Renda e reforma tributária; frase
"Menos burocracia. Mais segurança. Atendimento de verdade."

Nenhuma formação, registro profissional, número de clientes ou depoimento foi inventado.

## Acessibilidade e desempenho

- Navegação por teclado, link "pular para o conteúdo", foco visível, ARIA no menu.
- Respeita `prefers-reduced-motion` (animações desligadas).
- Sem frameworks: ~40 KB de HTML/CSS/JS antes de compressão.
