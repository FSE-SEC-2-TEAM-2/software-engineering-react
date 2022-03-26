import * as authService from "../../services/auth-service";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {MyTuits} from "./my-tuits";

export const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    useEffect(async () => {
        try {
            const user = await authService.profile();
            setProfile(user);
        } catch (e) {
            navigate('/login');
        }
    }, []);
    const logout = () => {
        authService.logout()
            .then(() => navigate('/login'));
    }
    return(
        <div>
            <h4>{profile.username}</h4>
            <h6>@{profile.username}</h6>
            <button onClick={logout}>
                Logout</button>

            <Routes>
                <Route path="/"
                       element={<MyTuits/>}/>
            </Routes>
        </div>
    );
};
