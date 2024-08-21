import React from "react";
import {Link} from "react-router-dom";
import type {Character} from "../utils/types.ts";

type CharacterCardProp = {
    data: Character;
}

const CharacterCard: React.FC<CharacterCardProp> = ({ data }) => {
    return (
        <Link
            key={data.id}
            to={`/character/${data.id}`}
            state={data}
            className="relative block h-64 w-64 rounded-full overflow-hidden shadow-lg  transition duration-300 hover:scale-110"
        >
            <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover rounded-full"
            />
            <div
                className="absolute h-[95px] w-[200px] bottom-0 left-7 right-0 bg-black/70 text-white text-pretty text-center p-2 rounded-full">
                <p className="text-lg font-semibold">{data.name}</p>
            </div>
        </Link>
    );
};

export default CharacterCard;
