import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {
    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static ValidationSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(4).max(30),
    });

    public validation():void{
        const result = CredentialsModel.ValidationSchema.validate(this);
        if(result.error)throw new ValidationError(result.error.message);
    }

}

export default CredentialsModel;