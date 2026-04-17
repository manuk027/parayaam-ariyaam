import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

type Blog = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp;
};

type Props = {
  blog: Blog;
  onDelete: (id: string) => void;
};

export default function BlogCard({ blog, onDelete }: Props) {
  const { user } = useAuth();
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
      <p className="text-gray-600 mt-3 leading-relaxed">{blog.content.slice(0, 140)}...</p>
      <div className="mt-4 text-sm text-gray-400 flex justify-between items-center">
        <p>
          {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : "Just now"}
        </p>
        <div className="flex gap-3 items-center">
          <Link to={`/blogs/${blog.id}`} className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition">Read</Link>
          {blog.userId === user?.uid && (
            <>
              <button className="px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-md hover:bg-yellow-100 transition">
                <Link to={`/edit/${blog.id}`}>Edit</Link>
              </button>
              <button onClick={() => onDelete(blog.id)} className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}