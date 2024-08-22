import type {CardCarrouselProp, Character, Episode, Location} from "../utils/types.ts";
import {Link} from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {CAROUSEL_SETTINGS} from "../utils/Constants.ts";


export const CardCarrousel = <T extends Character | Location | Episode>({
                                                                            data,
                                                                            CardComponent,
                                                                            title,
                                                                            endpoint
                                                                        }: CardCarrouselProp<T>) => {
    return (
        <div>
            <div className={'mx-4'}>
                <h2 className="text-4xl text-left font-semibold">{title}</h2>
            </div>
            <div className="text-right m-4">
                <Link
                    className="items-end text-black hover:bg-gray-400 p-2 rounded"
                    to={'/' + endpoint}>
                    {"See More >>"}
                </Link>
            </div>
            <div>
                <Carousel draggable={true} swipeable={true} infinite={true} keyBoardControl={true} centerMode={true}
                          focusOnSelect={true} responsive={CAROUSEL_SETTINGS}
                          itemClass={"flex justify-center items-center"}>
                    {
                        data.map((element) => (
                            <CardComponent key={element.id} data={element}/>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    );
};
