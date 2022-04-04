import {useEffect, useState} from "react";
import * as service from "../../services/dislikes-service";
import {Tuits} from "../tuits";

export const MyDislikes = () => {
    const [tuits, setTuits] = useState([]);
    const findMyDislikedTuits = () =>
        service.findAllTuitsDislikedByUser("session")
            .then((tuits) => {
                setTuits(tuits)
            });

    useEffect(findMyDislikedTuits, []);

    return(
        <div>
            <Tuits tuits={tuits}
                   refreshTuits={findMyDislikedTuits}/>
        </div>
    );
}
