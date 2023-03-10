import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            localStorage.setItem('userRole', user.role);
            notify.success("Welcome " + user.firstName);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="Register">
            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)} className="Box">

                <label>First name</label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Err">{formState.errors.firstName?.message}</span>

                <label>Last name</label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Err">{formState.errors.lastName?.message}</span>

                <label>Email</label>
                <input type="email" {...register("email", UserModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password</label>
                <input type="password" {...register("password", UserModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button>Register</button>
                <br/>

                <span>Already a member? </span>
                <NavLink to="/login" className="NavLink">Login</NavLink>
                <br />
                <NavLink to="/home" className="NavLink">Back</NavLink>
            </form>
        </div>
    );
}

export default Register;
