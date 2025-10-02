# Scouts FTV

Aplicação Next.js com Prisma para monitoramento estatístico. Abaixo estão as instruções básicas para configurar o ambiente de desenvolvimento com o banco Postgres local via Docker Compose.

## Pré-requisitos

- Node.js 18+
- Docker 24+ e Docker Compose Plugin

## Banco de dados local

1. Ajuste (se necessário) as variáveis para usuário, senha e base desejados. O arquivo `docker-compose.yml` já fornece valores padrão (`scouts/scouts`).
2. Suba o container PostgreSQL:

   ```bash
   docker compose up -d db
   ```

3. Crie um arquivo `.env.local` (ou atualize o `.env`) apontando para o banco local. Exemplo:

   ```env
   DATABASE_URL="postgresql://scouts:scouts@localhost:5432/scouts"
   DATABASE_DIRECT_URL="postgresql://scouts:scouts@localhost:5432/scouts"
   ```

4. Aplique as migrações ou gere o schema conforme necessário:

   ```bash
   npx prisma migrate dev
   ```

O volume nomeado `postgres-data` garante a persistência dos dados entre reinicializações.

## Executando o projeto

Instale as dependências e execute o servidor de desenvolvimento:

```bash
npm install
npm run dev
# ou
yarn install
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

Para executar o lint:

```bash
yarn lint
```

## Scripts úteis

- `docker compose up -d db`: sobe apenas o banco.
- `docker compose down`: derruba o banco e remove os containers (mantendo o volume).
- `docker compose down -v`: derruba e remove também os dados persistidos.

## Observações

- O projeto utiliza Prisma; qualquer alteração no schema exige `npx prisma generate` ou `npx prisma migrate` conforme o caso.
- Verifique se o banco remoto definido no `.env` original continua necessário e evite commitar credenciais sensíveis.
