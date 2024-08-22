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
            className="relative block bg-green rounded-full overflow-hidden transition duration-300 hover:scale-110"
            style={{width: '25vw', height: '25vw', maxWidth: '14rem', maxHeight: '14rem'}}
        >
            <img
                src={portal}
                alt={data.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 flex justify-center items-center">
                <p className="text-xl text-center font-bold text-pretty truncate">
                    {data.name}
                </p>
            </div>
        </Link>
    );
};


export default LocationCard;
