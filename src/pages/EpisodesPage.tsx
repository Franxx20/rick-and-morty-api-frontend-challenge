import {Title} from "../components/title.tsx";
import {useEffect, useState} from "react";
import type {Episode} from "../utils/types.ts";
import {getEpisodes} from "../utils/api.ts";
import EpisodeCard from "../components/EpisodeCard.tsx";

export function EpisodesPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    async function getEpisodesHelper() {
        const result: Episode[] = await getEpisodes()
        setEpisodes(result);
    }

    useEffect(() => {
        getEpisodesHelper()
    }, [])

    return (
        <div>
            <Title title={"Episodes"}/>

            <div className='columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4'>
                {
                    episodes.map((episode) => (
                        <div key={episode.id} className='mb-4 break-inside-avoid'>
                            <EpisodeCard episode={episode}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
