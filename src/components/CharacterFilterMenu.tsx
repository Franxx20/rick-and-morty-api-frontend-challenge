import type {CharacterFilter, CharacterGender, CharacterStatus} from "../utils/types.ts";
import React, {useReducer} from "react";


type FilterAction =
    | { type: 'SET_GENDER'; payload: CharacterGender }
    | { type: 'SET_STATUS'; payload: CharacterStatus }
    | { type: 'RESET' };

function filterReducer(state: CharacterFilter, action: FilterAction): CharacterFilter {
    switch (action.type) {
        case 'SET_GENDER':
            return {...state, gender: action.payload};
        case 'SET_STATUS':
            return {...state, status: action.payload};
        case 'RESET':
            return {};
        default:
            return state;
    }
}

type  FilterMenuProps = {
    onFilterChange: (filters: CharacterFilter) => void;
}

const characterGenders: CharacterGender[] = ['Female', 'Male', 'Genderless', 'unknown'];
const characterStatus: CharacterStatus[] = ['Alive', 'Dead', 'unknown'];

const CharacterFilterMenu: React.FC<FilterMenuProps> = ({onFilterChange}) => {
    const [filters, dispatch] = useReducer(filterReducer, {});

    const handleButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET_GENDER', payload: event.target.value as CharacterGender});
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET_STATUS', payload: event.target.value as CharacterStatus});
    };

    const handleReset = () => {
        dispatch({type: 'RESET'});
        onFilterChange({});
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow w-1/3">
            <h3 className="text-lg font-semibold mb-3">Filter Characters</h3>
            <form className="flex flex-col space-y-4">
                <div>
                    <h2 className="text-md font-medium mb-2">Gender</h2>
                    <div className="flex flex-col space-y-1">
                        {characterGenders.map((gender) => (
                            <div key={gender} className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    id={`gender-${gender}`}
                                    value={gender}
                                    onChange={handleGenderChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`gender-${gender}`}>{gender}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-md font-medium mb-2">Status</h2>
                    <div className="flex flex-col space-y-1">
                        {characterStatus.map((status) => (
                            <div key={status} className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    id={`status-${status}`}
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`status-${status}`}>{status}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-around w-full gap-5">
                    <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full py-2 px-4 w-full transition duration-300"
                        onClick={handleButtonPress}>
                        Apply
                    </button>
                    <button
                        type="reset"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-full py-2 px-4 w-full transition duration-300"
                        onClick={handleReset}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CharacterFilterMenu;
