import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {HiSearch} from 'react-icons/hi';  // Importing an icon from react-icons

export function SearchBar({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            navigate(`/search-results?query=${searchValue}`);
            onClose(); // Close modal on search
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="relative flex items-center">
                    <HiSearch className="absolute left-3 text-gray-400 text-lg"/>
                    <input
                        className="bg-gray-100 w-full h-10 pl-10 pr-5 rounded-full text-sm focus:outline-none"
                        value={searchValue}
                        type="search"
                        name="search"
                        placeholder="Search..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}/>
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded"
                    onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
