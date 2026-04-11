import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

function Signup() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function signupWithEmail(e: React.FormEvent) {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: fullName,
            });
            navigate("/blogs", { replace: true });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
    function signupWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
            navigate("/blogs", { replace: true });
        } catch (error: any) {
            console.error(error.message);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="Parayaam Ariyaam" className="h-16" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>
                <form onSubmit={signupWithEmail} className="space-y-4">
                    <input onChange={(e) => setFullName(e.target.value)} type="text" name="fullname" placeholder="Full Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>
                <button onClick={signupWithGoogle} className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5" />
                    Sign up with Google
                </button>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-green-600 font-semibold cursor-pointer hover:underline">Login</span>
                </p>
            </div>
        </div>
    );
}

export default Signup;