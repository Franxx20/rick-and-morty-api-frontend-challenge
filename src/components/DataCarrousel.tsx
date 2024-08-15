import EpisodeCard from "./EpisodeCard.tsx";
import type {Character, Episode, Location} from "../utils/types.ts";
import LocationCard from "./LocationCard.tsx";
import {CardCarrousel} from "./CardCarrousel.tsx";
import characterCard from "./CharacterCard.tsx";

type DataCarrouselsProps = {
    characters: Character[]; // Adjust 'any' to your actual character data type
    locations: Location[];  // Adjust 'any' to your actual location data type
    episodes: Episode[];   // Adjust 'any' to your actual episode data type
}

function DataCarrousels({characters, locations, episodes}: DataCarrouselsProps) {
    return (
        <div>
            {characters?.length > 0 && (
                <CardCarrousel CardComponent={characterCard} data={characters} endpoint={'characters'}
                               title={'Characters'}></CardCarrousel>
            )}
            {locations?.length > 0 && (
                <CardCarrousel CardComponent={LocationCard} data={locations} endpoint={'locations'}
                               title={'Locations'}></CardCarrousel>
            )}
            {episodes?.length > 0 && (
                <CardCarrousel CardComponent={EpisodeCard} data={episodes} endpoint={'episodes'}
                                                            title={'Episodes'}></CardCarrousel>
            )}
        </div>
    );
};

export default DataCarrousels;
