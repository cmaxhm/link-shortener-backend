import e, { Express } from 'express';
import { apiMainRouter } from './api/api-router.router';
import 'reflect-metadata';

const app: Express = e();
const port = process.env.SERVER_PORT ?? 3000;

apiMainRouter(app);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
