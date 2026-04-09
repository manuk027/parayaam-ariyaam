import { useState } from "react";
import Navbar from "../components/Navbar";
import BlogEditor from "../components/BlogEditor";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleCreate() {
    if (!title.trim() || !content.trim()) {
      alert("Title and content required");
      return;
    }

    if (!user) {
      alert("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      navigate("/blogs");
    } catch (err) {
      console.error("Create error:", err);
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
        onSubmit={handleCreate}
        loading={loading}
        buttonText="Publish"
      />
    </div>
  );
}