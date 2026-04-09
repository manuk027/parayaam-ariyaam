import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user } = useAuth();
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-50">
            <div className="flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg rounded-full transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="logo" className="h-8" />
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
                    <Link to="/">
                        <span className="cursor-pointer hover:text-green-600 transition">Home</span>
                    </Link>
                    <Link to="/blogs">
                        <span className="cursor-pointer hover:text-green-600 transition">Blogs</span>
                    </Link>
                    <Link to="/add">
                        <span className="cursor-pointer hover:text-green-600 transition">Create</span>
                    </Link>
                    <Link to="/myblogs">
                        <span className="cursor-pointer hover:text-green-600 transition">MyBlogs</span>
                    </Link>
                </div>
                {user ?
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-green-600 font-medium">{user.displayName}</span>
                    </div> :
                    <div className="flex items-center gap-3">
                        <button className="text-sm text-green-600 font-medium hover:underline">Login</button>
                        <button className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition">Sign Up</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;