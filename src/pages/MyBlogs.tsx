import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { collection, getDocs, orderBy, query, Timestamp, where, deleteDoc, doc, } from "firebase/firestore";
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

function MyBlog() {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    async function fetchBlogs(): Promise<void> {
        try {
            if (!user) return;
            const q = query(collection(db, "blogs"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
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
            setBlogs((prev) => prev.filter((blog) => blog.id !== selectedId));
            setShowModal(false);
            setSelectedId(null);
            console.log("Deleted successfully");
        } catch (error) {
            console.error("DELETE ERROR:", error);
        }
    }

    useEffect(() => {
        if (user) fetchBlogs();
    }, [user]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-1 rounded-full bg-emerald-500"></div>
                        <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs">Parayaam Ariyaam</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        My Stories<span className="text-emerald-500">.</span>
                    </h1>
                </header>
                {!loading && blogs.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 text-lg">No stories have been published yet.</p>
                        <button className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700">Be the first to write one</button>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {!loading &&
                        blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} onDelete={(id: string) => { setSelectedId(id); setShowModal(true); }} />
                        ))}
                </div>
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

export default MyBlog;