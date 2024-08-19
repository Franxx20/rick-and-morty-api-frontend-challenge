import {Title} from "../components/title.tsx";
import {useEffect, useState} from "react";
import type {Episode, EpisodeFilter, Info} from "../utils/types.ts";
import {getData} from "../utils/api.ts";
import EpisodeCard from "../components/EpisodeCard.tsx";
import {NavBar} from "../components/NavBar.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

export function EpisodesPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [filters, setFilters] = useState<EpisodeFilter>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);  // New state to track if more pages are available

    useEffect(() => {
        const fetchEpisodes = async () => {
            setIsLoading(true)
            try {
                const result: Info<Episode> = await getData<Episode, EpisodeFilter>('episode', filters, page);
                setEpisodes((previous) => [...new Set([...previous, ...result.results as Episode[]])]);
                setHasMore(result.info?.next !== null)
            } catch (err) {
                console.error(err)
                setError('Failed to fetch characters')
            } finally {
                setIsLoading(false)
            }
        };
        if (hasMore) {
            fetchEpisodes()
        }
    }, [filters, page])

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight && !isLoading && hasMore) {
            setPage((previous) => previous + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return ()=> window.removeEventListener('scroll', handleScroll)
    }, [isLoading, hasMore]);

    // const onFilterChange = (newFilters: EpisodeFilter) => {
    //     setFilters(newFilters)
    //     setEpisodes([])
    //     setPage(1)
    //
    //     setHasMore(true)
    //
    // }

    if (error) {
        return <NotFoundPage/>

    }

    return (
        <div>
            <div className={'sticky top-0 z-50'}>
                <NavBar></NavBar>
            </div>
            <Title title={"Episodes"}/>

            <div className='columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4'>
                {episodes.map((episode) => (
                    <div key={episode.id} className='mb-4 break-inside-avoid'>
                        <EpisodeCard data={episode}/>
                    </div>
                ))}
            </div>

            {isLoading && <div className={'text-center py-4'}>Loading...</div>}
        </div>
    );
}
