import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 font-sans selection:bg-green-100">
      <Navbar />
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl opacity-60" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Where words find <br />
                <span className="text-green-600 italic">their home.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">A space designed for thinkers, writers, and dreamers. Join a community where your voice matters.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-105 transition-all duration-300">
                  <Link to={"/add"}>Start Writing Today</Link>
                </button>
                <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
                  <Link to={"/blogs"}>Explore Blogs</Link>
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative group">
                <img src="/logo.png" alt="Logo" className="w-[300px] md:w-[400px] h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Crafted for Clarity</h2>
            <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Thoughtful Design",
                desc: "A focused writing environment that keeps you away from distractions.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                )
              },
              {
                title: "Deep Connections",
                desc: "Engage with readers who truly value your perspective and insights.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                )
              },
              {
                title: "Seamless Reading",
                desc: "A beautiful, responsive reader mode that looks great on any device.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 hover:border-green-100 hover:bg-green-50/30 transition-all duration-300">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to share your story?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">Join thousands of writers who have already found their voice on our platform.</p>
            <button className="bg-green-500 text-white px-10 py-4 rounded-full font-bold hover:bg-green-400 transition-colors">
              <Link to="/blogs">Get Started for Free</Link>
            </button>
          </div>
        </div>
      </section>
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <img src="/logo.png" alt="logo" className="h-10 mb-6 opacity-80" />
              <p className="text-slate-500 text-sm leading-relaxed">A space dedicated to the art of storytelling and the joy of learning through shared experiences.</p>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h4 className="font-bold text-slate-900 mb-6">Explore</h4>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="hover:text-green-600 cursor-pointer transition">Trending Blogs</li>
                  <li className="hover:text-green-600 cursor-pointer transition">Categories</li>
                  <li className="hover:text-green-600 cursor-pointer transition">Featured Authors</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-6">Support</h4>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="hover:text-green-600 cursor-pointer transition">Privacy Policy</li>
                  <li className="hover:text-green-600 cursor-pointer transition">Terms of Use</li>
                  <li className="hover:text-green-600 cursor-pointer transition">Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} പറയാം അറിയാം. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}