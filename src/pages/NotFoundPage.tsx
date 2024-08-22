import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-[#ECDFCC]">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not
                    Found</h1>
                <p className="text-gray-600 mb-6">
                    The page you're looking for might have been moved or deleted.
                </p>
                <Link
                    to="/"
                    className="bg-[#697565] hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
