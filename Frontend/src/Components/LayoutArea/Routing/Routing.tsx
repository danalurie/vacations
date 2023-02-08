import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../VacationsArea/Insert/Insert";
import Home from "../../HomeArea/Home/Home";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/user/vacations" element={<VacationList />} />
            <Route path="/add" element={<Insert />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
