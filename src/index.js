require('./config/env');

const express = require('express');

const { swaggerDocs, swaggerUi } = require('./swagger');
const errorHandler = require('./middlewares/global/errorHandler');

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const farmRoutes = require('./routes/farmRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const reportRoutes = require('./routes/reportRoutes');
const milkProductionRoutes = require('./routes/milkProductionRoutes');

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use(
  '/api',
  authRoutes,
  farmRoutes,
  userRoutes,
  farmerRoutes,
  reportRoutes,
  milkProductionRoutes,
);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server available at http://localhost:${PORT}/api`);
  // eslint-disable-next-line no-console
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
