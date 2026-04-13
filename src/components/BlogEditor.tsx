import React from 'react';
import Navbar from "../components/Navbar";

type BlogEditorProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
    loading: boolean;
    buttonText: string;
};

export default function BlogEditor({
    title,
    setTitle,
    content,
    setContent,
    onSubmit,
    loading,
    buttonText,
}: BlogEditorProps) {
    return (
        <div className="h-screen bg-white text-slate-800 font-sans selection:bg-green-100 flex flex-col overflow-hidden">
            <Navbar />

            <main className="flex-1 pt-24 pb-8 px-4 md:px-8 w-full max-w-6xl mx-auto flex flex-col overflow-hidden">
                {/* Updated Dotted Border with Logo Green */}
                <div className="flex-1 border-2 border-dotted border-green-500/30 rounded-[2.5rem] flex flex-col relative bg-white overflow-hidden p-6 md:p-12">
                    
                    {/* --- DOODLE LAYER: MIX OF BLACK & GREENS --- */}

                    {/* Sparkle - Accent Green */}
                    <div className="absolute top-10 right-[15%] text-green-200 hidden xl:block pointer-events-none animate-pulse">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L14.5 9.5L23 12L14.5 14.5L12 23L9.5 14.5L1 12L9.5 9.5L12 1Z" />
                        </svg>
                    </div>

                    {/* Bulb - Deep Black-Slate */}
                    <div className="absolute top-8 left-[20%] text-slate-900/10 hidden xl:block pointer-events-none rotate-[-12deg]">
                        <svg width="70" height="70" viewBox="0 0 120 120" fill="none" stroke="currentColor">
                            <path d="M60 20C45 20 35 30 35 45C35 60 45 65 50 75H70C75 65 85 60 85 45C85 30 75 20 60 20Z" strokeWidth="3" />
                            <path d="M52 82H68M52 88H68M55 94H65" strokeWidth="3" strokeLinecap="round" />
                            <path d="M60 5V12M30 25L35 30M15 50H22M90 25L85 30M105 50H98" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* NEW: Fountain Pen Nib - Logo Green */}
                    <div className="absolute top-[15%] left-[5%] text-green-500/20 hidden xl:block pointer-events-none -rotate-45">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14.5 3.5c1 2.5 1 5.5 0 8.5-.5 1.5-1.5 3-2.5 4.5l-2 3.5H14l2-3.5c1-1.5 2-3 2.5-4.5 1-3 1-6 0-8.5" />
                            <path d="M12 12v6m0-12v2" />
                        </svg>
                    </div>

                    {/* Papers - Mixed Colors */}
                    <div className="absolute top-1/4 right-6 text-green-500/10 hidden lg:block pointer-events-none">
                        <svg width="100" height="150" viewBox="0 0 120 180" fill="none">
                            <path d="M10 30L90 10L110 50L30 70Z" stroke="currentColor" strokeWidth="2.5" />
                            <path d="M15 35L85 18L102 53L32 70Z" stroke="currentColor" strokeWidth="1" className="text-slate-900/10" strokeDasharray="4 4" />
                            <path d="M105 15C105 15 90 60 70 80C50 100 20 110 20 110" stroke="currentColor" strokeWidth="3" className="text-green-500/40" />
                        </svg>
                    </div>

                    {/* Dotted Trail - Deep Green */}
                    <div className="absolute top-1/2 right-4 text-green-600/10 hidden lg:block pointer-events-none -translate-y-1/2">
                        <svg width="80" height="250" viewBox="0 0 100 300" fill="none" stroke="currentColor">
                            <path d="M20 10C50 50 80 20 80 80C80 140 20 120 20 180C20 240 70 260 50 290" strokeWidth="2" strokeDasharray="6 10" />
                        </svg>
                    </div>

                    {/* NEW: Magnifying Glass - Black-Slate */}
                    <div className="absolute top-[10%] right-[30%] text-slate-900/5 hidden 2xl:block pointer-events-none rotate-12">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </div>

                    {/* Open Book - Soft Green */}
                    <div className="absolute top-[45%] left-4 text-green-200 hidden 2xl:block pointer-events-none">
                        <svg width="130" height="130" viewBox="0 0 150 150">
                            <path d="M10 30H65V120H10Z" fill="none" stroke="currentColor" strokeWidth="3" />
                            <path d="M130 30H75V120H130Z" fill="none" stroke="currentColor" strokeWidth="3" />
                            <path d="M25 50H50M25 65H50M85 50H110" stroke="currentColor" strokeWidth="2" className="text-slate-900/10" />
                        </svg>
                    </div>

                    {/* Sketch & Pen - Mix */}
                    {/* <div className="absolute bottom-12 left-8 text-slate-900/5 hidden md:block pointer-events-none">
                        <svg width="110" height="110" viewBox="0 0 120 120">
                            <circle cx="60" cy="50" r="20" stroke="currentColor" strokeWidth="3" />
                            <path d="M55 60C55 60 60 65 65 60" stroke="currentColor" strokeWidth="2" className="text-green-500/30" />
                            <path d="M80 80L95 40L100 45L85 85Z" stroke="currentColor" strokeWidth="3" className="text-green-500/20" />
                        </svg>
                    </div> */}

                    {/* Swirl flourish - deep green */}
                    <div className="absolute bottom-10 left-[25%] text-green-600/10 hidden 2xl:block pointer-events-none">
                        <svg width="140" height="70" viewBox="0 0 200 100" fill="none" stroke="currentColor">
                            <path d="M10 80C10 80 50 10 100 50C150 90 190 20 190 20" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Memo - Mixed */}
                    <div className="absolute bottom-28 right-[5%] text-slate-900/10 hidden xl:block pointer-events-none rotate-[10deg]">
                        <svg width="90" height="90" viewBox="0 0 120 120" fill="none" stroke="currentColor">
                            <path d="M20 20H100V100H20V20Z" strokeWidth="3" />
                            <path d="M35 40H85M35 55H85" stroke="currentColor" strokeWidth="2" className="text-green-500/40" />
                            <circle cx="60" cy="15" r="6" fill="currentColor" className="text-green-500" />
                        </svg>
                    </div>

                    {/* Large Background Organic Shape */}
                    <div className="absolute top-1/2 -right-10 text-green-500/5 pointer-events-none -z-10 rotate-12">
                        <svg width="250" height="250" viewBox="0 0 100 100">
                            <path d="M10 50Q30 10 50 50Q70 90 90 50" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="8 12" />
                        </svg>
                    </div>

                    {/* --- HEADER --- */}
                    <div className="shrink-0 mb-6 z-10">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Give your story a title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-3xl md:text-4xl font-black text-slate-950 bg-transparent outline-none placeholder-slate-200 tracking-tight"
                            />
                            {/* Signature Green Underline */}
                            <svg className="absolute -bottom-2 left-0 w-32 text-green-500/40" viewBox="0 0 100 10" fill="none">
                                <path d="M2 5C30 2 70 2 98 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* --- EDITOR --- */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
                        <textarea
                            placeholder="Drafting your masterpiece here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-full min-h-full text-slate-700 text-xl md:text-2xl leading-[1.8] bg-transparent outline-none resize-none placeholder-slate-200 font-medium"
                        />
                    </div>

                    {/* --- ACTIONS --- */}
                    <div className="shrink-0 pt-6 flex justify-end items-center gap-4 z-20">
                        <div className="text-green-500/30 hidden sm:block">
                            <svg width="80" height="40" viewBox="0 0 100 50" fill="none">
                                <path d="M10 25C10 10 30 10 50 25C70 40 90 40 90 25M90 25L80 20M90 25L85 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>

                        <button
                            onClick={onSubmit}
                            disabled={loading || !title || !content}
                            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-green-600 transition-all active:scale-95 disabled:opacity-20 shadow-2xl shadow-slate-200 flex items-center gap-3 group"
                        >
                            <span>{loading ? "..." : buttonText}</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #dcfce7; }
            ` }} />
        </div>
    );
}