import type {CharacterFilter, CharacterGender, CharacterStatus} from "../utils/types.ts";
import React, {useState} from "react";

interface FilterMenuProps {
    onFilterChange: (filters: CharacterFilter) => void;
}

const characterGenders: CharacterGender[] = ['Female', 'Male', 'Genderless', 'unknown'];
const characterStatus: CharacterStatus[] = ['Alive', 'Dead', 'unknown'];


const FilterMenu: React.FC<FilterMenuProps> = ({onFilterChange}) => {
    const [filters, setFilters] = useState<CharacterFilter>({});

    const handleButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onFilterChange(filters)
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({...filters, gender: event.target.value as CharacterGender});
        // onFilterChange(filters)
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({...filters, status: event.target.value as CharacterStatus});
        // onFilterChange(filters)
    }


    return (
        <div className="p-4 bg-white rounded-xl shadow w-1/3">
            <h3 className="text-lg font-semibold mb-3">Filter Characters</h3> {/* Increased margin */}
            <form className="flex flex-col space-y-4"> {/* Added space between sections */}
                <div>
                    <h2 className="text-md font-medium mb-2">Gender</h2> {/* Adjusted heading size */}
                    <div className="flex flex-col space-y-1"> {/* Added space between options */}
                        {Object.values(characterGenders).map((gender) => (
                            <div key={gender} className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    id={`gender-${gender}`}
                                    value={gender}
                                    onChange={(e) => handleGenderChange(e)}
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
                        {/* ... radio buttons for status */
                            Object.values(characterStatus).map((status) => (
                                <div key={status} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        id={`status-${status}`}
                                        value={status}
                                        onChange={(e) => handleStatusChange(e)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`status-${status}`}>{status}</label>
                                </div>

                            ))}
                    </div>
                </div>

                <div className="flex justify-around w-full gap-5">
                    <button type="submit"
                            className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full py-2 px-4 w-full transition duration-300"
                            onClick={handleButtonPress}>
                        Apply
                    </button>
                    <button type="reset"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-full py-2 px-4 w-full transition duration-300">
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterMenu;
