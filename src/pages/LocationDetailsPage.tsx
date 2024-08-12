import {Title} from "../components/title.tsx";
import {useParams} from "react-router-dom";

export function LocationDetailsPage() {
    const id = useParams()
    console.log(id)
    return (
        <div>
            <Title title={"Location Details"}/>
        </div>
    )
}
