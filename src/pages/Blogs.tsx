import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { collection, getDocs, orderBy, query, Timestamp, } from "firebase/firestore";
import { db } from "../firebase/config";

export type Blog = {
    id: string;
    title: string;
    content: string;
    userId: string;
    email: string;
    createdAt: Timestamp;
};


function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    async function fetchBlogs(): Promise<void> {
        try {
            const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const data: Blog[] = snapshot.docs.map((doc) => {
                const d = doc.data();
                return { id: doc.id, title: d.title, content: d.content, userId: d.userId, createdAt: d.createdAt, email: d.email };
            });
            setBlogs(data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">All Blogs</h1>
                {loading && (
                    <p className="text-gray-500">Loading blogs...</p>
                )}
                {!loading && blogs.length === 0 && (
                    <p className="text-gray-500">No blogs available.</p>
                )}
                <div className="space-y-4">
                    {!loading &&
                        blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;