import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Common link style to keep code DRY
    const navLinkStyle = "cursor-pointer hover:text-green-600 transition-colors duration-200";

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-50">
            {/* Main Navbar Pill */}
            <div className="flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg rounded-full transition-all duration-300 hover:shadow-xl">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <img src="/logo.png" alt="logo" className="h-8" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-700 uppercase tracking-widest">
                    <Link to="/" className={navLinkStyle}>Home</Link>
                    <Link to="/blogs" className={navLinkStyle}>Blogs</Link>
                    <Link to="/add" className={navLinkStyle}>Create</Link>
                    <Link to="/myblogs" className={navLinkStyle}>My Blogs</Link>
                </div>

                {/* Auth Actions / Mobile Toggle */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="hidden md:block">
                            <span className="text-sm text-green-600 font-bold">{user.displayName}</span>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/login" className="text-sm text-green-600 font-bold hover:underline px-2">Login</Link>
                            <Link to="/signup" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-green-600 transition shadow-lg shadow-slate-200">
                                Sign up
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-slate-700 hover:text-green-600 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`
                md:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 origin-top
                ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}
            `}>
                <div className="flex flex-col p-6 gap-4 text-center font-bold text-slate-700 uppercase tracking-widest text-sm">
                    <Link to="/" onClick={toggleMenu} className="hover:text-green-600 py-2">Home</Link>
                    <Link to="/blogs" onClick={toggleMenu} className="hover:text-green-600 py-2">Blogs</Link>
                    <Link to="/add" onClick={toggleMenu} className="hover:text-green-600 py-2">Create</Link>
                    <Link to="/myblogs" onClick={toggleMenu} className="hover:text-green-600 py-2">My Blogs</Link>
                    
                    <hr className="border-slate-100 my-2" />
                    
                    {user ? (
                        <span className="text-green-600 py-2">{user.displayName}</span>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link to="/login" onClick={toggleMenu} className="text-green-600 py-2">Login</Link>
                            <Link to="/signup" onClick={toggleMenu} className="bg-slate-900 text-white py-3 rounded-2xl">Sign up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;