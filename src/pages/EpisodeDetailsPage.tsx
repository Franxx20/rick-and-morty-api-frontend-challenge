import {useLocation} from "react-router-dom";
import type {Episode} from "../utils/types.ts";
import {Title} from "../components/title.tsx";

export function EpisodeDetailsPage() {
    const location = useLocation()
    const episode: Episode = location.state || {}
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <Title title={'Episode Details'}></Title>
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
                    <div><span className="font-semibold">URL:</span> <a href={episode?.url}
                                                                        className="text-blue-500 hover:underline">{episode?.url}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
