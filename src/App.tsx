import {useEffect, useState} from 'react'
import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Title} from "./components/title.tsx";
import type {Character, Episode, Location} from "./utils/types.ts";
import {getCharacters, getEpisodes, getLocations} from "./utils/api.ts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DataCarrousel from "./components/DataCarrousel.tsx";
import {NavBar} from "./components/NavBar.tsx";

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
            <div className={'sticky top-0 z-50'}>
                <NavBar></NavBar>
            </div>
            <Title title={"Rick and Morty API"}></Title>
            <DataCarrousel characters={characters} locations={locations} episodes={episodes}></DataCarrousel>
        </QueryClientProvider>
    )
}

export default App
