import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as authService from "../../services/auth-service";
import * as likeService from "../../services/likes-service";

export const TuitStats = ({tuit, likeTuit = () => {}}) => {
    const [uid, setUid] = useState(null);
    const [liked, setLiked] = useState(false);

    const checkIfLoggedIn = async () => {
        const user = await authService.profile();
        // console.log(user)
        const suid = {
            uid: user._id
        }
        setUid(suid);
        // console.log("Used session successfully")
        // console.log(uid)
        // console.log(user._id)
        const result = await likeService.doesUserLikeTuit(user._id, tuit._id)
        setLiked(result)
        // console.log(result)
        // console.log(liked)
    }
    useEffect(() => {
        let isMounted = true;
        checkIfLoggedIn()
        return () => {
            isMounted = false;
        }
    }, []);
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
          <span onClick={() => {
              likeTuit(tuit);
              setLiked(!liked);
          }}>
              {
                  liked &&
                  <i className="fa-solid fa-thumbs-up me-1"/>
              }
              {
                  !liked &&
                  <i className="fa-light fa-thumbs-up me-1"/>
              }
              {/*<i className="fas fa-heart me-1" />*/}
              {tuit.stats && tuit.stats.likes}
          </span>
            </div>
            <div className="col">
                <i className="fa-light fa-thumbs-down me-1"/>
            </div>
        </div>
    );
}