import type {Location} from "../utils/types.ts";
import React from "react";
import {Link} from "react-router-dom"; // Adjust the import path if needed

type LocationCardProp = {
    Location: Location;
}

const LocationCard: React.FC<LocationCardProp> = ({Location}) => {
    return (
        <div className="bg-amber-400 text-black rounded-xl">
            <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                <img src={"src/assets/Rick-And-Morty-Portal.jpeg"} alt={Location.name} className="h-44 w-44 rounded" />
            </div>

            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                <p className="text-xl font-semibold">{Location.name}</p>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                    <Link key={Location.id} to={`/location/${Location.id}`}>View More</Link>
                </button>
            </div>
        </div>
    );
};

export default LocationCard;
