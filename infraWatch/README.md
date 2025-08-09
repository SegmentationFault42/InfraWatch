# 📡 InfraWatch API

Plataforma de monitoramento de infraestruturas corporativas, desenvolvida em **Node.js** com **Fastify** e **TypeScript**, seguindo arquitetura modular e centralizada por camada.  
O objetivo é oferecer visibilidade em tempo real do estado de redes, servidores, aplicações e outros ativos, permitindo coleta de métricas via **SNMP** e verificação de conectividade via **Ping**.

---

## 🚀 Tecnologias Utilizadas
- [Fastify](https://fastify.dev/) — Servidor web rápido e eficiente
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — Padronização de código
- [Swagger](https://swagger.io/) — Documentação automática da API
- [SNMP](https://www.npmjs.com/package/net-snmp) — Coleta de métricas de dispositivos
- [Ping](https://www.npmjs.com/package/ping) — Verificação de conectividade

---

## 📂 Estrutura de Pastas
src/
├── api/ # Módulo da API REST
│ ├── controller/ # Controladores HTTP
│ ├── service/ # Regras de negócio da API
│ ├── repository/ # Acesso a dados (único, usado por todos os módulos)
│ ├── routes/ # Definição das rotas HTTP
│ ├── validations/ # Validações de entrada/payload
│ └── middleware/ # Middlewares específicos da API
| |__schema/ # Esquema da para o Swagger, deve estar presente em todas as rotas
│
├── snmp/ # Lógica SNMP
│ ├── snmp.service.ts # Coleta e interpretação de métricas SNMP
│ ├── snmp.utils.ts # Funções auxiliares (formatar, validar OIDs, etc.)
│ └── snmp.config.ts # Configurações específicas SNMP
│
├── ping/ # Lógica Ping
│ ├── ping.service.ts # Execução de pings e análise de resultados
│ ├── ping.utils.ts # Funções auxiliares (validação de host, timeout, etc.)
│ └── ping.config.ts # Configurações específicas Ping
│
├── config/ # Configurações globais (variáveis de ambiente, conexões, etc.)
├── utils/ # Funções utilitárias (logger, tratamento de erros, etc.)
└── app.ts # Ponto de entrada da aplicação


## 🛠️ Configuração do Ambiente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/infrawatch.git
cd infrawatch

2️⃣ Instalar dependências
bash
npm install

3️⃣ Rodar em modo desenvolvimento
bash
npm run dev

4️⃣ Compilar para produção
bash
npm run build

5️⃣ Iniciar em produção
bash
npm start

📑 Documentação da API
A documentação automática é gerada com Swagger e pode ser acessada em:
http://localhost:3333/docs
🔍 Healthcheck


Endpoint inicial para verificação de integridade do backend:
GET /status
Resposta exemplo:
json
{
  "status": "ok",
  "uptime": 123456,
  "timestamp": "2025-08-07T10:00:00Z"
}


🧹 Padrões de Código
Lint:
bash
npm run lint
Formatar código:

bash
npm run format
Todas as PRs devem passar no ESLint e estar formatadas com Prettier antes do merge.

👥 Contribuição
Crie uma branch para sua feature ou correção:

bash
git checkout -b feat/nome-da-feature
Faça commits claros seguindo Conventional Commits:

scss
feat(api): adicionar rota de dispositivos
Abra um Pull Request para a branch develop.