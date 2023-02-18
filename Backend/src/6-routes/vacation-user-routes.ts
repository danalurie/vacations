import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import vacationUserService from "../5-services/vacation-user-service";

const router = express.Router(); // Capital R

// GET http://localhost:4001/api/user/vacations
router.get("/user/vacations",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacations = await vacationUserService.getAllVacationForUser(user);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4001/api/user/follow/:vacationId
router.post("/user/follow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId
        await vacationUserService.follow(user.userId, vacationId);
        response.sendStatus(201);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4001/api/user/infollow/:vacationId
router.delete("/user/follow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacationId = +request.params.vacationId
        await vacationUserService.unfollow(user.userId, vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/user/vacations/images/:imageName
router.get("/user/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName)
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
