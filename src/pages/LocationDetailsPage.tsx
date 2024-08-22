import {useParams} from "react-router-dom";
import {Title} from "../components/title.tsx";
import {NavBar} from "../components/NavBar.tsx";
import {getCharactersByID, getLocationByID} from "../utils/api.ts";
import NotFoundPage from "./NotFoundPage.tsx";
import CharacterCard from "../components/CharacterCard.tsx";
import {useQuery} from "@tanstack/react-query";

export function LocationDetailsPage() {
    const {id: idParam} = useParams<{ id: string }>(); // Get id as a string
    const id = Number(idParam);

    const {
        isLoading: isLoadingLocation,
        isError: isErrorLocation,
        data: location,
        error: locationError
    } = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocationByID(id),
        enabled: !!id,
    })

    const {
        isLoading: isLoadingCharacters,
        isError: isErrorCharacters,
        data: characters,
        error: charactersError
    } = useQuery({
        queryKey: ['characters', location?.residents],
        queryFn: async () => {
            if (location) {
                const characterIds = location.residents.map((url) => Number(url.split('/').pop()))
                return getCharactersByID(characterIds)
            }
            return [];
        },
        enabled: !!location,
    })

    if (isLoadingLocation || isLoadingCharacters) {
        return <div>Loading...</div>;
    }

    if (isErrorLocation || isErrorCharacters) {
        console.error('Error fetching data:', locationError || charactersError);
        return <NotFoundPage/>;
    }
    return (
        <div>
            <div className="sticky top-0 z-50 mb-6">
                <NavBar/>
            </div>

            <div className="mx-auto container bg-[#FBFADA] shadow-lg rounded-lg p-6">
                <Title title={'Location Details'}></Title>
                <div className="space-y-4 text-lg">
                    <div><span className="font-semibold">ID:</span> {location?.id}</div>
                    <div><span className="font-semibold">Name:</span> {location?.name}</div>
                    <div><span
                        className="font-semibold">Created:</span> {location?.created}
                    </div>
                    <div><span className="font-semibold">Dimension:</span> {location?.dimension || 'Unknown'}</div>
                </div>

                <h2 className="text-xl font-semibold mt-4">Residents:</h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-10 md:py-20 mx-auto max-w-screen-lg justify-items-center">
                    {characters && characters.length &&
                        characters.map((character) => (
                            <div key={character.id} className="mb-4 break-inside-avoid">
                                <CharacterCard data={character}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
