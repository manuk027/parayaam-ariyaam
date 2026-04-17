import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { collection, getDocs, orderBy, query, Timestamp, where, deleteDoc, doc } from "firebase/firestore";
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
    async function fetchBlogs(): Promise<void> {
        try {
            if (!user) return;
            console.log(user.uid);
            const q = query(
                collection(db, "blogs"),
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );
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

    async function deleteBlog(id: string) {
        try {
            if (!user) return;
            await deleteDoc(doc(db, "blogs", id));
            setBlogs((prev) => prev.filter((blog) => blog.id !== id));
            console.log("Deleted successfully");
        } catch (error) {
            console.error("DELETE ERROR:", error); // 👈 check this
        }
    }

    useEffect(() => {
        if (user) {
            fetchBlogs();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-1 h-1 rounded-full bg-emerald-500"></div>
                        <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs">Parayaam Ariyaam</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        My Stories<span className="text-emerald-500">.</span>
                    </h1>
                </header>
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-emerald-50 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-medium tracking-wide">Fetching latest posts...</p>
                    </div>
                )}
                {!loading && blogs.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 text-lg">No stories have been published yet.</p>
                        <button className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700">
                            Be the first to write one
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {!loading &&
                        blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} onDelete={deleteBlog} />
                        ))}
                </div>
            </main>
        </div>
    );
}

export default MyBlog;