import './App.css'
import {Title} from "./components/title.tsx";
import type {Character, CharacterFilter, Episode, EpisodeFilter, Location, LocationFilter} from "./utils/types.ts";
import {getData} from "./utils/api.ts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DataCarrousel from "./components/DataCarrousel.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {useQuery} from "@tanstack/react-query";
import NotFoundPage from "./pages/NotFoundPage.tsx";


function App() {
    const {
        isLoading: isLoadingCharacters,
        isError: isErrorCharacters,
        data: characters,
        error: charactersError
    } = useQuery({
        queryKey: ['characters', 'landing'],
        queryFn: async () => await getData<Character, CharacterFilter>('character')
    })

    const {
        isLoading: isLoadingEpisodes,
        isError: isErrorEpisodes,
        data: episodes,
        error: episodesError
    } = useQuery({
        queryKey: ['episodes', 'landing'],
        queryFn: async () => await getData<Episode, EpisodeFilter>('character')
    })

    const {
        isLoading: isLoadingLocations,
        isError: isErrorLocations,
        data: locations,
        error: locationsError
    } = useQuery({
        queryKey: ['locations', 'landing'],
        queryFn: async () => await getData<Location, LocationFilter>('location')
    })

    if (isLoadingCharacters || isLoadingEpisodes || isLoadingLocations) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
                <span className="ml-4">Loading...</span>
            </div>
        )
    }

    if (isErrorCharacters || isErrorEpisodes || isErrorLocations) {
        console.error('Error fetching data:', charactersError || episodesError || locationsError);
        return <NotFoundPage/>;
    }

    return (
        <div>
            <div className={'sticky top-0 z-50'}>
                <NavBar></NavBar>
            </div>
            <Title title={"Rick and Morty API"}></Title>
            <DataCarrousel characters={characters?.results} locations={locations?.results}
                           episodes={episodes?.results}></DataCarrousel>
        </div>
    )
}

export default App
