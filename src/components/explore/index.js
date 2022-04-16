import React from "react";
import {Tuits} from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import * as authService from "../../services/auth-service";

export const Explore = () => {
    const location = useLocation();
    let hasParams = undefined
    const [tuits, setTuits] = useState([]);
    const [tuit, setTuit] = useState('');
    const [uid, setUid] = useState(useParams());

    const findTuits = async () => {
        if (hasParams === undefined) {
            if (uid.uid) {
                hasParams = true;
            } else {
                hasParams = false;
            }
        }

            try {
                const user = await authService.profile();
                const suid = {
                    uid: user._id
                }
                setUid(suid);
                console.log("Used session successfully")
            } catch (e) {
                console.log('Not Logged in!')
            }
            return service.findAllTuits()
                .then(tuits => setTuits(tuits))
    }
    useEffect(() => {
        let isMounted = true;
        findTuits()
        return () => {
            isMounted = false;
        }
    }, []);
    const createTuit = () =>
        service.createTuit(uid.uid, {tuit})
            .then(findTuits)
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(findTuits)
    return (
        <div>
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Explore Page</h4>
            </div>
            <Tuits tuits={tuits} refreshTuits={findTuits} loggedInUserId={uid.uid}/>
        </div>
    );
};