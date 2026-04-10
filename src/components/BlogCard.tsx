import { Link } from "react-router-dom";
type Blog = {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: any;
};

type Props = {
    blog: Blog;
};

export default function BlogCard({ blog }: Props) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800">
                {blog.title}
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
                {blog.content.slice(0, 140)}...
            </p>
            <div className="mt-4 text-sm text-gray-400">
                <p>{blog.createdAt?.toDate
                    ? blog.createdAt.toDate().toLocaleDateString()
                    : "Just now"}</p>
                <p className="text-green-800">{}</p>
                <Link to={`/blogs/${blog.id}`}><p>ReadMore</p></Link>
            </div>


        </div >
    );
}