import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

async function getAllVacationForUser(user: UserModel): Promise<VacationModel[]> {

    const sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount,
            CONCAT( ?, imageName) AS imageName
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate
    `;
    const vacations = await dal.execute(sql, appConfig.userImage, user.userId);
    return vacations;
}

async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUE(?, ?)";
    await dal.execute(sql, userId, vacationId);
}

async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId);
}

export default {
    getAllVacationForUser,
    follow,
    unfollow,
}