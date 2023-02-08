import { RegisterOptions } from "react-hook-form";

class CredentialsModel {
    public email: string;
    public password: string;

    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email address" },
        minLength: { value: 8, message: "Email must be "},

    }
    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars"},
        maxLength: { value: 30, message: "Password can't exceeds chars"}
    }
}

export default CredentialsModel;