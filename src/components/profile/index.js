import * as authService from "../../services/auth-service";
import {Routes, Route, useNavigate, Link, useLocation, Router} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {MyTuits} from "./my-tuits";
import {MyLikes} from "./my-likes";
import * as service from "../../services/tuits-service";

export const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState({});
    const [tuit, setTuit] = useState('');
    const myTuits = useRef();

    console.log(location)

    useEffect(async () => {
        try {
            const user = await authService.profile();
            setProfile(user);
            navigate('/profile/mytuits');
        } catch (e) {
            navigate('/login');
        }
    }, []);

    const logout = () => {
        authService.logout()
            .then(() => navigate('/login'));
    }

    const createTuit = () =>
        service.createTuit("session", {tuit}).then( () => {
            console.log("Calling refresh!")
            myTuits.current.refresh();
        });

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
            <ul className="mt-4 nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/profile/mytuits"
                          className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active':''}`}>
                        Tuits</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/likes"
                          className={`nav-link ${location.pathname.indexOf('likes') >= 0 ? 'active':''}`}>
                        Likes</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/mytuits" element={<MyTuits ref={myTuits}/>}/>
                <Route path="/likes" element={<MyLikes/>}/>
            </Routes>
        </div>
    );
};
