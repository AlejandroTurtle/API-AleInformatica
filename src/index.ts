import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import sequelize from './config/database';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((error: Error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
