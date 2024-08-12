import {Title} from "../components/title.tsx";
import {useParams} from "react-router-dom";

export function EpisodeDetailsPage() {
    const id = useParams()
    console.log(id)
    return (
        <div>
            <Title title={"Episode Details"}/>
        </div>
    )
}
