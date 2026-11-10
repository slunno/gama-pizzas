# Relatório de auditoria — Gama Pizzas

**Data:** 10/11/2026
**Escopo:** frontend React + Vite em `front/`, build local e leituras pontuais de `https://gama-pizzas-work.vercel.app/`.
**Natureza:** auditoria técnica. O checklist LGPD não é parecer jurídico.

## Atualização após correções

Correções locais aplicadas após a auditoria:

- Paleta de texto: `--orange-deep` passou para `#a3470b` e `--text-muted` para `#555664`; o texto do rodapé também foi clareado. Rechecagem dos 10 seletores de contraste apontados pelo Lighthouse passou em todos: 4,61:1–10,42:1.
- Menu: navegação mobile fechada fica `inert` e não recebe foco de teclado. Nomes acessíveis redundantes foram removidos para corresponder ao texto visível.
- Hero: adicionados controles de pausar/retomar, respeito a movimento reduzido por padrão e alvos de pelo menos 44×44 px. Setas e controles do carrossel de cardápios também foram ampliados; grupos receberam nomes/semântica.
- Vercel: adicionada configuração local de CSP, `nosniff`, proteção contra frame, `Referrer-Policy`, `Permissions-Policy` e cache anual para `/assets/` versionado. O CSP mantém `unsafe-inline` em `style-src` porque a página define largura de uma barra de progresso via estilo inline; scripts continuam restritos à origem própria. Os cabeçalhos só estarão confirmados publicamente após publicação.
- SEO: sitemap, `robots.txt` e URL canônica preenchidos para o hostname `gama-pizzas-work.vercel.app`.

Verificação após mudanças: build local passou; ESLint direto em `src/` passou; teste local Chromium confirmou menu fora da ordem de foco quando fechado, carrossel estável sob movimento reduzido, alvos medidos de pelo menos 44×44 px e os 10 seletores de contraste do relatório acima de 4,5:1. Roteiro/evidência: `audit-tests/verify-fixes.mjs`. **Nenhum link de WhatsApp foi aberto e nenhuma mensagem foi enviada.**

Ainda pendente: a atualização do lockfile/dependências (`npm audit fix`) não foi concluída porque o registry npm não estava acessível; a API/offline resolver também não tinha metadados em cache. A política de privacidade exige dados do controlador, finalidades e retenção que não estavam disponíveis, então não inventei texto legal. Imagens continuam sem variantes responsivas. Plano/uso Vercel continuam sem acesso. Não publiquei essas mudanças; a configuração de cabeçalhos precisa de deployment para verificação externa.

## 1. Resumo executivo

O site publicado respondeu por HTTPS. O build local passou. A matriz automatizada cobriu 120 combinações de 10 larguras, retrato/paisagem, Chromium/Firefox/WebKit e site público/build local: sem overflow horizontal, imagens visíveis quebradas, âncoras ausentes ou erros de console. Lighthouse público marcou **93/96/100/100** (Performance/Acessibilidade/Boas práticas/SEO) em mobile e **97/96/100/100** em desktop.

Na medição inicial havia problemas de contraste, alvos de toque, foco do menu e movimento do Hero; eles foram corrigidos localmente e verificados em Chromium. A configuração local agora inclui cabeçalhos de segurança, mas ainda não foi publicada. Permanecem as vulnerabilidades do lockfile, a política de privacidade ausente, imagens sem variantes responsivas e a validação do plano/uso da conta Vercel.

Foi feita uma única sondagem pública curta e de baixa concorrência porque a resposta passou a incluir muitos 403. Esses resultados não permitem avaliar capacidade; não foram repetidos. Um ensaio separado no Vite preview local foi válido, mas mede apenas GET `/` num processo local e não permite estimar capacidade da CDN/conta Vercel.

**Conclusão:** a página funciona e apresentou bons resultados de laboratório. As principais correções locais de acessibilidade foram aplicadas. A prontidão final ainda depende de corrigir dependências no lockfile, publicar e verificar os cabeçalhos e tratar os itens pendentes acima.

## 2. Escopo e mapa

O repositório Git está em `front/` (`slunno/gama-pizzas`, público, branch `main`, 24 commits visíveis). O frontend usa React 19, React Router 7 e Vite 8; `vercel.json` reescreve rotas para `index.html`. O workspace contém backend Java separado, sem integração observada com a página publicada.

As seções são Início (`#inicio`), Rodízios (`#rodizios`), Galeria (`#galeria`), História (`#historia`), Dúvidas (`#faq`) e Contato (`#contato`). Contato aponta para WhatsApp, telefone e Instagram; não há formulário HTML nem chamada de API no fluxo da landing. `VITE_API_URL` aparece no módulo Axios, mas não é chamado pelas rotas revisadas.

### Recursos e pesos

| Recurso | Tamanho/evidência | Observação |
|---|---:|---|
| HTML público | 1.549 bytes | GET simples, HTTP 200 |
| JavaScript principal | 273.601 bytes decodificados | Build: 273,60 KB minificado / 87,07 KB gzip; a resposta pública observada não tinha `Content-Encoding` |
| CSS principal | 33,20 KB | Build: 6,93 KB gzip |
| Logo | 6,47 KB | PNG com hash no build |
| Hero | seis WebP de 300–393 KB | Carrossel troca a cada 5,5 s |
| Galeria/História | JPEG de 178–460 KB | Imagens lazy em Galeria/História |
| Marguerita no FAQ/Open Graph | 624,74 KB | JPG compartilhado por esses usos |
| Google Fonts | CSS e WOFF2 externos | Archivo 600/700/800 e Manrope 400/500/600/700/800; tamanho WOFF2 individual não extraído |
| Build inteiro | 4.555.881 bytes (4,34 MiB) | Inclui mídia abaixo da dobra; não representa a primeira tela |

Detalhes do build estão em `audit-tests/dist/`; auditoria integral de dependências em `audit-tests/npm-audit.json`. Os arquivos-fonte `pizza1.jpg`, `pizza2.jpg`, `evento1.jpg`, `evento2.jpg`, `equipe.jpg` e `history.jpg` estão vazios (0 bytes) e não aparecem como imagens das seções avaliadas.

`package.json` lista AOS, Axios, Framer Motion e Swiper. AOS, Framer Motion e Swiper não tiveram importações encontradas; `AnimatedGradient.jsx` não é usado. Não medi redução real de bundle após remoção, pois mudanças na aplicação estavam fora do escopo.

## 3. Compatibilidade e responsividade

O teste Playwright executou **120 cenários**: 10 larguras CSS (320, 360, 390, 414, 768, 820, 1024, 1280, 1440 e 1920 px) × duas orientações × três engines (Chromium, Firefox e WebKit) × duas origens (site publicado e build local). Em todos os cenários, as navegações responderam 200. Não houve overflow horizontal, erro de console, imagem visível quebrada ou destino de âncora ausente.

A matriz não comprova clipping de cada texto nem uso em hardware físico. Zoom 150%/200% e perfil móvel real não foram testados. A medição encontrou controles visíveis menores que 44×44 px em mais de um componente: paginação do Hero (20×3 px; item ativo 42×3 px), setas do Hero (38×38 px em mobile) e controles de carrossel/filtros (alguns com altura de 40–42 px). A regra de 44×44 px é uma recomendação prática de área de toque; exceções e alternativas precisam de avaliação de design/acessibilidade.

Teste funcional adicional do menu em 390 px: ele fecha ao escolher `#historia`. Com o menu visualmente fechado, porém, a sequência de Tab alcançou um link que ficou fora da tela em Chromium e Firefox; WebKit não reproduziu. Isso indica que esconder o menu por transformação visual não o remove da ordem de foco. O teste amostral está em `audit-tests/interaction-checks.json`.

O Hero troca o sabor automaticamente a cada 5,5 s e não oferece pausa. Em Chromium local, com `prefers-reduced-motion: reduce`, a imagem continuou mudando (Marguerita para Calabresa após 5,7 s). A CSS encurta transições, mas não interrompe o `setInterval`.

## 4. Build, peso e Lighthouse

`vite build --outDir ../audit-tests/dist --emptyOutDir` concluiu com 67 módulos transformados. O build contém JS/CSS principais e não emitiu source maps. O diretório totaliza 4,34 MiB; a página inicial não baixa todo esse peso de uma vez, pois parte das imagens usa lazy loading. Não há `srcset`/`picture` responsivo observado nem prioridade explícita no `<img>` inicial do Hero. O Lighthouse estimou economia de 336 KiB em imagens no perfil móvel e 718 KiB em desktop; são estimativas da auditoria, não reduções medidas após otimização.

O HTML usa Google Fonts com `display=swap` e preconnect para `fonts.googleapis.com`/`fonts.gstatic.com`. São dois fornecedores de fonte externos e não há preload direto dos arquivos WOFF2 observado. A requisição transfere metadados técnicos de conexão ao provedor; hospedar localmente ou documentar a finalidade merece avaliação.

| Métrica de laboratório | Lighthouse mobile | Lighthouse desktop |
|---|---:|---:|
| Performance | 93 | 97 |
| Acessibilidade | 96 | 96 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 1,7 s | 0,6 s |
| LCP | 1,7 s | 1,2 s |
| TBT | 280 ms | 0 ms |
| CLS | 0,002 | 0,024 |
| Speed Index | 2,1 s | 0,6 s |
| Time to Interactive | 2,2 s | 1,2 s |
| Payload total reportado | 546 KiB | 996 KiB |
| Estimativa de economia em imagens | 336 KiB | 718 KiB |

São uma execução Lighthouse por perfil, em 10/11/2026, na URL pública. TBT é métrica de laboratório, não INP de campo. O relatório público Lighthouse também apontou 10 nós com contraste insuficiente; no desktop marcou divergência entre rótulo visível e nome acessível na marca e no link de rolagem do Hero. Relatórios integrais: `audit-tests/lighthouse-public-mobile.json` e `audit-tests/lighthouse-public-desktop.json`. PSI API respondeu 429 inicialmente; os valores acima vieram de execução local do Lighthouse contra o site público.

Na resposta HTML/JS observada, o cache era `public, must-revalidate, max-age=0`; o JS com hash respondeu 273.601 bytes sem `Content-Encoding`, com `X-Vercel-Cache: HIT`. Isso sugere oportunidade de revisar cache do navegador e compressão de entrega; a coleta não confirmou cabeçalhos de todos os tipos de arquivo.

## 5. Capacidade e sondagem de carga

A landing é estática e não há função/API/DB participando do caminho de renderização revisado. O Vercel respondeu 200 em navegação simples. Para evitar carga desnecessária na produção, fiz apenas uma sondagem pública curta, 10 conexões por 10 segundos, GET `/`:

| Origem | Conexões | Duração | Requisições / taxa | Latência média / p95 / p99 / máx. | Respostas |
|---|---:|---:|---:|---:|---|
| Site público | 10 | 10 s | 2.977 / 297,7 req/s | 33,34 / 65,63 / 122,81 / 219 ms | 540×200, 2.437×403; 0 erros de rede/timeout |

O volume de 403 tornou o resultado inconclusivo para capacidade. A causa não foi confirmada (pode envolver borda/limite/mitigação automatizada); não repeti a sondagem. Os 63.092.853 bytes do ensaio também não devem ser tratados como tráfego normal nem como taxa estável. Resultado bruto: `audit-tests/public-light-load.json`.

No build local servido por Vite preview, autocannon fez execuções de 10 s em GET `/`:

| Conexões | Requisições | req/s | Média | p95 | p99 | Máx. | Erros | CPU do servidor (delta) | Pico working set |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 100 | 5.164 | 737,72 | 206 ms | 968 ms | 1.285 ms | 1.354 ms | 0 | 5,844 s | 117,2 MB |
| 500 | 6.214 | 887,72 | 807 ms | 2.662 ms | 2.665 ms | 2.665 ms | 0 | 7,375 s | 161,6 MB |
| 1.000 | 10.952 | 1.369 | 901 ms | 2.181 ms | 2.223 ms | 2.233 ms | 0 | 8,875 s | 245,1 MB |

Essas são medições curtas de uma única máquina/processo, apenas do documento `/`, sem mistura de ativos, cache/CDN ou tráfego representativo. A latência cresce bastante com concorrência; as execuções não demonstram capacidade de produção nem sustentam previsão de usuários simultâneos. Arquivo bruto: `audit-tests/autocannon-local.json`; roteiro: `audit-tests/load-local.mjs`.

O projeto/uso da conta Vercel não pôde ser consultado: API retornou 403 para o escopo `slunn`. A [documentação da Hobby](https://vercel.com/docs/plans/hobby) lista franquias de plataforma e a [política de fair use](https://vercel.com/docs/limits/fair-use-guidelines) restringe Hobby a uso pessoal/não comercial; a [tabela de limites](https://vercel.com/docs/limits) e a [visão de planos](https://vercel.com/docs/plans) são referências gerais, não comprovação do plano deste projeto. Como o site divulga serviço comercial, confirme o plano e os alertas de uso no painel da conta.

## 6. Segurança

### Cabeçalhos e hospedagem

Na resposta pública HTML de 10/11/2026 observei HTTPS/200, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `Server: Vercel`, `X-Vercel-Cache: HIT` e o cache informado acima. HTTP redirecionou para HTTPS. Não observei `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy` ou `Permissions-Policy`. `vercel.json` contém rewrite, sem regra desses cabeçalhos. Isso reduz defesa em profundidade contra injeção futura, embedding e permissões de navegador. O impacto observado é limitado pela natureza estática e ausência de login, mas cabeçalhos compatíveis com os recursos usados são recomendáveis.

O hostname observado é `vercel.app`; nenhum domínio próprio do projeto foi identificado, então SPF/DMARC de domínio próprio não foram avaliados.

### Dependências e código

`npm audit --json` (10/11/2026) reportou **13 vulnerabilidades: 9 altas, 4 moderadas e 0 críticas**; o comando encerrou com status 1. A severidade do registry não comprova exploração na página atual.

| Grupo | Alcance observado |
|---|---|
| `react-router` / `react-router-dom` 7.11.0 — alta | Dependência de produção e usada. Avisos incluem caminhos SSR/actions/redirecionamentos; não demonstrei exploração no fluxo estático. |
| `axios` / `follow-redirects` — alta | Instalado e configurado em `src/config/api.js`; não é chamado pelo fluxo da landing e Axios não aparece no bundle publicado. |
| `vite` — alta | Ferramenta de build/dev, não é entregue no bundle estático; afeta ambiente de build/desenvolvimento. |
| ESLint e transitivas (`brace-expansion`, `minimatch`, `nanoid`, `source-map-js`, `zod`, entre outras) | Maioria pertence à árvore de ferramentas; consultar nomes, faixas e correções no JSON integral. |

Não alterei dependências. O build não contém `.map`. `.env` e `.env.local` são ignorados e não aparecem no caminho Git atual nem em objetos com nomes `.env` na história; uma busca heurística por padrões comuns de tokens/chaves nos diffs históricos não encontrou correspondências, mas não é varredura exaustiva de formatos de segredo.

Não encontrei `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `localStorage`, `sessionStorage` ou `document.cookie` na busca pelo código da landing. Links `target="_blank"` revisados incluem `rel="noopener noreferrer"`. Não há formulário, analytics, pixel ou mapa identificados. Recursos externos recorrentes são Google Fonts; Instagram/WhatsApp são acessados por ação do visitante.

## 7. LGPD — checklist técnico (não parecer jurídico)

| Item | Situação técnica observada |
|---|---|
| Coleta direta por formulário | Não há formulário; orçamento encaminha para WhatsApp. |
| Dados de contato | Dois telefones comerciais e links de Instagram/WhatsApp são exibidos. |
| Cookies, armazenamento local e pixels próprios | Não encontrados na busca de código. |
| Analytics | Nenhuma ferramenta de analytics/pixel encontrada. |
| Requisições de terceiros | Vercel e Google Fonts recebem requisições; WhatsApp/Instagram, quando clicados. Retenção/transferência dependem dos provedores. |
| Banner de consentimento | Não há banner; Google Fonts é requisitado durante o carregamento. Avaliar com jurídico e considerar fonte local. |
| Política de privacidade | Não encontrei link/página acessível na landing. |
| Finalidade, base legal, compartilhamento, retenção, direitos e canal | Validar com jurídico/responsável, incluindo contatos por WhatsApp e logs dos provedores. |
| Controlador/encarregado e canal do titular | A marca e telefones estão visíveis; identificação formal/canal dedicado não foi encontrado. |
| Armazenamento e acesso às conversas | Dependem do processo comercial no WhatsApp; não verificáveis pela página. |
| Transferência internacional | Confirmar com provedores e responsável; não inferida somente pela página. |

Este checklist não determina conformidade legal. Política, bases, papéis e retenção devem ser confirmados por profissional jurídico e pelo responsável pelo atendimento.

## 8. Recomendações visuais e de acessibilidade

| Prioridade | Recomendação | Impacto |
|---|---|---|
| Alta | Corrigir pares de texto abaixo de 4,5:1 para texto normal; validar todos os estados de cor. | Leitura/acessibilidade |
| Alta | Aumentar alvos de controles pequenos, especialmente paginação/setas do Hero e controles em 40–42 px. | Uso por toque |
| Alta | Remover links do menu fechado da ordem de foco e expor estado correto ao leitor de tela. | Navegação por teclado |
| Alta | Incluir pausa do carrossel e suspender avanço automático para `prefers-reduced-motion`. | Movimento/acessibilidade |
| Média | Preparar imagem inicial do Hero para LCP e servir variantes responsivas/comprimidas; medir economia real. | Desempenho móvel |
| Média | Rever nomes acessíveis da marca e do link de rolagem do Hero para conter o texto visível. | Compreensão por voz |
| Média | Publicar Política de Privacidade validada e vinculá-la no rodapé. | Transparência |
| Média | Rever cache/compressão dos assets com hash e preencher sitemap atualmente vazio. | Rede/SEO |

## 9. Achados

| ID | Severidade | Achado e evidência | Ação recomendada | Estado |
|---|---|---|---|---|
| A01 | Média | Na auditoria base, 10 nós falharam contraste, incluindo `#d86c24` em creme/papel e `#676875` em areia. | Paleta ajustada; rechecagem dos 10 seletores em Chromium local deu 4,61:1–10,42:1. | Corrigido localmente |
| A02 | Média | Resposta HTML publicada na auditoria base não apresentou CSP, `X-Content-Type-Options`, proteção contra frame, `Referrer-Policy` ou `Permissions-Policy`. | Cabeçalhos adicionados a `vercel.json`; falta publicar e conferir resposta pública. | Configurado localmente; publicação pendente |
| A03 | Alta | `npm audit`: 9 altas, 4 moderadas. Router de produção é usado; outros avisos têm alcance de build ou não foram observados no fluxo público. | Atualização não concluída: registry indisponível e sem metadados offline; lockfile não foi alterado. | Pendente |
| A04 | Média | Política de Privacidade/canal dedicado a direitos não encontrados. | Publicar conteúdo validado pelo responsável jurídico e vinculá-lo. | Confirmado |
| A05 | Média | Fotos de 300–625 KB; build de 4,34 MiB; Lighthouse estimou até 336 KiB mobile/718 KiB desktop de economia em imagens. | Reduzir dimensões/qualidade e usar variantes; medir novamente. | Confirmado |
| A06 | Média | HTML/JS consultados informaram `max-age=0`; JS com hash foi observado sem compressão HTTP. | `Cache-Control: immutable` configurado para `/assets/(.*)`; cache/compressão do HTML e entrega pública ainda precisam de confirmação. | Parcial; assets configurados localmente |
| A07 | Média | Lighthouse desktop apontou divergência de nome acessível/label na marca e no link de rolagem do Hero. | Removidos `aria-label` que substituíam texto visível; rótulo acessível passa a derivar do texto apresentado. | Corrigido localmente |
| A08 | Média | Controles de toque medidos abaixo de 44×44 px; setas Hero 38×38 px mobile, paginação 20×3 px. | Hero, setas do carrossel de formatos, filtros e pills ampliados para pelo menos 44×44 px. | Corrigido localmente e medido |
| A09 | Média | Menu visualmente fechado deixava link alcançável por Tab em Chromium e Firefox a 390 px. | `inert` e visibilidade sincronizados com o breakpoint mobile. | Corrigido e confirmado em Chromium local |
| A10 | Média | Carrossel avançava a cada 5,5 s sem pausa e continuava com movimento reduzido ativo. | Botão pausar/retomar e preferência `prefers-reduced-motion` integrados ao timer. | Corrigido e confirmado em Chromium local |
| A11 | Baixa | Google Fonts externo é requisitado em carregamento; política de privacidade ausente. | Avaliar hospedagem local/consentimento e documentar fornecedor/finalidade. | Confirmado |
| A12 | Média | Plano e uso Vercel não puderam ser lidos (403); site divulga serviço comercial. | Confirmar plano, limites e alertas na conta. Hobby tem restrição de uso comercial conforme documentação. | Dependente da conta |

## 10. Ordem recomendada de trabalho

1. Atualizar dependências no `package-lock.json` quando o registry npm estiver acessível; repetir audit/build.
2. Publicar as mudanças e verificar CSP, demais cabeçalhos e cache nos caminhos HTML/assets.
3. Preparar imagens responsivas/comprimidas e medir novamente o Lighthouse.
4. Redigir Política de Privacidade com dados do controlador, processo de atendimento e validação jurídica.
5. Confirmar plano/uso Vercel e completar testes de zoom, throttling e acessibilidade manual.

## 11. Limites desta auditoria

- Não foram testados zoom 150%/200%, dispositivo físico, throttling 4G/CPU 4× nem leitores de tela.
- Lighthouse é uma execução de laboratório por perfil; INP de campo depende de usuários reais/CrUX e não foi obtido. TBT não substitui INP.
- Carga pública: apenas uma sondagem 10 conexões/10 s com 403 predominantes; resultado inconclusivo e não repetido.
- Carga local: GET `/` no preview, execução curta e uma máquina; não representa CDN, usuários ou mistura de assets.
- Plano/uso Vercel: API retornou 403 no escopo `slunn`; documentação citada é geral.
- Requisições individuais de WOFF2, domínio próprio/DNS e configuração operacional da conta não foram verificadas integralmente.
- Análise de segredos foi heurística, não exaustiva. Revisão de conformidade e parecer jurídico LGPD estão fora do escopo.

## 12. Arquivos e integridade

Artefatos e scripts foram colocados em `audit-tests/`: build local (`dist/`, 22 arquivos), `npm-audit.json`, matriz Playwright (`playwright-matrix.mjs`/`.json`), verificação do menu (`menu-check.mjs`/`interaction-checks.json`), captura da seção História, relatórios Lighthouse mobile/desktop, ensaio local (`load-local.mjs`/`autocannon-local.json`) e sondagem pública única (`load-public-lite.mjs`/`public-light-load.json`). Os arquivos de tentativa inicial de carga permanecem como registro e estão identificados como superados em `loadtest-blocker.md`.

**Nenhum arquivo existente da aplicação foi alterado.** As únicas adições fora de `audit-tests/` são este relatório na raiz Git do frontend.
