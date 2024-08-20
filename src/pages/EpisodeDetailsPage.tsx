import {useLocation} from "react-router-dom";
import type {Character, Episode} from "../utils/types.ts";
import {Title} from "../components/title.tsx";
import CharacterCard from "../components/CharacterCard.tsx";
import {useEffect, useState} from "react";
import {getCharactersByID} from "../utils/api.ts";
import {NavBar} from "../components/NavBar.tsx";

export function EpisodeDetailsPage() {
    const location = useLocation()
    const episode: Episode = location.state || {}
    const characterIds: number[] = episode.characters.map((character) => Number(character.split('/').pop()))
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
                <Title title={'Episode Details'}></Title>
                <div className="space-y-4 text-lg">
                    <div><span className="font-semibold">ID:</span> {episode?.id}</div>
                    <div><span className="font-semibold">Name:</span> {episode?.name}</div>
                    <div><span className="font-semibold">Air Date:</span> {episode?.air_date}</div>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Characters:</h2>

                    <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                        {characters.map((character) => (
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
