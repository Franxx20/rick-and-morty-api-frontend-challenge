// allows the interception of custom types to show all the types members
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type EndpointType = "location" | "episode" | "character"

export type Info<T> = {
    /**
     * The API will automatically paginate the responses. You will receive up to `20` documents per page.
     */
    info?: {
        count: number,
        pages: number,
        next?: string,
        prev?: string,
    },
    results?: T[],
}

export type BaseData = {
    id: number,
    name: string,
    url: string,
    created: string,
}


/* CHARACTERS */
export type CharacterStatus = "Alive" | "Dead" | "unknown"
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'
export type CharacterLocation = {
    name: string,
    url: string,
}

export type Character = Prettify<{
    status: CharacterStatus,
    species: string,
    type: string,
    gender: CharacterGender,
    origin: CharacterLocation,
    location: CharacterLocation,
    image: string,
    episode: string[],
} & BaseData>;


export type CharacterFilter = {
    name?: string,
    status?: CharacterStatus,
    species?: string[]
    type?: string,
    gender?: CharacterGender,
}

/* LOCATION */

export type Location = Prettify<{
    type: string,
    dimension: string,
    residents: string[],
} & BaseData>;

export type LocationFilter = {
    name?: string,
    type?: string,
    dimension?: string
};


/* EPISODE */

export type Episode = Prettify<{
    air_date: string,
    episode: string,
    characters: string[],
} & BaseData>;

export type EpisodeFilter = {
    name?: string,
    episode?: string,
};
// export type SearchByIdType = Episode[] | Location[] | Episode[];


export type Page = number;
