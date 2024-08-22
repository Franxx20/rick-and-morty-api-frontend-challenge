import EpisodeCard from "./EpisodeCard.tsx";
import type {Character, Episode, Location} from "../utils/types.ts";
import LocationCard from "./LocationCard.tsx";
import {CardCarrousel} from "./CardCarrousel.tsx";
import characterCard from "./CharacterCard.tsx";

type DataCarrouselsProps = {
    characters: Character[];
    locations: Location[];
    episodes: Episode[];
}

function DataCarrousels({characters, locations, episodes}: DataCarrouselsProps) {
    return (
        <div className={'flex flex-col'}>
            <div>{characters?.length > 0 && (
                <CardCarrousel CardComponent={characterCard} data={characters} endpoint={'characters'}
                               title={'Characters'}></CardCarrousel>
            )}</div>
            <div>{locations?.length > 0 && (
                <CardCarrousel CardComponent={LocationCard} data={locations} endpoint={'locations'}
                               title={'Locations'}></CardCarrousel>
            )}</div>
            <div>{episodes?.length > 0 && (
                <CardCarrousel CardComponent={EpisodeCard} data={episodes} endpoint={'episodes'}
                               title={'Episodes'}></CardCarrousel>
            )}</div>
        </div>
    );
};

export default DataCarrousels;
