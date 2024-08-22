import {Link, useParams} from "react-router-dom";
import {Title} from "../components/title.tsx";
import {useQuery} from "@tanstack/react-query";
import {getCharacterByID} from "../utils/api.ts";
import NotFoundPage from "./NotFoundPage.tsx";
import {NavBar} from "../components/NavBar.tsx";

export function CharacterDetailsPage() {
    const {id: characterId} = useParams();
    const id = Number(characterId);

    const {
        isLoading: isLoadingCharacter,
        isError: isErrorCharacter,
        data: character,
        error: characterError
    } = useQuery({
        queryKey: ['character', id],
        queryFn: async () => getCharacterByID(id),
        enabled: !!id,
    })

    if (isLoadingCharacter) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
                <span className="ml-4">Loading...</span>
            </div>
        )
    }

    if (isErrorCharacter) {
        console.error('Error fetching data:', characterError);
        return <NotFoundPage/>;
    }

    return (
        <div>
            <div className="sticky top-0 z-50 mb-6">
                <NavBar/>
            </div>

            <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
                <Title title={'Character Details'}/>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <div className="lg:w-1/3">
                        <img src={character?.image} alt={character?.name}
                             className="w-full h-auto rounded-full shadow-lg"/>
                    </div>
                    <div className="lg:w-2/3 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">ID:</span>
                                <span>{character?.id}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Name:</span>
                                <span>{character?.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Status:</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${character?.status === 'Alive' ? 'bg-green-200 text-green-800' : character?.status === 'Dead' ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'}`}>
                                    {character?.status}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Species:</span>
                                <span>{character?.species}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Type:</span>
                                <span>{character?.type || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Gender:</span>
                                <span>{character?.gender}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Created:</span>
                                <span>{character?.created}</span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Location:</span>
                                {
                                    character?.location?.name === 'unknown' &&
                                    <span className="text-gray-600">{character?.location?.name}</span>
                                }
                                {
                                    character?.location?.name !== 'unknown' &&
                                    <Link className={'text-blue-500 hover:underline'}
                                          to={`/location/${character?.location.url.split('/').pop()}`}
                                          state={character?.location.url.split('/').pop()}
                                    > {character?.location?.name}</Link>
                                }
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Origin:</span>
                                {
                                    character?.origin?.name === 'unknown' &&
                                    <span className={'text-gray-600'}>
                                        {character?.origin?.name}</span>
                                }
                                {
                                    character?.origin?.name !== 'unknown' &&
                                    <Link className={'text-blue-500 hover:underline'}
                                          to={`/location/${character?.origin.url.split('/').pop()}`}
                                          state={character?.origin.url.split('/').pop()}> {character?.origin?.name}</Link>
                                }
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Episodes:</h2>
                            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'}>
                                {character?.episode?.map((item, index) => {
                                    const episode = item.split('/').pop()
                                    return <Link key={index}
                                                 to={`/episode/${episode}`}
                                                 state={episode}
                                                 className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded inline-block">
                                        Episode {episode}
                                    </Link>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
