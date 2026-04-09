import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function loginWithEmail() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/blogs", { replace: true });
        } catch (error: any) {
            console.error(error.message);
        }
    }
    async function loginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/blogs", { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
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
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button
                        onClick={loginWithEmail}
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>
                <button onClick={loginWithGoogle}
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