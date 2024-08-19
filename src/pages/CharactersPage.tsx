import {useEffect, useState} from "react";
import {Title} from "../components/title.tsx";
import type {Character, CharacterFilter, Info} from "../utils/types.ts";
import {getData} from "../utils/api.ts";
import CharacterCard from "../components/CharacterCard.tsx";
import CharacterFilterMenu from "../components/CharacterFilterMenu.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {NavBar} from "../components/NavBar.tsx";
import Modal from 'react-modal';

export function CharactersPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filters, setFilters] = useState<CharacterFilter>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);  // New state to track if more pages are available

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);
            try {
                const result: Info<Character> = await getData<Character, CharacterFilter>('character', filters, page);
                setCharacters((previous) => [...new Set([...previous, ...result.results as Character[]])]);
                setHasMore(result.info?.next !== null);  // Update hasMore based on API response
            } catch (err) {
                console.error(err);
                setError('Failed to fetch characters');
            } finally {
                setIsLoading(false);
            }
        };
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
        setCharacters([]);  // Clear characters list on new filter change
        setPage(1);  // Reset to first page on new filter change
        setHasMore(true);  // Reset hasMore when filters change
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
            <img
                src={'src/assets/filter-32.svg'}
                alt={'../assets/filter-icon.jpg'}
                onClick={toggleFilterMenu}
                className={'h-10 cursor-pointer'}
            />

            <Modal
                isOpen={showFilterMenu}
                onRequestClose={toggleFilterMenu}
                contentLabel="Character Filter Menu"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md p-4 max-w-full w-auto sm:w-3/4 lg:w-1/2 max-h-full z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <CharacterFilterMenu onFilterChange={onFilterChange}/>
            </Modal>

            <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                {characters.map((character) => (
                    <div key={character.id} className="mb-4 break-inside-avoid">
                        <CharacterCard data={character}/>
                    </div>
                ))}
            </div>

            {isLoading && <div className="text-center py-4">Loading...</div>}
        </div>
    );
}
