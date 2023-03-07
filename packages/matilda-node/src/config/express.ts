import express, { json } from 'express';
import { errorHandler, getTypeahead, postTypeahead } from '../main/handlers';

export const createServer = () => {
  const app = express();

  app.use(json());
  app.disable('x-powered-by');

  app.get('/typeahead/:prefix?', getTypeahead);
  app.post('/typeahead', postTypeahead);
  app.use(errorHandler);

  return app;
};
