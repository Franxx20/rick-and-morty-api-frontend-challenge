import {useEffect, useState} from 'react'
import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Title} from "./components/title.tsx";
import type {Character, Episode, Location} from "./utils/types.ts";
import {getCharacters, getEpisodes, getLocations} from "./utils/api.ts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CharacterCard from "./components/CharacterCard.tsx";
import CharacterCardCarrousel from "./components/CharacterCardCarrousel.tsx";
import LocationCardCarrousel from "./components/LocationCardCarrousel.tsx";
import LocationCard from "./components/LocationCard.tsx";
import EpisodeCardCarrousel from "./components/EpisodeCardCarrousel.tsx";
import EpisodeCard from "./components/EpisodeCard.tsx";

const queryClient = new QueryClient()

function App() {
    const [characters, setCharacters] = useState<Character[]>([]); // Adjust 'any' to your data type
    const [locations, setLocations] = useState<Location[]>([]); // Adjust 'any' to your data type
    const [episodes, setEpisodes] = useState<Episode[]>([]); // Adjust 'any' to your data type
    async function getCharactersHelper() {
        const result: Character[] = await getCharacters()
        setCharacters(result);
    }

    async function getLocationsHelper() {
        const result: Location[] = await getLocations()
        setLocations(result);
    }

    async function getEpisodesHelper() {
        const result: Episode[] = await getEpisodes()
        setEpisodes(result);
    }

    useEffect(() => {
        getCharactersHelper()
        getEpisodesHelper()
        getLocationsHelper()
    }, [])


    return (
        <QueryClientProvider client={queryClient}>
            <Title title={"Rick and Morty API"}></Title>
            {/*<div className="container mx-auto p-4">*/}
            {/*    <button className="btn btn-primary bg-amber-400" onClick={getCharactersHelper}>*/}
            {/*        CharactersPage*/}
            {/*    </button>*/}
            {/*    <button className="btn btn-primary" onClick={getLocationsHelper}>*/}
            {/*        LocationsPage*/}
            {/*    </button>*/}
            {/*    <button className='btn btn-primary' onClick={getEpisodesHelper}>*/}
            {/*        EpisodesPage*/}
            {/*    </button>*/}
            {/*</div>*/}

            {characters?.length > 0 && (
                <CharacterCardCarrousel data={characters} CardComponent={CharacterCard}/>
            )
            }
            {locations?.length > 0 && (
                <LocationCardCarrousel data={locations} CardComponent={LocationCard}></LocationCardCarrousel>
            )
            }
            {episodes?.length > 0 && (
                <EpisodeCardCarrousel data={episodes} CardComponent={EpisodeCard}/>
            )
            }
        </QueryClientProvider>
    )
}

export default App
