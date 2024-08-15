import type {CardCarrouselProp, Character, Episode,Location} from "../utils/types.ts";
import {CARROUSEL_SETTINGS} from "../utils/Constants.ts";
import Slider from "react-slick";
import {Link} from "react-router-dom";


export const CardCarrousel = <T extends Character | Location | Episode>({ data, CardComponent, title, endpoint }: CardCarrouselProp<T>) => {
    return (
        <div className="flex flex-col">
            <h2 className="text-4xl text-left font-semibold ">{title}:</h2>
            <div className="text-right">
                <Link
                    className="items-end text-black hover:bg-gray-400 mb-0 p-2 rounded"
                    to={'/' + endpoint}>
                    {"See More >>"}
                </Link>
            </div>
            <div className="w-3/4 m-auto mt-5">
                <Slider {...CARROUSEL_SETTINGS}>
                    {data.map((element) => (
                        <CardComponent key={element.id} data={element} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

