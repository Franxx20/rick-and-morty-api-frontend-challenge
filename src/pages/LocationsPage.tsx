import {Title} from "../components/title.tsx";
import  {useEffect, useState} from "react";
import type { Info, Location, LocationFilter} from "../utils/types.ts";
import {getData} from "../utils/api.ts";
import LocationCard from "../components/LocationCard.tsx";
import {NavBar} from "../components/NavBar.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

export function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [filters, setFilters] = useState<LocationFilter>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);  // New state to track if more pages are available


    useEffect(() => {
        const fetchLocations = async()=>{
            setIsLoading(true)
            try{
                const result:Info<Location> = await getData<Location,LocationFilter>('location', filters,page)
                setLocations((previous)=>[...new Set([...previous,...result.results as Location[]])])
                setHasMore(result.info?.next !== null)
            }
            catch(err){
                console.error(err)
                setError('Failed to fetch locations');
            }
            finally{
                setIsLoading(false);
            }
        }

        if(hasMore)
        {
            fetchLocations()
        }
    }, [filters,page])

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight && !isLoading && hasMore) {
            setPage((previous) => previous + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);


    if(error){
        return <NotFoundPage/>
    }

    return (
        <div>
            <div className={'sticky top-0 z-50'}>
                <NavBar></NavBar>
            </div>
            <Title title={"Locations"}/>

            <div className='columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4'>
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

