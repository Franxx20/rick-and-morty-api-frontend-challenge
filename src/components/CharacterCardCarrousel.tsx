import Slider from "react-slick";
import {CARROUSEL_SETTINGS} from "../utils/Constants.ts";
import React from "react";
import CharacterCard from "./CharacterCard.tsx";
import type {Character} from "../utils/types.ts";


type CarrouselProp = {
    data: Character[];
    CardComponent: typeof CharacterCard;
};

const CharacterCardCarrousel: React.FC<CarrouselProp> = ({data, CardComponent}) => {
    return (
        <div>
            <h2 className="text-4xl font-semibold">Characters:</h2>
            <div className="w-3/4 m-auto">
                <div className="mt-20">
                    <Slider {...CARROUSEL_SETTINGS}>
                        {data.map((character) => (
                            <CardComponent key={character.id} character={character}/>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CharacterCardCarrousel;
