import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { BookOpen, Edit3, Trash2, CalendarDays } from "lucide-react";

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
  const contentExcerpt = blog.content.length > 140 ? blog.content.slice(0, 140).trim() + '...' : blog.content;

  return (
    <div className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(34,197,94,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-5">
        <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full">
          <CalendarDays size={14} strokeWidth={2.5} />
          <span>
            {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Just Now"}
          </span>
        </div>
        <div className="h-[1px] flex-grow bg-emerald-50"></div>
      </div>
      <div className="flex-grow space-y-3">
        <h2 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">{blog.title}</h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-3">{contentExcerpt}</p>
      </div>
      <div className="mt-8 pt-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <Link to={`/blogs/${blog.id}`} className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-emerald-700 bg-emerald-100/50 rounded-xl hover:bg-emerald-600 hover:text-white transition-all active:scale-95">
          <BookOpen size={16} />
          Read Blog
        </Link>
        {blog.userId === user?.uid && (
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link to={`/edit/${blog.id}`} className="flex items-center justify-center w-10 h-10 text-slate-400 bg-slate-50 rounded-xl hover:bg-amber-100 hover:text-amber-600 transition-all" title="Edit">
              <Edit3 size={18} />
            </Link>
            <button onClick={() => onDelete(blog.id)} className="flex items-center justify-center w-10 h-10 text-slate-400 bg-slate-50 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all" title="Delete">
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}