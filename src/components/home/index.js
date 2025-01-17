import React from "react";
import {Tuits} from "../tuits";
import * as tuitsService from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import * as authService from "../../services/auth-service";
import * as usersService from "../../services/users-service";

export const Home = () => {
    const location = useLocation();
    let hasParams = undefined
    // let {uid} = useParams();
    const [tuits, setTuits] = useState([]);
    const [tuit, setTuit] = useState('');
    const [uid, setUid] = useState(useParams());
    // console.log(uid)

    const followedTuits = async (usersFollowing) => {
        const tuits = []
        for (let index = 0; index < usersFollowing.length; index++) {
            const uid = usersFollowing[index].userFollowed._id
            tuits.push(... await tuitsService.findTuitsByUser(uid))
        }   
        console.log(tuits)  
        return tuits 
      }

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
                const usersFollowing = await usersService.findAllUsersFollowedByUser(suid.uid)
                console.log(usersFollowing)
                setTuits(await followedTuits(usersFollowing))
                console.log("Used session successfully")
            } catch (e) {
                console.log('Not Logged in!')
            }
    }
    useEffect(() => {
        let isMounted = true;
        findTuits()
        return () => {
            isMounted = false;
        }
    }, []);
    const createTuit = () =>
        tuitsService.createTuit(uid.uid, {tuit})
            .then(findTuits)
    const deleteTuit = (tid) =>
        tuitsService.deleteTuit(tid)
            .then(findTuits)
    return (
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Home Screen</h4>
                {
                    uid.uid &&
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
                }
            </div>
            <Tuits tuits={tuits} refreshTuits={findTuits} loggedInUserId={uid.uid}/>
        </div>
    );
};
