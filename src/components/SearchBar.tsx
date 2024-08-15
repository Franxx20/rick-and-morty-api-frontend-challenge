import React, {useState} from "react";

import {useNavigate} from "react-router-dom";


export function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const navigate = useNavigate()


    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            // onSearch(searchValue);
            navigate(`/search-results?query=${searchValue}`);
        }
    }


    function handleFocus() {
        setIsFocused(true)
    }

    function handleBlur() {
        setIsFocused(false)
    }

    return (
        <div
            className={`flex flex-grow relative w-full text-gray-600 ${isFocused ? 'lg:max-w-[40rem]' : 'lg:max-w-[20rem]'}`}>
            <div className=' flex flex-grow relative w-full text-gray-600'>
                <input
                    className={`bg-amber-200 h-10 px-5 rounded-full text-sm focus:outline-none transition-all duration-300 ${isFocused ? 'lg:w-full' : 'lg:w-64'}`}
                    value={searchValue}
                    type={"search"}
                    name={"search"}
                    placeholder={'Search...'}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    )

}
