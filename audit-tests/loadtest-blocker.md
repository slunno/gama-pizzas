# Nota sobre o ensaio de carga

A tentativa inicial com um cliente separado falhou ao abrir loopback (`WSAEACCES 10013`); aqueles registros não são métricas válidas e foram preservados em `loadtest-results.jsonl` apenas como histórico.

O bloqueio foi contornado com um servidor Vite preview e autocannon executados no mesmo processo Node, sem alterar arquivos da aplicação. Resultados válidos para GET `/` por 10 s estão em `autocannon-local.json` e `load-local.mjs`. São medições locais curtas, não representam CDN nem capacidade de produção.

Foi feita somente uma sondagem pública leve de 10 conexões por 10 s. Como retornou 2.437 respostas 403 de 2.977 requisições, o resultado é inconclusivo e a sondagem não foi repetida. Ver `public-light-load.json`.
