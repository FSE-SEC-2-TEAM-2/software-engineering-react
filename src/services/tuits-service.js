import axios from "axios";

const TUITS_API = process.env.REACT_APP_BASE_URL + "/tuits";
const USERS_API = process.env.REACT_APP_BASE_URL + "/users";

export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) => {
    tuit.postedBy = uid;
    return axios.post(`${TUITS_API}`, tuit)
        .then(response => response.data);
}

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);
