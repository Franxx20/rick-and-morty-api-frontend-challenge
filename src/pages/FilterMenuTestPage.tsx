import type {CharacterFilter} from "../utils/types.ts";

interface FilterMenuProps {
    onFilterChange: (filters: CharacterFilter) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({onFilterChange}) => {
    // const [filters, setFilters] = useState<CharacterFilter>({});
    //
    // const handleCheckboxChange = (
    //     event: React.ChangeEvent<HTMLInputElement>,
    //     filterKey: keyof CharacterFilter,
    //     value: string | string[]
    // ) => {
    //     setFilters((prevFilters) => {
    //         const updatedFilters = { ...prevFilters };
    //
    //         if (event.target.checked) {
    //             if (Array.isArray(value)) {
    //                 updatedFilters[filterKey] = [...(prevFilters[filterKey] as string[] || []), value[0]];
    //             } else {
    //                 updatedFilters[filterKey] = value;
    //             }
    //         } else {
    //             if (Array.isArray(value)) {
    //                 updatedFilters[filterKey] = (prevFilters[filterKey] as string[] || []).filter(
    //                     (item) => item !== value[0]
    //                 );
    //             } else {
    //                 delete updatedFilters[filterKey];
    //             }
    //         }
    //
    //         onFilterChange(updatedFilters);
    //         return updatedFilters;
    //     });
    // };
    //
    // return (
    //     <div className="p-4 bg-white rounded shadow">
    //         <h3 className="text-lg font-semibold mb-2">Filter Characters</h3>
    //
    //         {/* Status Filter */}
    //         <div className="mb-4">
    //             <h4 className="text-md font-medium mb-1">Status</h4>
    //             {Object.values(CharacterStatus).map((status) => (
    //                 <div key={status} className="flex items-center">
    //                     <input
    //                         type="checkbox"
    //                         id={`status-${status}`}
    //                         checked={filters.status === status}
    //                         onChange={(e) => handleCheckboxChange(e, 'status', status)}
    //                         className="mr-2"
    //                     />
    //                     <label htmlFor={`status-${status}`}>{status}</label>
    //                 </div>
    //             ))}
    //         </div>
    //
    //         {/* Species Filter (Example with multiple options) */}
    //         <div className="mb-4">
    //             <h4 className="text-md font-medium mb-1">Species</h4>
    //             {/* You'll likely fetch species options from an API or have them pre-defined */}
    //             {['Human', 'Alien', 'Mythological Creature'].map((species) => (
    //                 <div key={species} className="flex items-center">
    //                     <input
    //                         type="checkbox"
    //                         id={`species-${species}`}
    //                         checked={(filters.species || []).includes(species)}
    //                         onChange={(e) => handleCheckboxChange(e, 'species', [species])}
    //                         className="mr-2"
    //                     />
    //                     <label htmlFor={`species-${species}`}>{species}</label>
    //                 </div>
    //             ))}
    //         </div>
    //
    //         {/* Type Filter */}
    //         <div className="mb-4">
    //             <h4 className="text-md font-medium mb-1">Type</h4>
    //             <input
    //                 type="text"
    //                 value={filters.type || ''}
    //                 onChange={(e) => handleCheckboxChange(e, 'type', e.target.value)}
    //                 placeholder="Enter type"
    //                 className="border rounded px-3 py-2 w-full"
    //             />
    //         </div>
    //
    //         {/* Gender Filter */}
    //         <div>
    //             <h4 className="text-md font-medium mb-1">Gender</h4>
    //             {Object.values(CharacterGender).map((gender) => (
    //                 <div key={gender} className="flex items-center">
    //                     <input
    //                         type="checkbox"
    //                         id={`gender-${gender}`}
    //                         checked={filters.gender === gender}
    //                         onChange={(e) => handleCheckboxChange(e, 'gender', gender)}
    //                         className="mr-2"
    //                     />
    //                     <label htmlFor={`gender-${gender}`}>{gender}</label>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
    return (<div>'dummy'</div>)
};

export default FilterMenu;
