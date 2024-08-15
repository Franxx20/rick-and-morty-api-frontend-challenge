import {useEffect, useReducer, useState} from "react";

import {Title} from "../components/title.tsx";
import type {Character, CharacterFilter} from "../utils/types.ts";
import {getCharacters} from "../utils/api.ts";
import CharacterCard from "../components/CharacterCard.tsx";
import CharacterFilterMenu from "../components/CharacterFilterMenu.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import {NavBar} from "../components/NavBar.tsx";
import Modal from 'react-modal'

type State = {
    characters: Character[];
    filters: CharacterFilter;
    isLoading: boolean;
    error: string | null;
};

type Action =
    | { type: 'SET_CHARACTERS'; payload: Character[] }
    | { type: 'SET_FILTERS'; payload: CharacterFilter }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

const initialState: State = {
    characters: [],
    filters: {},
    isLoading: true,
    error: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_CHARACTERS':
            return {...state, characters: action.payload, isLoading: false, error: null};
        case 'SET_FILTERS':
            return {...state, filters: action.payload};
        case 'SET_LOADING':
            return {...state, isLoading: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload, isLoading: false};
        default:
            return state;
    }
}

export function CharactersPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            dispatch({type: 'SET_LOADING', payload: true});
            try {
                const result = await getCharacters(state.filters);
                dispatch({type: 'SET_CHARACTERS', payload: result});
            } catch (err) {
                console.error(err);
                dispatch({type: 'SET_ERROR', payload: 'Failed to fetch characters'});
            }
        };

        fetchCharacters();
    }, [state.filters]);

    const onFilterChange = (newFilters: CharacterFilter) => {
        dispatch({type: 'SET_FILTERS', payload: newFilters});
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
            <img src={'src/assets/filter-32.svg'} alt={'../assets/filter-icon.jpg'}  onClick={toggleFilterMenu} className={'h-10 cursor-pointer'}/>

            <Modal
                isOpen={showFilterMenu}
                onRequestClose={toggleFilterMenu}
                contentLabel="Character Filter Menu"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md p-4 max-w-full w-auto sm:w-3/4 lg:w-1/2 max-h-full z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <CharacterFilterMenu onFilterChange={onFilterChange} />
            </Modal>

            <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                {state.characters.map((character) => (
                    <div key={character.id} className="mb-4 break-inside-avoid">
                        <CharacterCard data={character}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
