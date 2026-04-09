import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/config";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function BlogForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const isEditMode = Boolean(id);

    const navigate = useNavigate();
    const { user } = useAuth();

    // Fetch blog in edit mode
    useEffect(() => {
        if (!isEditMode) return;

        async function fetchBlog() {
            try {
                const ref = doc(db, "blogs", id);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    navigate("/blogs");
                    return;
                }

                const data = snap.data();

                // Ownership check
                if (data.userId !== user.uid) {
                    navigate("/blogs");
                    return;
                }

                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                console.error(err);
            }
        }

        fetchBlog();
    }, [id, isEditMode, navigate, user]);

    // Submit handler
    async function handlePublish() {
        if (!title.trim() || !content.trim()) return;

        setLoading(true);

        try {
            if (isEditMode) {
                // UPDATE
                await updateDoc(doc(db, "blogs", id), {
                    title,
                    content,
                });
            } else {
                // CREATE
                await addDoc(collection(db, "blogs"), {
                    title,
                    content,
                    userId: user.uid,
                    createdAt: serverTimestamp(),
                });
            }

            navigate("/blogs");
        } catch (err) {
            console.error("Error saving blog:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto pt-32 px-4">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-3xl md:text-4xl font-bold bg-transparent outline-none placeholder-gray-400 mb-6"
                    />

                    {/* Content */}
                    <textarea
                        placeholder="Start writing your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full min-h-[300px] text-gray-700 text-lg leading-relaxed bg-transparent outline-none resize-none placeholder-gray-400"
                    />

                    {/* Button */}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handlePublish}
                            disabled={loading}
                            className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {loading
                                ? "Publishing..."
                                : isEditMode
                                    ? "Update"
                                    : "Publish"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}