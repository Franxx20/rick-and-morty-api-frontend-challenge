import {Title} from "../components/title.tsx";
import {useEffect, useState} from "react";
import type {Episode} from "../utils/types.ts";
import {getEpisodes} from "../utils/api.ts";
import EpisodeCard from "../components/EpisodeCard.tsx";
import CharacterFilterMenu from "../components/CharacterFilterMenu.tsx";
import {NavBar} from "../components/NavBar.tsx";

export function EpisodesPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    async function getEpisodesHelper() {
        const result: Episode[] = await getEpisodes()
        setEpisodes(result);
    }

    useEffect(() => {
        getEpisodesHelper()
    }, [])

    function onFilterMenuFilterChange() {

    }

    return (
        <div>
            <div className={'sticky top-0 z-50'}>
                <NavBar></NavBar>
            </div>
            <Title title={"Episodes"}/>
            <CharacterFilterMenu onFilterChange={onFilterMenuFilterChange}/>

            <div className='columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4'>
                {
                    episodes.map((episode) => (
                        <div key={episode.id} className='mb-4 break-inside-avoid'>
                            <EpisodeCard data={episode}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
