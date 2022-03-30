import {useEffect, useState} from "react";
import * as service from "../../services/likes-service";
import {Tuits} from "../tuits";

export const MyLikes = () => {
    const [tuits, setTuits] = useState([]);
    const findMyLikedTuits = () =>
        service.findAllTuitsLikedByUser("session")
            .then(tuits => setTuits(tuits));

    useEffect(findMyLikedTuits, []);

    return(
        <div>
            <Tuits tuits={tuits}
                   refreshTuits={findMyLikedTuits}/>
        </div>
    );
}
