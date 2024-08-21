import type {CharacterFilter, CharacterGender, CharacterStatus} from "../utils/types.ts";
import React, {useReducer, useRef} from "react";


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
    const formRef = useRef<HTMLFormElement>(null)

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

        if(formRef.current){
            formRef.current.reset();
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow">
            <div className={'flex flex-row flex-wrap justify-between mb-3'}>
                <h3 className="text-lg font-semibold ">Filter Characters</h3>
                <button
                    type="reset"
                    className="hover:underline text-gray-800 font-medium rounded-full w-1/6 transition duration-300 ml-auto mr-6 sm:mr-0 md:mr-0 lg:mr-0 "
                    onClick={handleReset}>
                    Clear
                </button>
            </div>
            <form ref={formRef} className="flex flex-col space-y-4">
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

                <div className="flex flex-row flex-wrap justify-around gap-5">
                    <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full py-2 w-full transition duration-300"
                        onClick={handleButtonPress}>
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CharacterFilterMenu;
