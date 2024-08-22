import {useParams} from "react-router-dom";
import {Title} from "../components/title.tsx";
import {CharacterCard} from "../components/CharacterCard.tsx";
import {getCharactersByID, getEpisodeByID} from "../utils/api.ts";
import {NavBar} from "../components/NavBar.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {useQuery} from "@tanstack/react-query";

export function EpisodeDetailsPage() {
    const {id: episodeId} = useParams();
    const id = Number(episodeId);

    const {isLoading: isLoadingEpisode, isError: isErrorEpisode, data: episode, error: episodeError} = useQuery({
        queryKey: ['episode', id],
        queryFn: () => getEpisodeByID(id),
        enabled: !!id,
    })
    const {
        isLoading: isLoadingCharacters,
        isError: isErrorCharacters,
        data: characters,
        error: charactersError
    } = useQuery({
        queryKey: ['characters', episode?.characters],
        queryFn: async () => {
            if (episode) {
                const characterIds = episode.characters.map((url) => Number(url.split('/').pop()))
                return getCharactersByID(characterIds)
            }
            return [];
        },
        enabled: !!episode,
    })

    if (isLoadingEpisode || isLoadingCharacters) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
                <span className="ml-4">Loading...</span>
            </div>
        )
    }

    if (isErrorEpisode || isErrorCharacters) {
        console.error('Error fetching data:', episodeError || charactersError);
        return <NotFoundPage/>;
    }

    return (
        <div>
            <div className="sticky top-0 z-50 mb-6">
                <NavBar/>
            </div>

            <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
                <Title title={'Episode Details'}/>

                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">ID:</span>
                            <span>{episode?.id}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Name:</span>
                            <span>{episode?.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Air Date:</span>
                            <span>{episode?.air_date}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Episode:</span>
                            <span>{episode?.episode}</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mt-4">Characters:</h2>

                    {characters && characters.length > 0 ? (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-content-center m-auto">
                            {characters.map((character) => (
                                <CharacterCard key={character.id} data={character}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No characters found for this episode.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
