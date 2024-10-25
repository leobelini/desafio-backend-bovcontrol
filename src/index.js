import './config/env.js';

import express from 'express';

import {swaggerDocs, swaggerUi} from './swagger.js';
import {errorHandler} from './middlewares/global/errorHandler.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import farmRoutes from './routes/farmRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import milkProductionRoutes from './routes/milkProductionRoutes.js';

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
