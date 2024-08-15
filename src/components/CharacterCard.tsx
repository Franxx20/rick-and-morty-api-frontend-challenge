import React from "react";
import {Link} from "react-router-dom";
import type {Character} from "../utils/types.ts"; // Adjust the import path if needed

type CharacterCardProp = {
    data: Character;
}

const CharacterCard: React.FC<CharacterCardProp> = ({data}) => {
    return (
        <div className="bg-amber-400 text-black rounded-xl">
            <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                <img src={data.image} alt={data.name} className="h-44 w-44 rounded"/>
            </div>

            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <p className="text-xl font-semibold">{data.name}</p>
                <p>{data.status}</p>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                    <Link key={data.id} to={`/character/${data.id}`}>View More</Link>
                </button>
            </div>
        </div>
    );
};

export default CharacterCard;
