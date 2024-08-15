import type {Location} from "../utils/types.ts";
import {Link} from "react-router-dom";
import React from "react"; // Adjust the import path if needed

type LocationCardProp = {
    data: Location;
}

const LocationCard: React.FC<LocationCardProp> = ({data}) => {
    return (
        <div className="bg-amber-400 text-black rounded-xl">
            <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                <img src={"src/assets/Rick-And-Morty-Portal.jpeg"} alt={data.name} className="h-44 w-44 rounded"/>
            </div>

            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <p className="text-xl font-semibold">{data.name}</p>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                    <Link key={data.id} to={`/location/${data.id}`}>View More</Link>
                </button>
            </div>
        </div>
    );
};

export default LocationCard;
