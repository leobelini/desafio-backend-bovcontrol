require("./config/env");

const express = require("express");

const { swaggerDocs, swaggerUi } = require("./swagger");
const errorHandler = require("./middlewares/global/errorHandler");

// Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const farmRoutes = require("./routes/farmRoutes");

const app = express();

app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use("/api", userRoutes, farmerRoutes, authRoutes, farmRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}/api`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
