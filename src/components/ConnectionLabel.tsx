import { Link } from "react-router-dom"
import { useDataConnectionStore } from "../store/connectionData"

function ConnectionLabel() {
    const ip = useDataConnectionStore((state) => state.ip)
    const port = useDataConnectionStore((state) => state.port)

    return (
        <Link to="/connection">
            <div className="fixed bottom-4 right-4 bg-blue-400 text-white p-4 rounded-lg shadow-lg text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded-full border-3 border-blue-900 animate-pulse"></div>

                    <span className="font-mono">
                        {ip}:{port}
                    </span>

                </div>
            </div>
        </Link>
    )
}

export default ConnectionLabel
