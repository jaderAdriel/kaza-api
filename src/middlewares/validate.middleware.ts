import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } 
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: 'validation_error',
                errors: error.issues.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }
        next(error);
    }
};