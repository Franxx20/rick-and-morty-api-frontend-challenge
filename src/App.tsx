import {useEffect, useState} from 'react'
import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Title} from "./components/title.tsx";
import type {Character, CharacterFilter, Episode, EpisodeFilter, Location, LocationFilter} from "./utils/types.ts";
import {getData} from "./utils/api.ts";
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
        const result = await getData<Character, CharacterFilter>('character')
        setCharacters(result.results as Character[]);
    }

    async function getLocationsHelper() {
        const result = await getData<Location, LocationFilter>('location')
        setLocations(result.results as Location[]);
    }

    async function getEpisodesHelper() {
        const result = await getData<Episode, EpisodeFilter>('episode')
        setEpisodes(result.results as Episode[]);
    }

    useEffect(() => {
        getCharactersHelper()
        getEpisodesHelper()
        getLocationsHelper()
    }, [])


    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <div className={'sticky top-0 z-50'}>
                    <NavBar></NavBar>
                </div>
                <Title title={"Rick and Morty API"}></Title>
                <DataCarrousel characters={characters} locations={locations} episodes={episodes}></DataCarrousel>
            </div>
        </QueryClientProvider>
    )
}

export default App
