import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export default function Home() {

  const [count, setCount] = useState<number>(0);
  async function countBlogs() {
    try {
      const snapshot = await getCountFromServer(collection(db, "blogs"));
      setCount(snapshot.data().count);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    countBlogs()
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-green-100 selection:text-green-900 flex flex-col">
      <Navbar />
      <main className="flex-1 relative flex items-center justify-center pt-24 pb-12 overflow-hidden px-6">
        <div className="absolute top-28 left-[5%] text-green-300/40 hidden xl:block -rotate-12 animate-pulse">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-[2%] -translate-y-1/2 text-green-100/60 hidden 2xl:block -z-10">
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none">
            <path d="M30 30C80 0 160 60 140 100C120 140 40 130 60 170C80 210 170 170 170 170" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 15" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-[5%] text-green-200/40 hidden lg:block rotate-12">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>

        {/* 4. Narrative Swirl/Connection (Bottom Right) */}
        <div className="absolute bottom-20 right-[10%] text-green-100 hidden xl:block">
          <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
            <path d="M10 100C30 40 100 20 140 60C180 100 120 110 90 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="90" cy="90" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* --- Standard Floating Doodles (Kept from previous version) --- */}
        <div className="absolute bottom-32 right-[20%] text-green-200/40 hidden xl:block rotate-12">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            <div className="flex-[1.3] text-center lg:text-left space-y-8">
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-slate-950 leading-[1.1] tracking-tight">
                Words that matter. <br />
                <span className="relative inline-block text-green-600 italic font-serif">
                  Stories that stay.
                  {/* Underline Scribner */}
                  <svg className="absolute -bottom-2 left-0 w-full h-4 text-green-200" viewBox="0 0 400 15" fill="none">
                    <path d="M5 10C100 4 300 4 395 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Welcome to Parayam Ariyam. A minimalist blog application designed for
                clutter-free reading and effortless writing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link to="/blogs" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-slate-200 hover:-translate-y-1 flex items-center justify-center">
                  Read Articles
                </Link>
                <Link to="/add" className="px-10 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                  Share Your Story
                </Link>
              </div>
              <div className="pt-10 flex items-center justify-center lg:justify-start gap-10">
                <div className="relative group">
                  <span className="block text-4xl font-black text-slate-950 tracking-tighter">{count}</span>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Published Blogs</span>
                  <svg className="absolute -bottom-2 left-0 w-12 text-green-400/30" viewBox="0 0 50 10" fill="none">
                    <path d="M2 8C15 2 35 2 48 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="w-px h-10 bg-slate-100 rotate-12" />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 relative flex justify-center lg:justify-end">
              <div className="relative z-10 group">
                <img
                  src="/logo.png"
                  alt="Parayam Ariyam"
                  className="w-full max-w-[300px] md:max-w-[420px] h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] -z-10 opacity-40 text-green-50">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M44.7,-76.4C58.3,-69.2,70,-57.9,78.7,-44.5C87.4,-31.1,93,-15.5,91.8,-0.7C90.5,14.2,82.4,28.3,73,40.6C63.6,52.9,52.8,63.3,40.2,71.3C27.6,79.3,13.8,84.9,-0.6,85.9C-14.9,86.9,-29.9,83.3,-43,75.7C-56.1,68.1,-67.4,56.5,-74.6,42.9C-81.8,29.3,-84.9,14.7,-84.1,0.5C-83.3,-13.7,-78.5,-27.4,-70.6,-39.8C-62.7,-52.2,-51.7,-63.3,-38.9,-70.9C-26,-78.6,-13,-82.8,1.4,-85.2C15.8,-87.6,31.1,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 border-t border-slate-50 text-center bg-white shrink-0">
        <p className="text-slate-400 font-bold text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2">
          © {new Date().getFullYear()}
          <span className="font-['Manjari'] text-sm normal-case tracking-normal text-slate-500 font-bold">പറയാം അറിയാം</span>
        </p>
      </footer>
    </div>
  );
}