import {useEffect, useState} from "react";
import {Title} from "../components/title.tsx";
import type {Character, CharacterFilter, Info} from "../utils/types.ts";
import {getData} from "../utils/api.ts";
import CharacterCard from "../components/CharacterCard.tsx";
import CharacterFilterMenu from "../components/CharacterFilterMenu.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {NavBar} from "../components/NavBar.tsx";
import Modal from 'react-modal';
import filterIcon from '../../public/filter-32.svg'

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

            <button
                onClick={toggleFilterMenu}
                className={'cursor-pointer hover:bg-gray-400 rounded-xl flex items-center justify-center'}>
                <img
                    src={filterIcon}
                    alt={'Filter Icon'}
                    className={'h-10 w-10'}
                />
            </button>

            <Modal
                isOpen={showFilterMenu}
                onRequestClose={toggleFilterMenu}
                contentLabel="Character Filter Menu"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg sm:w-3/4 lg:w-1/2 z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40">
                <CharacterFilterMenu onFilterChange={onFilterChange}/>
            </Modal>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 md:py-20 mx-auto max-w-screen-lg justify-items-center sm:justify-items-stretch">
                {characters.map((character) => (
                    <div key={character.id} className="mb-10 break-inside-avoid">
                        <CharacterCard data={character}/>
                    </div>
                ))}
            </div>

            {isLoading &&
                <div role="status">
                    <svg aria-hidden="true"
                         className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    );
}
