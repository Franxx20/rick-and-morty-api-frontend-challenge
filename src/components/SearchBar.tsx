import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export type SearchProps = {
    onSearch: (value: string) => void;
}

export function SearchBar({onSearch}: SearchProps) {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate()


    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            onSearch(searchValue);
            navigate(`/search-results?query=${searchValue}`);
        }
    }


    return (
        <div className='relative w-full text-gray-600'>
            <input value={searchValue} type={"search"} name={"search"} placeholder={'Search...'}
                   className='bg-amber-200 h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none'
                   onChange={(e) => setSearchValue(e.target.value)}
                   onKeyDown={handleKeyDown}
            />
        </div>
    )

}
