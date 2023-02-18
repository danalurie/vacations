import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import vacationAdminService from "../5-services/vacation-admin-service";

const router = express.Router();

// GET http://localhost:4001/api/admin/vacations
router.get("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const admin = cyber.getUserFromToken(request)
        const vacations = await vacationAdminService.getAllVacationForAdmin(admin);
        response.json(vacations);
        console.log(vacations);
        
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/admin/vacations/:vacationId
router.get("/admin/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationAdminService.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4001/api/admin/vacations
router.post("/admin/vacations",verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationAdminService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4001/api/admin/vacations/:vacationId
router.put("/admin/vacations/:vacationId([0-9]+)",verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationAdminService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4001/api/admin/vacations/:vacationId
router.delete("/admin/vacations/:vacationId([0-9]+)",verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationAdminService.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4001/api/admin/vacations/images/:imageName
router.get("/admin/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
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
