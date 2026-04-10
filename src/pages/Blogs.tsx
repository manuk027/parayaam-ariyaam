import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { collection, getDocs, orderBy, query, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

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
    async function fetchBlogs(): Promise<void> {
        try {
            const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const data: Blog[] = snapshot.docs.map((doc) => {
                const d = doc.data();
                return { id: doc.id, title: d.title, content: d.content, userId: d.userId, createdAt: d.createdAt, email: d.email, editMode: false, deleteMode: false };
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
                            <BlogCard key={blog.id} blog={blog} onDelete={deleteBlog} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;