import EpisodeCard from "./EpisodeCard.tsx";
import type {Character, Episode, Location} from "../utils/types.ts";
import LocationCard from "./LocationCard.tsx";
import {CardCarrousel} from "./CardCarrousel.tsx";
import {CharacterCard} from "./CharacterCard.tsx";

type DataCarrouselsProps = {
    characters?: Character[];
    locations?: Location[];
    episodes?: Episode[];
}

function DataCarrousels({characters, locations, episodes}: DataCarrouselsProps) {
    return (
        <div className={'flex flex-col'}>
            <div>{characters && characters.length > 0 && (
                <CardCarrousel CardComponent={CharacterCard} data={characters} endpoint={'characters'}
                               title={'Characters'}></CardCarrousel>
            )}</div>
            <div>{locations && locations.length > 0 && (
                <CardCarrousel CardComponent={LocationCard} data={locations} endpoint={'locations'}
                               title={'Locations'}></CardCarrousel>
            )}</div>
            <div>{episodes && episodes.length > 0 && (
                <CardCarrousel CardComponent={EpisodeCard} data={episodes} endpoint={'episodes'}
                               title={'Episodes'}></CardCarrousel>
            )}</div>
        </div>
    );
}

export default DataCarrousels;
