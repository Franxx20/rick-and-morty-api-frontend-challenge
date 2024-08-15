import {Link} from "react-router-dom";
import {SearchBar} from "./SearchBar.tsx";

export function NavBar() {
    return (
        <nav className="navbar bg-white">
            <ul className="w-full list-none flex items-center justify-between">
                <li className="h-1/2">
                    <Link className="h-full p-8 flex items-center text-black hover:bg-gray-400" to="/">Home</Link>
                </li>
                <li className="flex-grow">
                    <SearchBar />
                </li>
                <li className="h-1/2 flex space-x-4">
                    <Link className="h-full p-8 flex items-center text-black hover:bg-gray-400" to="/characters">Characters</Link>
                    <Link className="h-full p-8 flex items-center text-black hover:bg-gray-400" to="/locations">Locations</Link>
                    <Link className="h-full p-8 flex items-center text-black hover:bg-gray-400" to="/episodes">Episodes</Link>
                </li>
            </ul>
        </nav>
    );
}
