import { useEffect, useState } from "react";
import { Title } from "../components/title.tsx";
import type { Character, CharacterFilter } from "../utils/types.ts";
import { getCharacters } from "../utils/api.ts";
import CharacterCard from "../components/CharacterCard.tsx";
import FilterMenu from "../components/FilterMenu.tsx";

export function CharactersPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filters, setFilters] = useState<CharacterFilter>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setIsLoading(true);
                const result = await getCharacters(filters);
                console.log(result)
                setCharacters(result);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacters();
    }, [filters]);

    const onFilterMenuFilterChange = (newFilters: CharacterFilter) => {
        setFilters(newFilters);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <Title title={"Characters"} />
            <FilterMenu onFilterChange={onFilterMenuFilterChange} />

            <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                {characters.map((character) => (
                    <div key={character.id} className="mb-4 break-inside-avoid">
                        <CharacterCard character={character} />
                    </div>
                ))}
            </div>
        </div>
    );
}
