import React from "react";
import {Link} from "react-router-dom";
import type {Character} from "../utils/types.ts";

type CharacterCardProp = {
    data: Character;
}

const CharacterCard: React.FC<CharacterCardProp> = ({data}) => {
    return (
        <Link
            key={data.id}
            to={`/character/${data.id}`}
            state={data}
            className="relative block h-64 w-64 rounded-xl overflow-hidden transition duration-300 hover:scale-110"
        >
            <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover rounded-full"
            />
            <div
                className="absolute bottom-7 w-full bg-black/70 p-2 rounded-full flex items-center justify-center">
                <p
                    className="text-lg font-semibold text-white text-center leading-tight px-4"
                    style={{whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '100%'}}>
                    {data.name}
                </p>
            </div>
        </Link>
    );
};

export default CharacterCard;
