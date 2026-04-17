import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Calendar, User, ArrowLeft } from "lucide-react";

export type Blog = {
    id: string;
    title: string;
    content: string;
    userId: string;
    email: string;
    createdAt: Timestamp;
};

function SingleBlog() {
    const { blogid } = useParams<{ blogid: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogById() {
            if (!blogid) return;
            try {
                const ref = doc(db, "blogs", blogid);
                const snapshot = await getDoc(ref);
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setBlog({ id: snapshot.id, title: data.title, content: data.content, userId: data.userId, email: data.email, createdAt: data.createdAt, });
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogById();
    }, [blogid]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p className="text-emerald-600 font-medium animate-pulse">Growing your content...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-bold text-slate-800">Story not found</h2>
                <p className="text-slate-500 mt-2">The blog you are looking for might have been moved or deleted.</p>
                <button onClick={() => navigate(-1)} className="mt-6 text-emerald-600 font-semibold hover:underline">Return to home</button>
            </div >
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <header className="max-w-4xl mx-auto px-6 pt-24 md:pt-32">
                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-8">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to feed</span>
                </button>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">{blog.title}</h1>
                <div className="mt-8 flex flex-wrap items-center gap-y-4 gap-x-6 text-sm text-slate-500 border-b border-emerald-50 pb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                            <User size={16} />
                        </div>
                        <span className="font-medium text-slate-700">{blog.email || "Anonymous Author"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={16} className="text-emerald-500" />
                            {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Just now"}
                        </span>
                    </div>
                </div>
            </header>
            <article className="max-w-4xl mx-auto px-6 py-12">
                <div className="prose prose-emerald prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
                    {blog.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
}

export default SingleBlog;