import {useEffect, useState} from 'react'
import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Title} from "./components/title.tsx";
import type {Character, Episode, Location} from "./utils/types.ts";
import {getCharacters, getEpisodes, getLocations} from "./utils/api.ts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DataCarrousel from "./components/DataCarrousel.tsx";
import {SearchBar} from "./components/SearchBar.tsx";

const queryClient = new QueryClient()


function App() {
    const [characters, setCharacters] = useState<Character[]>([]); // Adjust 'any' to your data type
    const [locations, setLocations] = useState<Location[]>([]); // Adjust 'any' to your data type
    const [episodes, setEpisodes] = useState<Episode[]>([]); // Adjust 'any' to your data type
    const [_, setSearchValue] = useState("")

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


    const onSearchBarSearch = (value: string) => {
        setSearchValue(value)
    };

    return (
        <QueryClientProvider client={queryClient}>
            <SearchBar onSearch={onSearchBarSearch}></SearchBar>
            <Title title={"Rick and Morty API"}></Title>
            <DataCarrousel characters={characters} locations={locations} episodes={episodes}></DataCarrousel>
        </QueryClientProvider>
    )
}

export default App
