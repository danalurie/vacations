import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { AuthenticationError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> {
    //validation

    if (await isUserNameTaken(user.email)) throw new ValidationError(`Username ${user.email} already taken`);

    user.role = RoleModel.User;
    user.password = cyber.hashPassword(user.password);
    const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)";

    const result: OkPacket = await dal.execute(sql, user.firstName, user.lastName, user.email, user.password, user.role);

    user.userId = result.insertId;
    const token = cyber.createNewToken(user);
    return token;
}



async function login(credentials: CredentialsModel): Promise<string> {

    credentials.password = cyber.hashPassword(credentials.password);

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    const users = await dal.execute(sql, credentials.email, credentials.password);

    const user = users[0];

    if (!user) throw new AuthenticationError(`Incorrect email or password`);

    const token = cyber.createNewToken(user);

    return token;
}


async function isUserNameTaken(email: string): Promise<boolean> {
    const sql = "SELECT EXISTS(SELECT email FROM users WHERE email = ?) as isExist";

    const arr = await dal.execute(sql, email);

    const count = +arr[0].isExist;

    return count === 1;
}


export default {
    register,
    login
}