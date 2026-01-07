import { response, Router } from 'express';
import { userRoutes } from './user.routes.js';
import mongoose from 'mongoose';

const routes = Router();

routes.get('/health', (req, res) => {
    res.send(mongoose.connection.readyState)
})

routes.use('/users', userRoutes);

export { routes };