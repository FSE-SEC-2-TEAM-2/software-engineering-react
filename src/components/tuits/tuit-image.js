import React from "react";

export const TuitImage = ({tuit}) => {
    return (
        <div className="position-relative">
            <img src={`../images/${tuit.image}`}
                 className="mt-2 w-100 ttr-rounded-15px" alt="logo"/>
            {
                tuit.imageOverlay &&
                <span
                    className={`fa-2x text-white fw-bold bottom-0
                      ttr-tuit-image-overlay position-absolute`}>
          {tuit.imageOverlay}
        </span>
            }
        </div>
    );
};
