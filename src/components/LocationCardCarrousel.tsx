import Slider from "react-slick";
import {CARROUSEL_SETTINGS} from "../utils/Constants.ts";
import type {Location} from "../utils/types.ts";
import React from "react";
import type LocationCard from "./LocationCard.tsx";


type CarrouselProp = {
    data: Location[];
    CardComponent: typeof LocationCard;
};

const CharacterCardCarrousel: React.FC<CarrouselProp> = ({data, CardComponent}) => {
    return (
        <div>
            <h2 className="text-4xl font-semibold">Locations:</h2>
            <div className="w-3/4 m-auto">
                <div className="mt-20">
                    <Slider {...CARROUSEL_SETTINGS}>
                        {data.map((location) => (
                            <CardComponent key={location.id} Location={location}/>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CharacterCardCarrousel;
