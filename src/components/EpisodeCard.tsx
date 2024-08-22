import type {Episode} from "../utils/types.ts";
import React from "react";
import {Link} from "react-router-dom"; // Adjust the import path if needed

type EpisodeCardProp = {
    data: Episode;
};

const EpisodeCard: React.FC<EpisodeCardProp> = ({data}) => {
    return (
        <Link
            key={data.id}
            to={`/episode/${data.id}`}
            state={data}
            className="relative block bg-[#ADBC9F] rounded-full overflow-hidden transition duration-300 hover:scale-110"
            style={{width: '25vw', height: '25vw', maxWidth: '14rem', maxHeight: '14rem'}}>
            <div className="relative flex justify-center items-center h-full">
                <p className="text-xl text-center font-bold text-pretty truncate absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    ep:{data.id} {data.name}
                </p>
            </div>
        </Link>
    );
};
export default EpisodeCard;
