import {Link, useParams} from "react-router-dom"

export default function NotFoundPage() {
    const id = useParams()
    console.log(id)
    return <div className="flex flex-col gap-2">
        404 Not Found id
        <Link to="/">Home from Link</Link>
    </div>
}
