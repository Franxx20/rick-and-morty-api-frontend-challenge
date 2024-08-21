import type { Episode} from "../utils/types.ts";
import React from "react";
import {Link} from "react-router-dom"; // Adjust the import path if needed

type EpisodeCardProp = {
    data: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProp> = ({data}) => {
    return (
        <div className="bg-amber-400 text-black rounded-xl">
            <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                <img src={"public/Rick_and_Morty_season_2.png"} alt={data.name} className="h-44 w-44 rounded" />
            </div>

            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <p className="text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: 'calc(1.25rem - 0.1vw)' }}>
                    {data.name}
                </p>
                <p>{data.air_date}</p>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                    <Link key={data.id} to={`/episode/${data.id}`} state={data}>View More</Link>
                </button>
            </div>
        </div>
    );
};

export default EpisodeCard;
