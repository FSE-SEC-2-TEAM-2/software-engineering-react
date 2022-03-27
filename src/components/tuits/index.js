import React from "react";
import './tuits.css';
import {Tuit} from "./tuit";
import * as likesService from "../../services/likes-service";
import * as TuitsService from "../../services/tuits-service";

export function Tuits({tuits = [], refreshTuits}) {
    const likeTuit = (tuit) =>
        likesService
            .userTogglesTuitLikes("session", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const deleteTuit = (tid) =>
        TuitsService.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map && tuits.map(tuit => {
                        return (
                            <Tuit key={tuit._id}
                                  deleteTuit={deleteTuit}
                                  likeTuit={likeTuit}
                                  tuit={tuit}/>
                        );
                    })
                }
            </ul>
        </div>
    );
}
