import e, { Express } from 'express';
import { apiMainRouter } from "./routes";

const app: Express = e();
const port: number = 3000;

apiMainRouter(app);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
