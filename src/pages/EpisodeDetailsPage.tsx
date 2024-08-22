import {useParams} from "react-router-dom";
import {Title} from "../components/title.tsx";
import CharacterCard from "../components/CharacterCard.tsx";
import {getCharactersByID, getEpisodeByID} from "../utils/api.ts";
import {NavBar} from "../components/NavBar.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {useQuery} from "@tanstack/react-query";

export function EpisodeDetailsPage() {
    const {id: episodeId} = useParams();
    const id = Number(episodeId);

    const {
        isLoading: isLoadingEpisode,
        isError: isErrorEpisode,
        data: episode,
        error: episodeError
    } = useQuery({
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
        return <div>Loading...</div>
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

            <div className="mx-auto container bg-[#FBFADA] shadow-lg rounded-lg p-6">
                <Title title={'Episode Details'}></Title>
                <div className="space-y-4 text-lg">
                    <div><span className="font-semibold">ID:</span> {episode?.id}</div>
                    <div><span className="font-semibold">Name:</span> {episode?.name}</div>
                    <div><span className="font-semibold">Air Date:</span> {episode?.air_date}</div>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Characters:</h2>

                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-10 md:py-20 mx-auto max-w-screen-lg justify-items-center">
                        {characters && characters.length && characters.map((character) => (
                            <div key={character.id} className="mb-4 break-inside-avoid">
                                <CharacterCard data={character}/>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
