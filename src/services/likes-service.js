import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${BASE_URL}/users/${uid}/likes/${tid}`)
        .then(response => response.data);

export const doesUserLikeTuit = async (uid, tid) =>
    api.get(`${BASE_URL}/users/${uid}/likes/${tid}`)
        .then(response => response.data);

export const findAllTuitsLikedByUser = (uid) =>
    api.get(`${BASE_URL}/users/${uid}/likes`)
        .then(response => response.data);
