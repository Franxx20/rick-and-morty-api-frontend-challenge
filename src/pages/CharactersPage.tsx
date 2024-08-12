import {Title} from "../components/title.tsx";
import {useEffect, useState} from "react";
import type {Character} from "../utils/types.ts";
import {getCharacters} from "../utils/api.ts";
import CharacterCard from "../components/CharacterCard.tsx";

export function CharactersPage() {
    const [characters, setCharacters] = useState<Character[]>([]);

    async function getCharactersHelper() {
        const result: Character[] = await getCharacters()
        setCharacters(result);
    }

    useEffect(() => {
        getCharactersHelper()
    }, [])

    return (
        <div>
            <Title title={"Characters"}/>

            <div className='columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4'>
                {
                    characters.map((character) => (
                        <div key={character.id} className='mb-4 break-inside-avoid'>
                            <CharacterCard character={character}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

