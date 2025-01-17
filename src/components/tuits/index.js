import React from "react";
import './tuits.css';
import { Tuit } from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import * as TuitsService from "../../services/tuits-service";
import * as bookmarkService from "../../services/bookmarks-service";
import * as UserService from "../../services/users-service"

export function Tuits({tuits = [], refreshTuits, loggedInUserId}) {
    const likeTuit = (tuit) =>
        likesService
            .userTogglesTuitLikes("session", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const dislikeTuit = (tuit) =>
        dislikesService
            .userTogglesTuitDislikes("session", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const deleteTuit = (tid) =>
        TuitsService.deleteTuit(tid)
            .then(refreshTuits);

    const followUser = (following_uid, followed_uid) =>
        UserService.followUser(following_uid, followed_uid).then(refreshTuits)

    const unfollowUser = (following_uid, followed_uid) =>
        UserService.unfollowUser(following_uid, followed_uid).then(refreshTuits)

    const isFollowing = (isFollowing_uid, isFollowed_uid) =>
        UserService.isFollowing(isFollowing_uid, isFollowed_uid)


    const bookmarkTuit = (tuit) => {
        bookmarkService
            .userTogglesTuitBookmarks("session", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    }


    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map && tuits.map(tuit => {
                        return (
                            <Tuit key={tuit._id}
                                deleteTuit={deleteTuit}
                                likeTuit={likeTuit}
                                dislikeTuit={dislikeTuit}
                                bookmarkTuit={bookmarkTuit}
                                tuit={tuit}
                                loggedInUserId={loggedInUserId}
                                followUser={followUser}
                                unfollowUser={unfollowUser}
                                isFollowing={isFollowing}/>
                        );
                    })
                }
            </ul>
        </div>
    );
}
