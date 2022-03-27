import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/users-service";
import * as authService from "../../services/auth-service";
import {UserList} from "./user-list";

export const Login = () => {
    const [existingUsers, setExistingUsers] = useState([]);
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const login = () =>
        authService.login(loginUser)
            .then((user) => navigate('/profile'))
            .catch(e => alert(e));

    const deleteUser = (uid) =>
        service.deleteUser(uid)
            .then(findAllUsers)
    const findAllUsers = () =>
        service.findAllUsers()
            .then(users => {
                setExistingUsers(users)
            })
    useEffect(findAllUsers, []);

    return (
        <div>
            <h1>Login</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={login} className="btn btn-primary mb-5">Login</button>

            <h3>Login As</h3>
            <UserList users={existingUsers} deleteUser={deleteUser}/>
        </div>
    );
};
