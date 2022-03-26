import * as authService from "../../services/auth-service";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MyTuits} from "./my-tuits";
import * as service from "../../services/tuits-service";

export const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [tuit, setTuit] = useState('');
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
    const createTuit = () =>
        service.createTuit("session", {tuit}).then(
        )
    return(
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Profile Page</h4>
                <h4>{profile.username}</h4>
                <h6>@{profile.username}</h6>
                <button onClick={logout}>Logout</button>
                    <div className="d-flex">
                        <div className="p-2">
                            <img className="ttr-width-50px rounded-circle"
                                 src="../images/user.png" alt="Profile Image"/>
                        </div>
                        <div className="p-2 w-100">
              <textarea
                  onChange={(e) =>
                      setTuit(e.target.value)}
                  placeholder="What's happening?"
                  className="w-100 border-0"/>
                            <div className="row">
                                <div className="col-10 ttr-font-size-150pc text-primary">
                                    <i className="fas fa-portrait me-3"/>
                                    <i className="far fa-gif me-3"/>
                                    <i className="far fa-bar-chart me-3"/>
                                    <i className="far fa-face-smile me-3"/>
                                    <i className="far fa-calendar me-3"/>
                                    <i className="far fa-map-location me-3"/>
                                </div>
                                <div className="col-2">
                                    <a onClick={createTuit}
                                       className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                                        Tuit
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <Routes>
                <Route path="/"
                       element={<MyTuits/>}/>
            </Routes>
        </div>
    );
};
