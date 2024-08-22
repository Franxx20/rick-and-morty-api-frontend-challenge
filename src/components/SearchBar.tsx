import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { HiSearch } from 'react-icons/hi';

// Set the app element for accessibility
Modal.setAppElement('#root');

export function SearchBar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            navigate(`/search-results?query=${searchValue}`);
            onClose();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Search Modal"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            className="bg-white rounded-lg p-8 w-[80%] max-w-md "
        >
            <div className="relative flex items-center">
                <HiSearch className="absolute left-3 text-gray-400 text-lg" />
                <input
                    className="bg-gray-100 w-full h-10 pl-10 pr-5 rounded-full text-sm focus:outline-none"
                    value={searchValue}
                    type="search"
                    name="search"
                    placeholder="Search..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded"
                onClick={onClose}
            >
                Close
            </button>
        </Modal>
    );
}
