import {Title} from "../components/title.tsx";
import {useParams} from "react-router-dom";

export function CharacterDetailsPage() {
    const id = useParams()
    console.log(id)
    return (
        <div>
            <Title title={"CharactersPage Details"}/>
        </div>
    )
}
