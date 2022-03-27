import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import {Tuits} from "../tuits";

export const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitsByUser("session")
            .then(tuits => setTuits(tuits));

    useEffect(findMyTuits, []);

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(findMyTuits);

    return(
        <Tuits tuits={tuits}
               deleteTuit={deleteTuit}/>
    );
};
