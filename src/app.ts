import express, { Application } from 'express';
import helmet from 'helmet';

const { ACCESS_ORIGIN, PORT } = process.env;

const app: Application = express();

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Origin': ACCESS_ORIGIN });
  res.header({ 'Access-Control-Allow-Methods': 'GET, POST' });
  res.header({ 'Access-Control-Allow-Headers': 'Content-Type' });

  next();
});

app.listen(PORT || 3000, () => {
  console.log(`Server running at port: ${PORT}`);
});
