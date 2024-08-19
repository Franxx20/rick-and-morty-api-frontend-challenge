import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getEpisodeByID} from "../utils/api.ts";
import type {Episode} from "../utils/types.ts";

export function EpisodeDetailsPage() {
    const {id} = useParams<{ id: string }>();
    const [episode, setEpisode] = useState<Episode>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!id) return;

        const fetchEpisode = async (id: number) => {
            try {
                const episodeData: Episode = await getEpisodeByID(id);

                console.log(`episode: ${episodeData}`)
                if (episodeData) {
                    setEpisode(episodeData);
                }
            } catch (error) {
                console.error('Error fetching episode:', error);
                setError('Failed to load episode data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEpisode(Number(id));
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
                    <h1 className="text-2xl font-bold text-center mb-4">Episode Details</h1>
                    <div className="space-y-4 text-lg">
                        <div><span className="font-semibold">ID:</span> {episode?.id}</div>
                        <div><span className="font-semibold">Name:</span> {episode?.name}</div>
                        <div><span className="font-semibold">Created:</span> {episode?.created}</div>
                        <div><span className="font-semibold">Air Date:</span> {episode?.air_date}</div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Characters:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            {episode?.characters.map((character, index) => (
                                <li key={index} className="text-blue-500 hover:underline">
                                    {character}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <div><span className="font-semibold">URL:</span> <a href={episode?.url} className="text-blue-500 hover:underline">{episode?.url}</a></div>
                    </div>
                </div>
            )}
        </div>
    );
}
