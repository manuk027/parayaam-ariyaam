import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="App Logo" className="h-16" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">
                    Welcome Back
                </h2>
                <form className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>
                <button
                    className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="h-5"
                    />
                    Sign in with Google
                </button>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-green-600 font-semibold cursor-pointer hover:underline"
                    >
                        Signup
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Login;