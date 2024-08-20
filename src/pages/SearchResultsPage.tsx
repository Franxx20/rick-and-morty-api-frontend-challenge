import {Title} from "../components/title.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCharacters, getEpisodes, getLocations} from "../utils/api.ts";
import type {Character, Episode, Location} from "../utils/types.ts";
import DataCarrousel from "../components/DataCarrousel.tsx";
import {NavBar} from "../components/NavBar.tsx";

export function SearchResultsPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query") || '';

    const [characters, setCharacters] = useState<Character[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            const characterSearchResult = await getCharacters({name: query});
            const locationSearchResult = await getLocations({name: query});
            const episodeSearchResult = await getEpisodes({name: query}); // Corrected function call

            setCharacters(characterSearchResult);
            setLocations(locationSearchResult);
            setEpisodes(episodeSearchResult);
        };
        fetchSearchResults()
    }, [query]);

    return (
        <div>
            <div className="sticky top-0 z-50">
                <NavBar/>
            </div>
            <Title title={"Search Results"}/>
            <DataCarrousel characters={characters} locations={locations} episodes={episodes}/>
        </div>
    )
}
