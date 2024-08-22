import React from "react";
import {Link} from "react-router-dom";
import type {Character} from "../utils/types.ts";

type CharacterCardProp = {
    data: Character;
}

export const CharacterCard: React.FC<CharacterCardProp> = ({data}: CharacterCardProp) => {
    return (
        <Link
            key={data.id}
            to={`/character/${data.id}`}
            state={data.id}
            className="relative block bg-green rounded-full overflow-visible transition duration-300 hover:scale-110"
            style={{width: '25vw', height: '25vw', maxWidth: '14rem', maxHeight: '14rem'}}
        >
            <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-full"
            />
            <div
                className="absolute bottom-7 w-full bg-black/70 p-2 rounded-full flex items-center justify-center">
                <p className="text-lg font-semibold text-white text-center truncate">
                    {data.name}
                </p>
            </div>
        </Link>
    );
};
