import {Title} from "../components/title.tsx";
import {useEffect, useState} from "react";
import type {Info, Location, LocationFilter} from "../utils/types.ts";
import {getData} from "../utils/api.ts";
import LocationCard from "../components/LocationCard.tsx";
import {NavBar} from "../components/NavBar.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

export function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);  // New state to track if more pages are available

    const fetchLocations = async () => {
        setIsLoading(true)
        try {
            const result: Info<Location> = await getData<Location, LocationFilter>('location', {}, page)
            setLocations((previous) => {
                const auxMap: Map<number, Location> = new Map();
                for (const location of previous) {
                    auxMap.set(location.id, location)
                }

                if (result.results)
                    for (const location of result.results as Location[]) {
                        if (!auxMap.has(location.id))
                            auxMap.set(location.id, location)
                    }

                return Array.from(auxMap.values()).sort((a, b) => a.id - b.id)
            })
            setHasMore(result.info?.next !== null)
        } catch (err) {
            console.error(err)
            setError('Failed to fetch locations');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {

        if (hasMore) {
            fetchLocations()
        }
    }, [page])

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight && !isLoading && hasMore) {
            setPage((previous) => previous + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);


    if (error) {
        return <NotFoundPage/>
    }

    return (
        <div>
            <div className={'sticky top-0 z-50'}>
                <NavBar></NavBar>
            </div>
            <Title title={"Locations"}/>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 md:py-20 gap-4'>
                {
                    locations.map((location) => (
                        <div key={location.id} className='mb-4 break-inside-avoid'>
                            <LocationCard data={location}/>
                        </div>
                    ))
                }
            </div>

            {isLoading && <div className="text-center py-4">Loading...</div>}
        </div>
    )
}

