import {useLocation} from "react-router-dom";
import type {Character, Location} from '../utils/types.ts';
import {Title} from "../components/title.tsx";
import {NavBar} from "../components/NavBar.tsx";
import {useCallback, useEffect, useState} from "react";
import {getCharactersByID} from "../utils/api.ts";
import NotFoundPage from "./NotFoundPage.tsx";
import CharacterCard from "../components/CharacterCard.tsx";

export function LocationDetailsPage() {
    const locationObject = useLocation()
    const location: Location = locationObject.state || {}
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCharacters = useCallback(async () => {
        setIsLoading(true)
        try {
            const characterIds: number[] = location.residents.map((character) => Number(character.split('/').pop()))
            const result: Character[] = await getCharactersByID(characterIds) as Character[]
            setCharacters(result)
            console.log(result.length)
        } catch (e) {
            setError('Failed to fetch Characters')
            throw e
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCharacters().catch(console.error)
    }, [fetchCharacters]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <NotFoundPage/>;
    }

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
                        className="font-semibold">Created:</span> {location?.created}
                    </div>
                    <div><span className="font-semibold">Dimension:</span> {location?.dimension || 'Unknown'}</div>
                </div>

                <h2 className="text-xl font-semibold mt-4">Residents:</h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-10 md:py-20 mx-auto max-w-screen-lg justify-items-center">
                    {characters && characters.length > 0 &&
                        characters.map((character) => (
                            <div key={character.id} className="mb-4 break-inside-avoid">
                                <CharacterCard data={character}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
