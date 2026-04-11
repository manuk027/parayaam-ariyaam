import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        async function fetchBlogById() {
            if (!blogid) return;
            const ref = doc(db, "blogs", blogid);
            const snapshot = await getDoc(ref);
            if (snapshot.exists()) {
                const data = snapshot.data();
                setBlog({
                    id: snapshot.id,
                    title: data.title,
                    content: data.content,
                    userId: data.userId,
                    email: data.email,
                    createdAt: data.createdAt,
                });
            } else {
                console.log("Blog not found");
            }
        }
        fetchBlogById();
    }, [blogid]);

    if (!blog) {
        return <p className="p-6">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-10 mt-16">
                <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
                <div className="mt-4 text-sm text-gray-500 flex gap-4 items-center">
                    <span>{blog.email || "Unknown author"}</span>
                    <span>•</span>
                    <span>
                        {blog.createdAt?.toDate
                            ? blog.createdAt.toDate().toLocaleString()
                            : "Just now"}
                    </span>
                </div>
                <hr className="my-6 border-gray-200" />
                <div className="prose max-w-none text-gray-800 leading-relaxed">
                    {blog.content}
                </div>
            </div>
        </div>
    );
}

export default SingleBlog;