import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import UserModel from "../4-models/user-model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { AuthenticationError } from "../4-models/client-errors";
import RoleModel from "../4-models/role-model";

const secretKey = "My first FullStack project";

function createNewToken(user: UserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" }
    const token = jwt.sign(container, secretKey, options);
    return token;
}


function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                reject(new AuthenticationError(`Invalid token`));
                return;
            }

            const token = header.substring(7);
            if (!token) {
                reject(new AuthenticationError(`Invalid token`));
                return;
            }

            jwt.verify(token, secretKey, (err: JsonWebTokenError) => {
                console.log(err);

                if (err) {
                    reject(new AuthenticationError(`Invalid Token`));
                }
                resolve(true);
            })
        }
        catch (err: any) {
            reject(err);
        }
    });
}

async function verifyAdmin(request: Request): Promise<boolean> {
    await verifyToken(request);
    const user = getUserFromToken(request);
    return user.role === RoleModel.Admin;
}

function getUserFromToken(request: Request): UserModel {
    const header = request.header("authorization");
    const token = header.substring(7);
    const user: UserModel = (jwt.decode(token) as any).user;
    return user;
}

function hashPassword(plainText: string): string {
    if (!plainText) return null;
    // Hashing without salt:
    // const hashedPassword = crypto.createHash("sha512").update(plainText).digest("hex");

    // Hashing with salt:
    const salt = "MakeThingsGoRight";
    const hashedPassword = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedPassword;
}

export default {
    createNewToken,
    verifyToken,
    hashPassword,
    verifyAdmin,
    getUserFromToken
}