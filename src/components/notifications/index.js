import React, {useEffect, useState} from "react";
import * as service from "../../services/notification-service";
import {Notification} from "./notification";
import * as TuitsService from "../../services/tuits-service";
export const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const findMyNotifications = () =>
        service.findNotificationsForUser("session")
            .then(data=> {console.log(data);setNotifications(data)});

    useEffect(findMyNotifications, []);


    const deleteNotification = (nid) =>
        service.deleteNotificationsById(nid)
            .then(findMyNotifications);

    return (
        <div>
            <h1>Notification Screen</h1>
            <ul className="ttr-tuits list-group">
                {
                    notifications.map && notifications.map(notification => {
                        return (
                            <Notification notification={notification}
                                          deleteNotification = {deleteNotification}
                            />
                        );
                    })
                }
            </ul>
        </div>

    );
};
