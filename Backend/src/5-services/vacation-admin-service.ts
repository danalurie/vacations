import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

async function getAllVacationForAdmin(admin: UserModel): Promise<VacationModel[]> {
    const sql = "SELECT *, CONCAT( ?, imageName) AS imageUrl FROM vacations ORDER BY startDate";
    const vacations = await dal.execute(sql, appConfig.adminImage);
    return vacations;
}

async function getOneVacationForAdmin(vacationId: number): Promise<VacationModel> {
    const sql = "SELECT *, CONCAT( ?, imageName) AS imageUrl FROM vacations WHERE vacationId = ?";
    const vacation = await dal.execute(sql, appConfig.adminImage, vacationId);
    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validationPost();

    vacation.imageName = await imageHandler.saveImage(vacation.image);

    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);
    vacation.vacationId = result.insertId;

    delete vacation.image;
    return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {
    const imageName = await getImageNameFromDB(vacationId);
    imageHandler.deleteImage(imageName);

    const sql = "DELETE FROM vacations WHERE vacationId = ?";
    const result = await dal.execute(sql, vacationId);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validationPut();

    vacation.imageName = await getImageNameFromDB(vacation.vacationId);

    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName);
    }

    const sql = `UPDATE vacations SET
    destination = ?,
    description = ?,
    startDate = ?,
    endDate = ?,
    price = ?,
    imageName = ?
    WHERE vacationId = ?`;

    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    delete vacation.image;
    return vacation;
}

async function getImageNameFromDB(vacationId: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationID = ?`;
    const vacations = await dal.execute(sql, vacationId);
    const vacation = vacations[0];
    if (!vacation) return null;
    return vacation.imageName;
}

export default {
    getAllVacationForAdmin,
    getOneVacationForAdmin,
    addVacation,
    deleteVacation,
    updateVacation
}