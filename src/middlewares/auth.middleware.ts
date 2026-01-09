import { serviceFactory } from "@/app";
import { Request, Response, NextFunction } from "express";
 
export async function isLogged(req: Request, res: Response, next: NextFunction) : Promise<void> {
    const tokenService = serviceFactory.getTokenService();
    const userService = serviceFactory.getUserService();

    const errorMessage = (message?: string) => {
        return { message: message ?? 'Unauthorized', status: 401}
    }

    const authorization = req.headers.authorization;
    
    // authorization = 'Bearer <token>'
    const accessToken = authorization?.split(' ')[1];

    if (authorization === undefined || authorization === null || accessToken == null ) {
        res.status(401).json(errorMessage()).send();
        return;
    }

    const verifiedTokenPayload = tokenService.verify(accessToken);

    if (!verifiedTokenPayload || verifiedTokenPayload.sub == undefined ) {
        res.status(401).json(errorMessage("Invalid Token")).send();
        return;
    }

    const user = await userService.get(verifiedTokenPayload.sub);
    req.user = user;
    next();
}