import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);// State to toggle password

    async function loginWithEmail(e: React.FormEvent) {
        e.preventDefault();
        try {
            const { emailError, passwordError } = validateLogin(email, password);
            if (emailError) {
                console.log("EMAIL ERROR TRIGGERED");
                toast.error(emailError, { toasterId: 'auth' });
            }
            if (passwordError) toast.error(passwordError,{toasterId:'auth'});
            if (emailError || passwordError) return;

            await signInWithEmailAndPassword(auth, email, password);

            toast.success("Successfully loggedin", { toasterId: "success" });
            navigate("/blogs", { replace: true });

        } catch (error: any) {

            // Map Firebase auth error codes to user-friendly messages
            toast.error(
                error?.code === "auth/invalid-credential"
                    ? "Invalid email or password"
                    : error?.code === "auth/too-many-requests"
                    ? "Too many attempts. Try again later."
                    : "Login failed",
                { toasterId: "auth" }
            );
        }
    }

    async function loginWithGoogle(e: React.FormEvent) {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            toast.success("Successfully loggedin", { toasterId: "success" });
            navigate("/blogs", { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    function validateLogin(email: string, password: string) {
        let emailError = "";
        let passwordError = "";
        if (!email.trim()) emailError = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) emailError = "Invalid email format";
        if (!password.trim()) passwordError = "Password is required.";
        return { emailError, passwordError };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="App Logo" className="h-16" />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

                <form onSubmit={loginWithEmail} className="space-y-4">

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* Password input with toggle */}
                    <div className="relative">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff/> : <Eye/>}
                        </button>
                    </div>

                    <button
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

                <button
                    onClick={loginWithGoogle}
                    className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5" />
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
