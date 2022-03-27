import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${BASE_URL}/users/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const doesUserDislikeTuit = async (uid, tid) =>
    api.get(`${BASE_URL}/users/${uid}/dislikes/${tid}`)
        .then(response => response.data);
