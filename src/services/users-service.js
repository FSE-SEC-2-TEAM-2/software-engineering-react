import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

const LOGIN_API = `${BASE_URL}/login`;
const USERS_API = `${BASE_URL}/users`;

export const createUser = (user) =>
    axios.post(`${USERS_API}`, user)
        .then(response => response.data);

export const findAllUsers = () => {
    return axios.get(`${USERS_API}`)
        .then( response =>  response.data );
}

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/byId/${uid}`)
        .then(response => response.data)

export const findUserByUsername = (uname) =>
    axios.get(`${USERS_API}/${uname}`)
        .then(response => response.data)

export const deleteUser = (uid) =>
    axios.delete(`${USERS_API}/byId/${uid}`)
        .then(response => response.data);

export const deleteUsersByUsername = (username) =>
    axios.delete(`${USERS_API}/${username}`)
        .then(response => response.data);

export const findUserByCredentials = (credentials) =>
    axios.post(`${LOGIN_API}`, credentials)
        .then(response => response.data);

export const followUser = (following_uid, followed_uid) =>
    axios.post(`${USERS_API}/${following_uid}/follows/${followed_uid}`)
        .then(response => response.data)

export const unfollowUser = (following_uid, followed_uid) =>
    axios.delete(`${USERS_API}/${following_uid}/follows/${followed_uid}`)
        .then(response => response.data)

export const isFollowing = (isFollowing_uid, isFollowed_uid) =>
    axios.get(`${USERS_API}/${isFollowing_uid}/following/${isFollowed_uid}`)
        .then(response => response.data)
    // axios.get("http://localhost:4000/users/624e052dab0e63091bf392af/following/624e0647ab0e63091bf392b5")
    //     .then(response => response.data)
    