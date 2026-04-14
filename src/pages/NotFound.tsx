import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NotFound() {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [inkPos, setInkPos] = useState({ top: '70%', left: '20%' });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    const teleportInk = () => {
        const randomTop = Math.floor(Math.random() * 80 + 10) + '%';
        const randomLeft = Math.floor(Math.random() * 80 + 10) + '%';
        setInkPos({ top: randomTop, left: randomLeft });
    };

    const calcPos = (factor: number) => ({
        transform: `translate(${(mousePos.x - window.innerWidth / 2) / factor}px, ${(mousePos.y - window.innerHeight / 2) / factor}px)`
    });

    return (
        <div className="h-screen bg-white text-slate-800 font-sans selection:bg-green-100 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 pt-24 pb-8 px-4 md:px-8 w-full flex flex-col overflow-hidden">
                <div className="flex-1 border-2 border-dotted border-green-500/30 rounded-[3rem] relative bg-white flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-green-50 pointer-events-none -z-10 transition-transform duration-500 ease-out" style={calcPos(50)}>
                        <svg width="60%" height="60%" viewBox="0 0 200 200">
                            <path fill="currentColor" d="M44.7,-76.4C58.3,-69.2,70,-57.9,78.7,-44.5C87.4,-31.1,93,-15.5,91.8,-0.7C90.5,14.2,82.4,28.3,73,40.6C63.6,52.9,52.8,63.3,40.2,71.3C27.6,79.3,13.8,84.9,-0.6,85.9C-14.9,86.9,-29.9,83.3,-43,75.7C-56.1,68.1,-67.4,56.5,-74.6,42.9C-81.8,29.3,-84.9,14.7,-84.1,0.5C-83.3,-13.7,-78.5,-27.4,-70.6,-39.8C-62.7,-52.2,-51.7,-63.3,-38.9,-70.9C-26,-78.6,-13,-82.8,1.4,-85.2C15.8,-87.6,31.1,-83.6,44.7,-76.4Z" />
                        </svg>
                    </div>
                    <div onMouseEnter={teleportInk} className="absolute w-12 h-12 flex items-center justify-center cursor-help transition-all duration-300 ease-in-out z-30" style={{ top: inkPos.top, left: inkPos.left }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-green-500 animate-bounce">
                            <path d="M12 21.5c-3.59 0-6.5-2.91-6.5-6.5 0-3.5 6.5-13 6.5-13s6.5 9.5 6.5 13c0 3.59-2.91 6.5-6.5 6.5z" />
                        </svg>
                        <span className="absolute -top-6 text-[10px] font-bold text-green-400 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">Catch the idea!</span>
                    </div>
                    <div className="relative z-10 text-center px-6">
                        <div className="group relative">
                            <h1 className="text-[100px] md:text-[180px] font-black text-slate-950 leading-none tracking-tighter">404</h1>
                            <div className="absolute -right-8 -top-4 text-green-400 rotate-12 hidden md:block">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M10 10l4 4m0-4l-4 4" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-8 space-y-3">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-800">Page Not Found</h2>
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate(-1)} className="px-8 py-3 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold hover:border-green-300 transition-all active:scale-95">Go Back</button>
                            <Link to="/" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-xl shadow-slate-200 active:scale-95">Home</Link>
                        </div>
                    </div>
                    <div className="absolute bottom-10 left-10 text-green-200 hidden lg:block transition-transform duration-700 ease-out" style={calcPos(20)}>
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                    </div>
                </div>
            </main>
        </div>
    );
}