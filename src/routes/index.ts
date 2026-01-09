import { Router } from 'express';
import { userRoutes } from './user.routes.js';
import mongoose from 'mongoose';
import { authRoutes } from './auth.routes.js';

const routes = Router();

routes.get('/health', (req, res) => {

    const dbState = mongoose.connection.readyState;
    const health = {
        database: "unhealthy",
        api: "healthy"
    }

    if (dbState == 1) health.database = "healthy"
    if (dbState == 2) health.database = "connecting"
    
    res.send(health)
})

routes.use('/api/users', userRoutes);
routes.use('/api/auth', authRoutes );

export { routes };