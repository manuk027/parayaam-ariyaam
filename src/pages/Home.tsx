import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="logo.png"
          alt="background logo"
          className="w-[500px] md:w-[700px] opacity-5"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28">

        {/* Hero */}
        <section className="max-w-2xl mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Write. Share. Inspire.
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            A minimal platform to express your ideas and connect through words.
          </p>

          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Start Writing
          </button>
        </section>

        {/* Features */}
        <section className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl w-full">

          <div className="p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Simple Writing</h3>
            <p className="text-gray-600 text-sm">
              Focus on your thoughts without distractions.
            </p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Instant Publishing</h3>
            <p className="text-gray-600 text-sm">
              Share your ideas with the world in seconds.
            </p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-md rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Clean Experience</h3>
            <p className="text-gray-600 text-sm">
              A clutter-free interface designed for clarity.
            </p>
          </div>

        </section>

        {/* Call to Action */}
        <section className="mt-24 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Ready to share your story?
          </h2>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Create Your First Blog
          </button>
        </section>

        {/* Footer */}
        <footer className="mt-24 mb-8 text-sm text-gray-500">
          © {new Date().getFullYear()} BlogApp. All rights reserved.
        </footer>

      </div>
    </div>
  );
}