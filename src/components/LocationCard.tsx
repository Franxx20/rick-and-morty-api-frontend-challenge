import type {Location} from "../utils/types.ts";
import {Link} from "react-router-dom";
import React from "react"; // Adjust the import path if needed
import portal from '../../public/Rick-And-Morty-Portal.png'

type LocationCardProp = {
    data: Location;
}


const LocationCard: React.FC<LocationCardProp> = ({data}) => {
    return (
        <Link
            key={data.id}
            to={`/location/${data.id}`}
            state={data}
            className="relative block rounded-xl transition duration-300 hover:scale-110">
            <div className="relative flex justify-center items-center overflow-hidden rounded-full">
                <img
                    src={portal}
                    alt={data.name}
                    className="rounded-full transition-transform duration-300 hover:scale-110"/>
                <p className="absolute w-2/5 text-xl text-center font-bold text-pretty truncate">
                    {data.name}
                </p>
            </div>
        </Link>
    );
};


export default LocationCard;
