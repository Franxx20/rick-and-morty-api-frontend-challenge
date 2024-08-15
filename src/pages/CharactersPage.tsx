import {useEffect, useReducer, useState} from "react";

import {Title} from "../components/title.tsx";
import type {Character, CharacterFilter, Info} from "../utils/types.ts";
import {getData} from "../utils/api.ts";
import CharacterFilterMenu from "../components/CharacterFilterMenu.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {NavBar} from "../components/NavBar.tsx";
import Modal from 'react-modal'
import CharacterCard from "../components/CharacterCard.tsx";

type State = {
    characters: Character[];
    filters: CharacterFilter;
    isLoading: boolean;
    error: string | null;
    pageNumber: number,
    hasMore: boolean
    showFilterMenu: boolean
};

type Action =
    | { type: 'SET_CHARACTERS'; payload: Character[] }
    | { type: 'SET_FILTERS'; payload: CharacterFilter }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_PAGE_NUMBER'; payload: number }
    | { type: 'SET_SHOW_FILTER_MENU'; payload: boolean }
    | { type: 'SET_HAS_MORE'; payload: boolean }

const initialState: State = {
    characters: [],
    filters: {},
    isLoading: true,
    error: null,
    pageNumber: 1,
    hasMore: false,
    showFilterMenu: false
};


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_CHARACTERS':
            return {
                ...state,
                characters: state.pageNumber === 1 // Replace if on first page (new filter)
                    ? action.payload
                    : [...state.characters, ...action.payload], // Append if fetching next page
                isLoading: false,
                error: null
            };
        case 'SET_FILTERS':
            return {...state, filters: action.payload};
        case 'SET_LOADING':
            return {...state, isLoading: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload, isLoading: false};
        case 'SET_PAGE_NUMBER':
            return {...state, pageNumber: action.payload};
        case "SET_SHOW_FILTER_MENU":
            return {...state, showFilterMenu: action.payload};
        case "SET_HAS_MORE":
            return {...state, hasMore: action.payload};
        default:
            return state;
    }
}

export function CharactersPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(0); // Track the total number of pages

    const toggleFilterMenu = () => {
        dispatch({type: 'SET_SHOW_FILTER_MENU', payload: !state.showFilterMenu});
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            dispatch({type: 'SET_LOADING', payload: true});
            try {
                const result: Info<Character> = await getData<Character, CharacterFilter>('character', state.filters, currentPage); // Use currentPage
                dispatch({type: 'SET_CHARACTERS', payload: result.results as Character[]});
                setTotalPages(result.info?.pages ?? 1);
            } catch (err) {
                console.error(err);
                dispatch({type: 'SET_ERROR', payload: 'Failed to fetch characters'});
            }
        };

        fetchCharacters();
    }, [state.filters, currentPage]); // Add currentPage to dependency array

    const onFilterChange = (newFilters: CharacterFilter) => {
        dispatch({type: 'SET_FILTERS', payload: newFilters});
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (state.isLoading) {
        return <div>Loading...</div>;
    }

    if (state.error) {
        return <NotFoundPage></NotFoundPage>
    }


    return (
        <div>
            <div className="sticky top-0 z-50">
                <NavBar></NavBar>
            </div>
            <Title title={"Characters"}/>
            <img src={'src/assets/filter-32.svg'} alt={'../assets/filter-icon.jpg'} onClick={toggleFilterMenu}
                 className={'h-10 cursor-pointer'}/>

            <Modal
                isOpen={state.showFilterMenu}
                onRequestClose={toggleFilterMenu}
                contentLabel="Character Filter Menu"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md p-4 max-w-full w-auto sm:w-3/4 lg:w-1/2 max-h-full z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <CharacterFilterMenu onFilterChange={onFilterChange}/>
            </Modal>

            <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                {state.characters.map((character) => (
                    <div key={character.id} className="mb-4 break-inside-avoid">
                        {/* Assuming you have a CharacterCard component */}
                        <CharacterCard data={character}/>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3  
 py-1 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50">
                    Previous
                </button>

                {/* First Page Button (if not already shown) */}
                {currentPage > 3 && (
                    <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className={`px-3 py-1 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        1
                    </button>
                )}

                {/* Ellipsis (if there are pages before the current range) */}
                {currentPage > 3 && <span className="px-3 py-1">...</span>}

                {/* Limited Page Numbers */}
                {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                    const startPage = Math.max(1, currentPage - 2);
                    const pageNumber = startPage + i;
                    return pageNumber <= totalPages ? pageNumber : null;
                })
                    .filter(Boolean) // Remove null values
                    .map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber ?? 1)}
                            className={`px-3 py-1 ${
                                currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                {/* Ellipsis (if there are pages after the current range) */}
                {currentPage < totalPages - 2 && <span className="px-3 py-1">...</span>}

                {/* Last Page Button (if not already shown) */}
                {currentPage < totalPages - 2 && (
                    <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-1 ${
                            currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {totalPages}
                    </button>
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
