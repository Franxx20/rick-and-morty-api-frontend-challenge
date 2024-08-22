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

    const {isLoading: isLoadingLocation, isError: isErrorLocation, data: location, error: locationError} = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocationByID(id),
        enabled: !!id,
    })

    const {isLoading: isLoadingCharacters, isError: isErrorCharacters, data: characters, error: charactersError} = useQuery({
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
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
                <span className="ml-4">Loading...</span>
            </div>
        )
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

            <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
                <Title title={'Location Details'} />
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">ID:</span>
                            <span>{location?.id}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Name:</span>
                            <span>{location?.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Type:</span>
                            <span>{location?.type || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Dimension:</span>
                            <span>{location?.dimension}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">Created:</span>
                            <span>{location?.created}</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mt-4">Residents:</h2>
                    {characters && characters.length > 0 ? (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {characters.map((character) => (
                                <CharacterCard key={character.id} data={character}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No residents found for this location.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
