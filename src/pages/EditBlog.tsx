import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BlogEditor from "../components/BlogEditor";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || !user) return;

        async function fetchBlog() {
            try {
                if (!id) return;
                const ref = doc(db, "blogs", id);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    navigate("/blogs");
                    return;
                }

                const data = snap.data();

                if (data.userId !== user?.uid) {
                    navigate("/blogs");
                    return;
                }

                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }

        fetchBlog();
    }, [id, user, navigate]);

    async function handleUpdate() {
        if (!title.trim() || !content.trim()) {
            alert("Title and content required");
            return;
        }

        if (!id) {
            alert("Invalid blog ID");
            return;
        }

        setLoading(true);

        try {
            await updateDoc(doc(db, "blogs", id), {
                title,
                content,
            });

            navigate("/blogs");
        } catch (err) {
            console.error("Update error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <BlogEditor
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                onSubmit={handleUpdate}
                loading={loading}
                buttonText="Update"
            />
        </div>
    );
}