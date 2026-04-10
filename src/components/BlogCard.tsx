import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

type Blog = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp;
  editMode: boolean,
  deleteMode: boolean,
};

type Props = {
  blog: Blog;
};

export default function BlogCard({ blog }: Props) {
  const { user } = useAuth();
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
      <p className="text-gray-600 mt-3 leading-relaxed">{blog.content.slice(0, 140)}...</p>
      <div className="mt-4 text-sm text-gray-400 flex justify-between items-center">
        <p>{blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : "Just now"}</p>
        <div className="flex gap-3 items-center">
          <Link to={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">Read</Link>
          {(blog.userId !== user?.uid) ?
            <></>
            :
            <>
              <button className="text-yellow-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </>
          }
        </div>
      </div>
    </div>
  );
}