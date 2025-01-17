import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import sequelize from '../src/db';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
