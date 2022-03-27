import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import * as service from "../../services/tuits-service";
import {Tuits} from "../tuits";

export const MyTuits = forwardRef((props, ref) => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitsByUser("session")
            .then(tuits => setTuits(tuits));

    useEffect(findMyTuits, []);

    useImperativeHandle(ref, () => ({
        refresh() {
            console.log('Refreshing!')
            findMyTuits()
        }
    }));

    return(
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}
        />
    );
});
