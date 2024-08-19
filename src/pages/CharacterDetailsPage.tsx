import type {Character} from "../utils/types.ts";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getCharacterByID} from "../utils/api.ts";

export function CharacterDetailsPage() {
    const {id} = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!id) return;

        const fetchCharacter = async (id: number) => {
            try {
                const characterData: Character = await getCharacterByID(id);

                console.log(`character: ${characterData}`)
                if (characterData) {
                    setCharacter(characterData);
                }
            } catch (error) {
                console.error('Error fetching character:', error);
                setError('Failed to load character data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter(Number(id));
    }, [id]);

    if (error)
        return (<div>{error}</div>);


    return (
        <div className="container mx-auto p-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg font-semibold text-gray-500">Loading...</div>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">Character Details</h1>
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
                            <span className="font-semibold">Location Name:</span>
                            <Link className={'text-blue-500 hover:underline'}
                                  to={`/location/${character?.location.url.split('/').pop()}`}> {character?.location?.name}</Link>
                        </div>
                        <div>
                            <span className="font-semibold">Origin Name:</span>
                            <Link className={'text-blue-500 hover:underline'}
                                  to={`/location/${character?.origin.url.split('/').pop()}`}> {character?.origin?.name}</Link>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Episodes:</h2>
                        <div className={'grid grid-cols-2 space-y-1 justify-start'}>
                            {character?.episode.map((item, index) => {
                                const episode = item.split('/').pop()
                                return <Link className={'hover:underline'} key={index} to={`/episode/${episode}`}>episode {episode}</Link>
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
