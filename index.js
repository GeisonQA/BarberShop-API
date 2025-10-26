const express = require('express');
const cors = require('cors');
const { sequelize, seedInitial } = require('./models');
const authRoutes = require('./routes/auth');
const barberRoutes = require('./routes/barbers');
const serviceRoutes = require('./routes/services');
const appointmentRoutes = require('./routes/appointments');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/barbeiros', barberRoutes);
app.use('/api/servicos', serviceRoutes);
app.use('/api/agendamentos', appointmentRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.sync();
  await seedInitial();
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}

if (require.main === module) {
  start().catch(err => {
    console.error('Falha ao iniciar:', err);
    process.exit(1);
  });
}

module.exports = app;
