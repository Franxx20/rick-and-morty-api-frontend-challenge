import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Title} from "../components/title.tsx";
import {getLocationByID} from "../utils/api.ts";
import type {Location} from '../utils/types.ts';

export function LocationDetailsPage() {
    const {id} = useParams<{ id: string }>();
    const [location, setLocation] = useState<Location>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!id) return;
        const fetchLocation = async (id: number) => {
            try {
                const locationData: Location = await getLocationByID(id);

                console.log(`location: ${locationData}`)
                if (locationData) {
                    setLocation(locationData);
                }
            } catch (error) {
                console.error('Error fetching location:', error);
                setError('Failed to load location data.');
            } finally {
                setIsLoading(false);
            }
        };


        fetchLocation(Number(id));
    }, [id]);

    if (error)
        return (<div>{error}</div>);

    return (
        <div className="container mx-auto p-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg font-semibold text-gray-500">Loading...</div>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">Location Details</h1>
                    <div className="space-y-4 text-lg">
                        <div><span className="font-semibold">ID:</span> {location?.id}</div>
                        <div><span className="font-semibold">Name:</span> {location?.name}</div>
                        <div><span className="font-semibold">Created:</span> {new Date(location?.created).toLocaleDateString()}</div>
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
                        <div><span className="font-semibold">URL:</span> <a href={location?.url} className="text-blue-500 hover:underline">{location?.url}</a></div>
                    </div>
                </div>
            )}
        </div>
    );
}
