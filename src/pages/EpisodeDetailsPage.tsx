import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getEpisodeByID} from "../utils/api.ts";
import {Title} from "../components/title.tsx";
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
        isLoading ? <div>Loading...</div> :
            <div>
                <Title title="EpisodePage Details"/>
                <div> ID: {episode?.id}</div>
                <div>Name: {episode?.name}</div>
                <div>Created: {episode?.created}</div>
                <div>Air_date: {episode?.air_date}</div>
                <div>
                    Characters:
                    {episode?.characters.map((character, index) => (
                        <div key={index}>{character}</div>
                    ))}
                </div>
                <div>url : {episode?.url}</div>
            </div>
    );
}
