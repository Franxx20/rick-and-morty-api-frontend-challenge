import Slider from "react-slick";
import {CARROUSEL_SETTINGS} from "../utils/Constants.ts";
import type {Episode} from "../utils/types.ts";
import React from "react";
import type EpisodeCard from "./EpisodeCard.tsx";


type CarrouselProp = {
    data: Episode[];
    CardComponent: typeof EpisodeCard;
};

const CharacterCardCarrousel: React.FC<CarrouselProp> = ({data, CardComponent}) => {
    return (
        <div>
            <h2 className="text-4xl font-semibold">Episodes:</h2>
            <div className="w-3/4 m-auto">
                <div className="mt-20">
                    <Slider {...CARROUSEL_SETTINGS}>
                        {data.map((episode) => (
                            <CardComponent key={episode.id} episode={episode}/>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CharacterCardCarrousel;
