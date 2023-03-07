import { createServer, env } from './config';

const startServer = async () => {
  const app = createServer();

  app.listen(env.port, () => console.log(`Server running at port ${env.port}`));
};

startServer();
