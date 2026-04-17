import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { collection, getDocs, orderBy, query, Timestamp, deleteDoc, doc, } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";

export type Blog = {
  id: string;
  title: string;
  content: string;
  userId: string;
  email: string;
  createdAt: Timestamp;
};

function Blogs() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  async function fetchBlogs(): Promise<void> {
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data: Blog[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return { id: doc.id, title: d.title, content: d.content, userId: d.userId, createdAt: d.createdAt, email: d.email, };
      });
      setBlogs(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlog() {
    try {
      if (!user || !selectedId) return;
      await deleteDoc(doc(db, "blogs", selectedId));
      setBlogs((prev) =>
        prev.filter((blog) => blog.id !== selectedId)
      );
      setShowModal(false);
      setSelectedId(null);
      console.log("Deleted successfully");
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-emerald-200"></span>
            <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-[10px]">Airyaam Parayaam</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">All Stories<span className="text-emerald-500">.</span></h1>
        </header>
        {!loading && blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 px-6 rounded-[2rem] border-2 border-dashed border-emerald-50 bg-emerald-50/20">
            <p className="text-slate-400 text-lg font-medium italic">The shelf is empty for now.</p>
            <p className="text-slate-400 text-sm mt-1">Check back later or start a trend yourself.</p>
          </div>
        )}
        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onDelete={(id: string) => { setSelectedId(id); setShowModal(true); }} />
            ))}
          </div>
        )}
      </main>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-2xl shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Delete Blog?</h2>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setShowModal(false); setSelectedId(null); }} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button onClick={deleteBlog} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;