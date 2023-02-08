import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        await cyber.verifyToken(request);

        next();

    }
    catch (err) {
        next(err);
    }
}

export default verifyLoggedIn;
