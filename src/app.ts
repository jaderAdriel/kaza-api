import express from 'express';

import { ServiceFactory } from './services/ServiceFactory.js';

export const serviceFactory = new ServiceFactory();

const app = express();

async function bootstrap() {
    const { routes } = await import('./routes/index.js')
    app.use(express.json());
    app.use(routes);
}


export { app, bootstrap as bootstrapApp };