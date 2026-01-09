import { UnauthorizedError } from "@/errors/AppError";
import { DomainValidationError } from "@/errors/DomainError";
import { NextFunction, Request, Response } from "express";
import logger from "node:console";
import { ZodError } from "zod";


export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(err);

    if (err instanceof DomainValidationError) {
        res.status(400).json(err.message).send();
        return;
    }

    if (err instanceof UnauthorizedError) {
        res.status(err.status).json({
            message: err.message
        }).send();
        return;
    }

    if (err instanceof ZodError) {
        res.status(400).json({
            message: err.message,
            issues: err.issues
        }).send();
        return;
    }

    
    res.status(500).send({
        errors: [{ message: 'Something went wrong' }],
    });

    next(err);
}