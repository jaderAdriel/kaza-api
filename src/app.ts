import express from 'express';
import cookieParser from 'cookie-parser';

import { ServiceFactory } from './services/ServiceFactory.js';

export const serviceFactory = new ServiceFactory();

const app = express();

async function bootstrap() {
    const { routes } = await import('./routes/index.js')
    app.use(cookieParser());
    app.use(express.json());
    app.use(routes);
}


export { app, bootstrap as bootstrapApp };