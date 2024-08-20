import {useLocation} from "react-router-dom";
import type {Location} from '../utils/types.ts';
import {Title} from "../components/title.tsx";

export function LocationDetailsPage() {
    const locationObject = useLocation()
    const location: Location = locationObject.state || {}

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <Title title={'Location Details'}></Title>
                <div className="space-y-4 text-lg">
                    <div><span className="font-semibold">ID:</span> {location?.id}</div>
                    <div><span className="font-semibold">Name:</span> {location?.name}</div>
                    <div><span
                        className="font-semibold">Created:</span> {new Date(location?.created).toLocaleDateString()}
                    </div>
                    <div><span className="font-semibold">Dimension:</span> {location?.dimension || 'Unknown'}</div>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Residents:</h2>
                    <ul className="list-disc list-inside space-y-1">
                        {location?.residents.map((character, index) => (
                            <li key={index} className="text-blue-500 hover:underline">
                                {character}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    <div><span className="font-semibold">URL:</span> <a href={location?.url}
                                                                        className="text-blue-500 hover:underline">{location?.url}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
