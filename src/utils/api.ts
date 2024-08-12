import axios from "axios";
import {BASE_URL} from "./Constants.ts";
import type {
    Character,
    CharacterFilter,
    EndpointType,
    Episode,
    EpisodeFilter,
    LocationFilter,
    Page,
    Location
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
    const query = BASE_URL + "/character/"
    const queryParams = buildQueryParams({
        name: filter?.name,
        status: filter?.status,
        species: filter?.species,
        type: filter?.type,
        gender: filter?.gender,
        page: page
    })

    try {
        const response = await axios.get(query + queryParams);

        const characters: Character[] = response.data.results
        console.log(characters)

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

export const getByID = async (id: number | number[], endpoint: EndpointType) => {
    let query = BASE_URL + "/" + endpoint + "/"
    if (typeof id === "number") {
        query += id
    } else {
        query += id.join(",")
    }

    try {
        const response = await axios.get(query);
        console.log(response)
        return response.data.results
    } catch (e) {
        console.error(e)
        throw e
    }
}

