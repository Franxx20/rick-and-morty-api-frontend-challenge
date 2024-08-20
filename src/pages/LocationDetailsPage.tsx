import {useLocation} from "react-router-dom";
import type {Character, Location} from '../utils/types.ts';
import {Title} from "../components/title.tsx";
import {NavBar} from "../components/NavBar.tsx";
import {useEffect, useState} from "react";
import {getCharactersByID} from "../utils/api.ts";
import CharacterCard from "../components/CharacterCard.tsx";

export function LocationDetailsPage() {
    const locationObject = useLocation()
    const location: Location = locationObject.state || {}
    const characterIds: number[] = location.residents.map((character) => Number(character.split('/').pop()))
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {

        const fetchCharacters = async () => {
            const result = await getCharactersByID(characterIds)
            setCharacters(result)
        }

        fetchCharacters()
    }, []);

    return (
        <div className="container mx-auto">
            <div className="sticky top-0 z-50 mb-4">
                <NavBar/>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <Title title={'Location Details'}></Title>
                <div className="space-y-4 text-lg">
                    <div><span className="font-semibold">ID:</span> {location?.id}</div>
                    <div><span className="font-semibold">Name:</span> {location?.name}</div>
                    <div><span
                        className="font-semibold">Created:</span> {new Date(location?.created).toLocaleDateString()}
                    </div>
                    <div><span className="font-semibold">Dimension:</span> {location?.dimension || 'Unknown'}</div>
                </div>

                <h2 className="text-xl font-semibold mt-4">Residents:</h2>
                <div className="columns-1 sm:columns-2 lg:columns-3 md:py-20 gap-4">
                    {characters.map((character) => (
                        <div key={character.id} className="mb-4 break-inside-avoid">
                            <CharacterCard data={character}/>
                        </div>
                    ))}
                </div>
                {/*<div className="mt-6">*/}
                {/*    <h2 className="text-xl font-semibold mb-2">Residents:</h2>*/}
                {/*    <ul className="list-disc list-inside space-y-1">*/}
                {/*        {location?.residents.map((character, index) => (*/}
                {/*            <li key={index} className="text-blue-500 hover:underline">*/}
                {/*                {character}*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
