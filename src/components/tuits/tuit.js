import React from "react";
import {TuitStats} from "./tuit-stats";
import {TuitImage} from "./tuit-image";
import {TuitVideo} from "./tuit-video";
import {useEffect, useState} from "react";

export const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit, loggedInUserId, followUser, unfollowUser, isFollowing, bookmarkTuit}) => {
    const [isFollow, setIsFollow] = useState();

    const getFollowData = async() => {
        setIsFollow(await isFollowing(loggedInUserId, tuit.postedBy._id))
    }

    useEffect(() => {
        getFollowData()
    });

    return (
        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="pe-2">
                {
                    tuit.postedBy &&
                    <img src={`../images/user.png`}
                         className="ttr-tuit-avatar-logo rounded-circle" alt="Avatar Logo"/>
                    // <i className={`fa fa-user text-center ttr-tuit-avatar-logo rounded-circle`}/>
                }
                { (loggedInUserId === undefined) || (!isFollow && tuit.postedBy && (tuit.postedBy._id !== loggedInUserId)) && (<button
                    onClick={() => {
                        followUser(loggedInUserId, tuit.postedBy._id)
                        getFollowData()
                        }}>Follow</button> )}
                { loggedInUserId && isFollow && tuit.postedBy && (tuit.postedBy._id !== loggedInUserId) && <button
                    onClick={() => {
                        unfollowUser(loggedInUserId, tuit.postedBy._id)
                        getFollowData()
                        }}>Unfollow</button> }
            </div>
            <div className="w-100">
                <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                <h2
                    className="fs-5">
                    {tuit.postedBy && tuit.postedBy.username} ({tuit.postedBy && tuit.postedBy.email})
                </h2>
                {tuit.tuit}
                {
                    tuit.youtube &&
                    <TuitVideo tuit={tuit}/>
                }
                {
                    tuit.image &&
                    <TuitImage tuit={tuit}/>
                }
                <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit} bookmarkTuit={bookmarkTuit}/>
            </div>
        </li>
    );
}
