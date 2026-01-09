import { serviceFactory } from "@/app";
import { Request, Response, NextFunction } from "express";
 
export async function isLogged(req: Request, res: Response, next: NextFunction) : Promise<void> {
    const errorMessage = (message?: string) => {
        return { message: message ?? 'Unauthorized', status: 401}
    }

    const authorization = req.headers.authorization;
    
    // gets the second part = Authorization: Bearer <token>
    const accessToken = authorization?.split(' ')[1];

    if (authorization === undefined || authorization === null || accessToken == null ) {
        res.status(401).json(errorMessage()).send();
        return;
    }

    const isValid = serviceFactory.getTokenService().isValid(accessToken);

    if (!isValid) {
        res.status(401).json(errorMessage("Invalid Token")).send();
        return;
    }

    next();
}