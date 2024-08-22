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
        return <div>Loading...</div>
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

            <div className="mx-auto container bg-[#FBFADA] shadow-lg rounded-lg p-6">
                <Title title={'Character Details'}></Title>
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <img src={character?.image} alt={character?.name}
                         className="h-44 w-44 rounded-full mb-4 lg:mb-0 lg:mr-8 shadow-lg"/>
                    <div className="space-y-2 text-lg">
                        <div><span className="font-semibold">ID:</span> {character?.id}</div>
                        <div><span className="font-semibold">Name:</span> {character?.name}</div>
                        <div><span className="font-semibold">Created:</span> {character?.created}</div>
                        <div><span className="font-semibold">Type:</span> {character?.type || 'Unknown'}</div>
                        <div><span className="font-semibold">Gender:</span> {character?.gender}</div>
                        <div><span className="font-semibold">Species:</span> {character?.species}</div>
                        <div><span className="font-semibold">Status:</span> {character?.status}</div>
                    </div>
                </div>
                <div className="mt-6 space-y-2">
                    <div>
                        <span className="font-semibold">Location: </span>
                        {
                            character?.location?.name === 'unknown' &&
                            <span className="text-black">{character?.location?.name}</span>
                        }
                        {
                            character?.location?.name !== 'unknown' &&
                            <Link className={'text-blue-500 hover:underline'}
                                  to={`/location/${character?.location.url.split('/').pop()}`}
                                  state={character?.location.url.split('/').pop()}
                            > {character?.location?.name}</Link>
                        }
                    </div>
                    <span className="font-semibold">Origin: </span>
                    {
                        character?.origin?.name === 'unknown' &&
                        <span className={'text-black '}>
                                {character?.origin?.name}</span>
                    }
                    {
                        character?.origin?.name !== 'unknown' &&
                        <Link className={'text-blue-500 hover:underline'}
                              to={`/location/${character?.origin.url.split('/').pop()}`}
                              state={character?.origin.url.split('/').pop()}> {character?.origin?.name}</Link>
                    }
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Episodes:</h2>
                    <div className={'grid grid-cols-2 space-y-1 justify-start'}>
                        {character?.episode?.map((item, index) => {
                            const episode = item.split('/').pop()
                            return <Link className={'hover:underline'} key={index}
                                         to={`/episode/${episode}`}
                                         state={episode}
                            >episode {episode}</Link>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
