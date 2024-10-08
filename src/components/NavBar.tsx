import {useState} from 'react';
import {Link} from 'react-router-dom';
import {HiMenu, HiSearch} from 'react-icons/hi';
import {SearchBar} from "./SearchBar";

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const toggleSearchBar = () => {
        setIsSearchModalOpen(!isSearchModalOpen)
    }

    return (
        <nav className="navbar bg-[#ECDFCC] rounded-b-xl">
            <ul className="w-full flex items-center justify-between ">

                <li className="sm:hidden flex items-center px-4">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <HiMenu className="text-black text-3xl"/>
                    </button>
                </li>

                <li className="sm:flex hidden space-x-4 h-full">
                    <Link
                        className="h-fit p-4 flex align-middle items-center text-black hover:bg-gray-400 rounded-xl hover:rounded-xl"
                        to="/">Home</Link>
                    <Link
                        className="h-fit p-4 flex align-middle items-center text-black hover:bg-gray-400 rounded-xl hover:rounded-xl"
                        to="/characters">Characters</Link>
                    <Link
                        className="h-fit p-4 flex align-middle items-center text-black hover:bg-gray-400 rounded-xl hover:rounded-xl"
                        to="/locations">Locations</Link>
                    <Link
                        className="h-fit p-4 flex align-middle items-center text-black hover:bg-gray-400 rounded-xl hover:rounded-xl"
                        to="/episodes">Episodes</Link>
                </li>

                <li className="flex-grow flex justify-end">
                    <button
                        onClick={() => setIsSearchModalOpen(true)}
                        className="flex items-center text-black p-4 hover shadow-md rounded-xl :bg-gray-400 hover:rounded-xl">
                        <HiSearch className="mr-2"/>
                        Search
                    </button>
                </li>

            </ul>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                    menuOpen ? 'max-h-72' : 'max-h-0 opacity-0'
                }`}>
                <ul className="flex flex-col items-center space-y-2 sm:hidden">
                    <li>
                        <Link className="block p-2 text-black hover:bg-gray-400" to="/"
                              onClick={() => setMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link className="block p-2 text-black hover:bg-gray-400" to="/characters"
                              onClick={() => setMenuOpen(false)}>Characters</Link>
                    </li>
                    <li>
                        <Link className="block p-2 text-black hover:bg-gray-400" to="/locations"
                              onClick={() => setMenuOpen(false)}>Locations</Link>
                    </li>
                    <li>
                        <Link className="block p-2 text-black hover:bg-gray-400" to="/episodes"
                              onClick={() => setMenuOpen(false)}>Episodes</Link>
                    </li>
                </ul>
            </div>

            <SearchBar isOpen={isSearchModalOpen} onClose={toggleSearchBar}/>
        </nav>
    );
}
