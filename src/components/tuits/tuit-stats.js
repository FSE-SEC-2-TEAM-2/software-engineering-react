import React, { useEffect, useState } from "react";
import * as authService from "../../services/auth-service";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";
import * as bookmarkService from "../../services/bookmarks-service";
export const TuitStats = ({ tuit, likeTuit = () => { }, dislikeTuit = () => { }, bookmarkTuit = () => { } }) => {
    const [uid, setUid] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const checkIfLoggedIn = async () => {
        const user = await authService.profile();
        const suid = {
            uid: user._id
        }
        setUid(suid);
        const isLiked = await likeService.doesUserLikeTuit(user._id, tuit._id)
        setLiked(isLiked)
        const isDisliked = await dislikeService.doesUserDislikeTuit(user._id, tuit._id)
        setDisliked(isDisliked)
        const isBookmarked = await bookmarkService.doesUserBookmarkTuit(user._id, tuit._id)
        setBookmark(isBookmarked)

    }
    useEffect(() => {
        let isMounted = true;
        checkIfLoggedIn()
        return () => {
            isMounted = false;
        }
    }, []);



    const handleLikeDislike = (clickedOn, toggleLike, toggleDislike) => {
        if (clickedOn === 'like') {
            if (!liked && !disliked) {
                toggleLike(tuit);
                setLiked(!liked);
            } else if (liked) {
                toggleLike(tuit);
                setLiked(!liked);
            } else {
                toggleDislike(tuit);
                setDisliked(!disliked);
                toggleLike(tuit);
                setLiked(!liked);
            }
        } else if (clickedOn === 'dislike') {
            if (!liked && !disliked) {
                toggleDislike(tuit);
                setDisliked(!disliked);
            } else if (disliked) {
                toggleDislike(tuit);
                setDisliked(!disliked);
            } else {
                toggleLike(tuit);
                setLiked(!liked);
                toggleDislike(tuit);
                setDisliked(!disliked);
            }
        }
        // if (!liked && !disliked) {
        //     console.log('Fresh')
        //     callback(tuit);
        // } else {
        //     if (liked) {
        //         console.log('Reset Like')
        //         toggleLike(tuit);
        //         setLiked(!liked);
        //     }
        //     if (disliked) {
        //         console.log('Reset Dislike')
        //         toggleDislike(tuit);
        //         setDisliked(!disliked);
        //     }
        //     callback(tuit);
        // }
    }

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1" />
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <span className="ttr-bookmark-tuit-click" onClick={() => {
                    bookmarkTuit(tuit);
                    setBookmark(!bookmark);
                }}>
                    {
                        bookmark &&
                        <i className="fa-solid fa-book-bookmark"> </i>
                    }
                    {
                        !bookmark &&
                        <i className="fa-light fa-book-bookmark"> </i>
                    }

                    {tuit.stats && <span className="ttr-stats-bookmarks">{tuit.stats.bookmarks}</span>}


                </span>
            </div>
            <div className="col">
                <span onClick={() => {
                    handleLikeDislike("like", likeTuit, dislikeTuit)
                }}>
                    {
                        liked &&
                        <i className="fa-solid fa-thumbs-up me-1" />
                    }
                    {
                        !liked &&
                        <i className="fa-light fa-thumbs-up me-1" />
                    }
                    {tuit.stats && tuit.stats.likes}
                </span>
            </div>
            <div className="col">
                <span onClick={() => {
                    handleLikeDislike("dislike", likeTuit, dislikeTuit)
                }}>
                    {
                        disliked &&
                        <i className="fa-solid fa-thumbs-down me-1" />
                    }
                    {
                        !disliked &&
                        <i className="fa-light fa-thumbs-down me-1" />
                    }
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
        </div>
    );
}