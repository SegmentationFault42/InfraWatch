# InfraWatch

InfraWatch é uma plataforma de monitoramento de infraestruturas corporativas, fornecendo visibilidade em tempo real sobre redes, servidores, aplicações e outros serviços críticos.  
O sistema oferece dashboards intuitivos, alertas, registro histórico de métricas e acompanhamento de SLA.

---

## Fluxo de Trabalho (Git Flow)

Simples e seguro:  
main → dev → feature branches

### Branches
- **main**  
  - Branch **protegida**.  
  - Sempre contém a versão estável do projeto (produção).  
  - Alterações chegam aqui apenas via Pull Request aprovado.

- **dev**  
  - Branch de integração principal.  
  - Todas as features são unificadas aqui antes de ir para `main`.  

- **Branches de feature**  
  - Cada equipe ou desenvolvedor **trabalha em sua branch designada** a partir de `dev`..  
  - Branches iniciais já criadas:
  - `backend-init` (Equipe Backend)
  - `frontend-init` (Equipe Frontend)
  - `db-init` (Equipe Banco de Dados & QA)
- Para novas funcionalidades específicas:
  - Criar uma nova branch a partir de `dev`, ex:
    - `feature/nome-da-feature`

---

## Como contribuir

### 1. Clonar o repositório
\`\`\`bash
git clone git@github.com:SegmentationFault42/InfraWatch.git
cd InfraWatch
\`\`\`

### 2. Escolher a branch correta
- Backend: **backend-init**  
- Frontend: **frontend-init**  
- Banco de dados & QA: **db-init**

Caso vá criar uma nova feature:
\`\`\`bash
git checkout dev
git pull
git checkout -b feature/nome-da-feature
\`\`\`

### 3. Fazer commits pequenos e descritivos
\`\`\`bash
git add .
git commit -m "feat: descrição curta da mudança"
\`\`\`

### 4. Enviar a branch
\`\`\`bash
git push -u origin feature/nome-da-feature
\`\`\`

### 5. Criar um Pull Request
Abrir PR no GitHub → **feature/nome-da-feature → dev**  
Um colega deve revisar antes do merge.

---

## Padrão de Commits
- **feat:** → nova funcionalidade  
- **fix:** → correção de bug  
- **docs:** → documentação  
- **chore:** → manutenção geral

---

## Regras gerais
- Nunca fazer push direto em **main** ou **dev**.  
- Sempre abrir Pull Request para integração.  
- Resolver conflitos localmente antes de enviar.  
- Manter o código limpo, comentado e com testes.
