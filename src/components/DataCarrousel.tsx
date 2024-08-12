import CharacterCardCarrousel from './CharacterCardCarrousel'; // Adjust the import path as needed
import LocationCardCarrousel from './LocationCardCarrousel';
import EpisodeCardCarrousel from './EpisodeCardCarrousel';
import CharacterCard from "./CharacterCard.tsx";
import EpisodeCard from "./EpisodeCard.tsx";
import type {Character, Episode, Location} from "../utils/types.ts";
import LocationCard from "./LocationCard.tsx";

interface DataCarrouselsProps {
    characters: Character[]; // Adjust 'any' to your actual character data type
    locations: Location[];  // Adjust 'any' to your actual location data type
    episodes: Episode[];   // Adjust 'any' to your actual episode data type
}

function DataCarrousels({characters, locations, episodes}: DataCarrouselsProps) {
    return (
        <div>
            {characters?.length > 0 && (
                <CharacterCardCarrousel data={characters} CardComponent={CharacterCard}/>
            )}
            {locations?.length > 0 && (
                <LocationCardCarrousel data={locations} CardComponent={LocationCard}/>)
            }
            {episodes?.length > 0 && (
                <EpisodeCardCarrousel data={episodes} CardComponent={EpisodeCard}/>
            )}
        </div>
    );
};

export default DataCarrousels;
