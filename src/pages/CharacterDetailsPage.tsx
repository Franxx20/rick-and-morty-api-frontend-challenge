import {Title} from "../components/title.tsx";
import type {Character} from "../utils/types.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
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
        isLoading ? <div>Loading...</div> :
            <div>
                <Title title="CharactersPage Details"/>
                <div>ID: {character?.id}</div>
                <div>Name: {character?.name}</div>
                <div>Created: {character?.created}</div>
                <div>Type: {character?.type}</div>
                <div>
                    Episodes:
                    {character?.episode.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
                <img src={character?.image} alt={character?.name} className="h-44 w-44 rounded"/>
                <div>Gender?. {character?.gender} </div>
                <div>Location Name: {character?.location.name}</div>
                <div>Location URL: {character?.location.url}</div>
                <div>Origin Name: {character?.origin.name}</div>
                <div>Origin URL: {character?.origin.url}</div>
                <div>Species: {character?.species}</div>
                <div>Status: {character?.status}</div>
            </div>
    );
}
