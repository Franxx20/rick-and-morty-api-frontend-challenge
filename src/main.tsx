import App from './App.tsx'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {CharactersPage} from "./pages/CharactersPage.tsx";
import {EpisodesPage} from "./pages/EpisodesPage.tsx";
import {LocationsPage} from "./pages/LocationsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {CharacterDetailsPage} from "./pages/CharacterDetailsPage.tsx";
import {EpisodeDetailsPage} from "./pages/EpisodeDetailsPage.tsx";
import {LocationDetailsPage} from "./pages/LocationDetailsPage.tsx";
import {SearchResultsPage} from "./pages/SearchResultsPage.tsx";
import FilterMenuTestPage from "./pages/FilterMenuTestPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement:<NotFoundPage/>
    },
    {
        path: "/characters",
        element: <CharactersPage/>,
        errorElement:<NotFoundPage/>
    },
    {
        path: "/character/:id",
        element: <CharacterDetailsPage/>,
        errorElement:<NotFoundPage/>
    },
    {
        path: "/episodes",
        element: <EpisodesPage/>,
        errorElement:<NotFoundPage/>
    },
    {
        path: "/episode/:id",
        element: <EpisodeDetailsPage/>,
        errorElement:<NotFoundPage/>
    },
    {
        path: "/locations",
        element: <LocationsPage/>,
        errorElement:<NotFoundPage/>
    },
    {
        path: "/location/:id",
        element: <LocationDetailsPage/>,
        errorElement:<NotFoundPage/>
    },
    {
        path:'/search-results',
        element:<SearchResultsPage/>
    },
    {
        path:'/filter-menu',
        element:<FilterMenuTestPage/>

    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
