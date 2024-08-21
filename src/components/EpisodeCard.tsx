import type { Episode } from "../utils/types.ts";
import React from "react";
import { Link } from "react-router-dom"; // Adjust the import path if needed
type EpisodeCardProp = {
    data: Episode;
};
const EpisodeCard: React.FC<EpisodeCardProp> = ({ data }) => {
    return (
        <div className="bg-white text-black rounded-xl">
            <div className="p-4">
                <div className="flex flex-col justify-between gap-2 md:h-fit h-[150px]">
                    <p
                        className="text-xl font-semibold truncate"
                        style={{ fontSize: "calc(1.25rem - 0.1vw)" }}>
                        {data.name}
                    </p>
                    <p>{data.air_date}</p>
                    <button className="bg-purple-500 text-white text-lg px-6 py-1 rounded-xl">
                        <Link key={data.id} to={`/episode/${data.id}`} state={data}>
                            View More
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default EpisodeCard;
