import {useEffect, useState} from "react";
import {Title} from "../components/title.tsx";
import type {Character, CharacterFilter, Info} from "../utils/types.ts";
import {getData} from "../utils/api.ts";
import {CharacterCard} from "../components/CharacterCard.tsx";
import CharacterFilterMenu from "../components/CharacterFilterMenu.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {NavBar} from "../components/NavBar.tsx";
import Modal from 'react-modal';
import filterIcon from '../../public/filter-32.svg'
import Spinner from "../components/Spinner.tsx";

export function CharactersPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filters, setFilters] = useState<CharacterFilter>({});

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    const fetchCharacters = async () => {
        setIsLoading(true);
        try {
            const result: Info<Character> = await getData<Character, CharacterFilter>('character', filters, page);
            setCharacters((previous) => {
                    const auxMap: Map<number, Character> = new Map();
                    for (const character of previous) {
                        auxMap.set(character.id, character)
                    }
                    if (result.results)
                        for (const character of result.results as Character[]) {
                            if (!auxMap.has(character.id))
                                auxMap.set(character.id, character)
                        }
                    return Array.from(auxMap.values()).sort((a, b) => a.id - b.id)
                }
            );
            setHasMore(result.info?.next !== null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch characters');
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (hasMore) {
            fetchCharacters();
        }
    }, [filters, page]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight && !isLoading && hasMore) {
            setPage((previous) => previous + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);

    const onFilterChange = (newFilters: CharacterFilter) => {
        setFilters(newFilters);
        setCharacters([]);
        setPage(1);
        setHasMore(true);
    };

    if (error) {
        return <NotFoundPage/>;
    }

    return (
        <div>
            <div className="sticky top-0 z-50">
                <NavBar/>
            </div>
            <Title title={"Characters"}/>

            <div className={'flex flex-row justify-end px-8'}>
                <button
                    onClick={toggleFilterMenu}
                    className={'cursor-pointer hover:bg-gray-400 rounded-xl'}>
                    <img
                        src={filterIcon}
                        alt={'Filter Icon'}
                        className={'h-12 w-12'}
                    />
                </button>
            </div>

            <Modal
                isOpen={showFilterMenu}
                onRequestClose={toggleFilterMenu}
                contentLabel="Character Filter Menu"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg sm:w-3/4 lg:w-1/2 z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40">
                <CharacterFilterMenu onFilterChange={onFilterChange}/>
            </Modal>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 mx-auto max-w-screen-lg justify-items-center sm:justify-items-stretch gap-10">
                {characters.map((character) => (
                    <div key={character.id} className="flex items-center justify-center">
                        <CharacterCard data={character}/>
                    </div>
                ))}
            </div>

            <Spinner isLoading/>
        </div>
    );
}
