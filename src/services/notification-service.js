import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

const api = axios.create({
    withCredentials: true
});

export const findNotificationsForUser = (uid) =>
    api.get(`${BASE_URL}/notifications/${uid} `)
        .then(response => response.data);

export const deleteNotificationsById = async (nid) =>
    api.delete(`${BASE_URL}/notifications/${nid}`)
        .then(response => response.data);


