type BlogEditorProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
    loading: boolean;
    buttonText: string;
};

export default function BlogEditor({ title, setTitle, content, setContent, onSubmit, loading, buttonText, }: BlogEditorProps) {
    return (
        <div className="max-w-3xl mx-auto pt-32 px-4">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-3xl md:text-4xl font-bold bg-transparent outline-none placeholder-gray-400 mb-6"
                />
                <textarea
                    placeholder="Start writing your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[300px] text-gray-700 text-lg leading-relaxed bg-transparent outline-none resize-none placeholder-gray-400"
                />
                <div className="flex justify-end mt-8">
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}