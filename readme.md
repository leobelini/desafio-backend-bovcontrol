# Desafio BovControl

## Estrutura da aplicação

```text
project/
│
├── src/
│   ├── config/                  # Conexão com o banco de dados
│   ├── controllers/             # Controladores que lidam com as requisições HTTP
│   ├── middlewares/             # Middlewares
│   ├── repositories/            # Responsável por interações diretas com o MongoDB
│   ├── routes/                  # Definições das rotas
│   ├── services/                # Lógica de negócios e casos de uso
│   ├── utils/                   # Funções de validação usando Joi
│   ├── index.js                 # Arquivo principal para inicializar o app Express
├── test/                        # Testes unitários e de integração
│
├── .env                         # Variáveis de ambiente de Produção
├── .env.development             # Variáveis de ambiente de Desenvolvimento
└── .env.test                    # Variáveis de ambiente de Teste
```

## Fluxo da aplicação

```text
Index -> Routes -> Middleware -> Controller -> Service -> Repository -> Model
```



## Executar

### Configurar env
`.env.example` disponível na pasta. Apenas criar um com base nele, `.env` para produção ou `.env.development` para dev

### Produção

- Instalar as dependencias: `npm install`
- Executar: `npm run start`

#### Seed

Foi criado seed para testar o projeto `npm run seed`

### Desenvolvimento

- Instalar as dependencias: `npm install`
- Executar: `npm run dev`

#### Seed

Foi criado seed para testar o projeto `npm run dev:seed`