import React from "react";

import { useEffect, useState } from "react";
import { TuitVideo } from "../tuits/tuit-video";
import { TuitImage } from "../tuits/tuit-image";
import { TuitStats } from "../tuits/tuit-stats";

export const Notification = ({ notification, deleteNotification }) => {


    return (
        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="w-100">

                <i onClick={() => deleteNotification(notification._id)} className="fas fa-remove fa-2x fa-pull-right" />
                {
                    notification.verb === "followed" &&
                    <h4>{notification.subject_uid.username} {notification.verb} you. </h4>
                }
                {
                    notification.verb === "tuited by" &&
                    <h4>{notification.predicate_uid.username} posted a new tweet.</h4>
                }
                {
                    notification.verb === "bookmarked" &&
                    <h4>{notification.subject_uid.username} {notification.verb} your tuit.</h4>
                }

            </div>
        </li>
    );
}
