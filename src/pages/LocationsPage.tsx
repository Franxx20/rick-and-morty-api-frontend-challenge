import {Title} from "../components/title.tsx";
import {useEffect, useState} from "react";
import type {Location} from "../utils/types.ts";
import {getLocations} from "../utils/api.ts";
import LocationCard from "../components/LocationCard.tsx";
import {NavBar} from "../components/NavBar.tsx";

export function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);

    async function getLocationsHelper() {
        const result: Location[] = await getLocations()
        setLocations(result);
    }

    useEffect(() => {
        getLocationsHelper()
    }, [])

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
        </div>
    )
}

