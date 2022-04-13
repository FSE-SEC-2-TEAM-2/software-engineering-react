import React from "react";
import {Tuits} from "../tuits";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import * as service from "../../services/tuits-service";
import * as bookmark from "../../services/bookmarks-service";


export function Bookmarks() {

    const [tuits, setTuits] = useState([]);
    const findMyBookmarks = () =>
        bookmark.findAllTuitsBookmarkedByUser("session")
            .then(tuits =>{setTuits(tuits)} );

    useEffect(findMyBookmarks, []);


    return (
        <div>
            <h1>Bookmarks Screen</h1>
            <Tuits tuits={tuits}
               refreshTuits={findMyBookmarks}
        />
        </div>
    );
}
