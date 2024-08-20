import axios from "axios";
import {BASE_URL} from "./Constants.ts";
import type {
    Character,
    CharacterFilter,
    EndpointType,
    Episode,
    EpisodeFilter,
    Info,
    Location,
    LocationFilter,
    Page
} from "./types.ts";

// Helper function to construct query parameters
const buildQueryParams = (params: Record<string, string | string[] | number | undefined>): string => {
    const filteredParams = Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${(value as string | number)}`);

    return filteredParams.length > 0 ? `?${filteredParams.join("&")}` : "";
};

export const getEpisodes = async (filter?: EpisodeFilter, page?: Page): Promise<Episode[]> => {
    const query = BASE_URL + "/episode/"

    const queryParams = buildQueryParams({
        name: filter?.name,
        episode: filter?.episode,
        page,
    })

    try {
        const response = await axios.get(query + queryParams);
        const episodes: Episode[] = response.data.results
        console.log(episodes)

        return episodes
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const getCharacters = async (filter?: CharacterFilter, page?: Page): Promise<Character[]> => {
    const url = BASE_URL + "/character/"
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            params: {
                ...filter,
                page
            }
        })

        const characters: Character[] = response.data.results
        console.log(`response ${response.data}`)

        return characters
    } catch (e) {
        console.error(e)
        throw e
    }
}


export const getLocations = async (filter?: LocationFilter, page?: Page): Promise<Location[]> => {
    const query = BASE_URL + "/location/"

    const queryParams = buildQueryParams({
        name: filter?.name,
        type: filter?.type,
        dimension: filter?.dimension,
        page: page
    })
    try {
        const response = await axios.get(query + queryParams);
        const locations: Location[] = response.data.results
        console.log(locations)

        return locations
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const getCharacterByID = async (id: number): Promise<Character> => {
    const query = `${BASE_URL}/character/${id}`;

    try {
        const response = await axios.get(query);
        const result: Character = response.data;

        console.log(result);

        // Ensure the response data structure is what you expect.
        if (result) {
            return result;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (e) {
        console.error('Error in getCharacterByID:', e);
        throw e;
    }
};

export const getCharactersByID = async (ids: number[]): Promise<Character[]> => {
    if (!ids.length)
        throw new Error('no ids fetch')
    const query = `${BASE_URL}/character/${ids.join(',')}`;
    try {
        const response = await axios.get(query);
        console.log(response);
        if(ids.length === 1){
            const character = response.data
            return [character]
        }
        return response.data
    } catch (e) {
        console.error('Error in getCharacterByID:', e);
        throw e;
    }
};

export const getLocationByID = async (id: number): Promise<Location> => {
    const query = `${BASE_URL}/location/${id}`;

    try {
        const response = await axios.get(query);
        const result: Location = response.data;

        console.log(result);

        // Ensure the response data structure is what you expect.
        if (result) {
            return result;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (e) {
        console.error('Error in getLocationByID:', e);
        throw e;
    }
};

export const getLocationsByID = async (ids: number[]): Promise<Location[]> => {
    const query = `${BASE_URL}/location/${ids.join(',')}`;


    try {
        const response = await axios.get(query);
        const result: Location[] = response.data;

        console.log(result);

        // Ensure the response data structure is what you expect.
        if (result) {
            return result;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (e) {
        console.error('Error in getLocationsByID:', e);
        throw e;
    }
};
export const getEpisodeByID = async (id: number): Promise<Episode> => {
    const query = `${BASE_URL}/episode/${id}`;

    try {
        const response = await axios.get(query);
        const result: Episode = response.data;

        console.log(result);

        // Ensure the response data structure is what you expect.
        if (result) {
            return result;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (e) {
        console.error('Error in getEpisodeByID:', e);
        throw e;
    }
};

export const getEpisodesByID = async (ids: number[]): Promise<Episode[]> => {
    const query = `${BASE_URL}/episode/${ids.join(',')}`;

    try {
        const response = await axios.get(query);
        const result: Episode[] = response.data;

        console.log(result);

        // Ensure the response data structure is what you expect.
        if (result) {
            return result;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (e) {
        console.error('Error in getEpisodesByID:', e);
        throw e;
    }
};

export async function getData<T, F>(
    endpoint: EndpointType,
    filter?: F,
    page?: Page,
): Promise<Info<T>> {
    const url = `${BASE_URL}/${endpoint}`;
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            params: {
                ...filter,
                page,
            }
        })
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }

}

