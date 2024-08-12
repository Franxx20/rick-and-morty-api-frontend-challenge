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
        isLoading ? <div>Loading...</div> :
            <div>
                <Title title="LocationPage Details"/>
                <div> ID: {location?.id}</div>
                <div>Name: {location?.name}</div>
                <div>Created: {location?.created}</div>
                <div>Dimension: {location?.dimension}</div>
                <div>
                    Characters:
                    {location?.residents.map((character, index) => (
                        <div key={index}>{character}</div>
                    ))}
                </div>
                <div>url : {location?.url}</div>
            </div>
    );
}
