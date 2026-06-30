import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  async function signupWithEmail(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { fullNameError, emailError, passwordError, confirmPasswordError } =
        handleValiation(fullName, email, password, confirmPassword);
      if (fullNameError) toast.error(fullNameError, { toasterId: "auth" });
      if (emailError) toast.error(emailError, { toasterId: "auth" });
      if (passwordError) toast.error(passwordError, { toasterId: "auth" });
      if (confirmPasswordError)
        toast.error(confirmPasswordError, { toasterId: "auth" });
      if (fullNameError || emailError || passwordError || confirmPasswordError)
        return;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
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

  function handleValiation(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) {
    let fullNameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    if (!fullName.trim()) fullNameError = "FullName is required";
    if (!email.trim()) emailError = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) emailError = "Invalid email format";
    if (!password.trim()) passwordError = "Password is required";
    else if (password.trim().length < 6)
      passwordError = "Password should contain atleast 6 characters.";
    if (password.trim() !== confirmPassword.trim())
      confirmPasswordError = "Both passwords are not same.";
    return { fullNameError, emailError, passwordError, confirmPasswordError };
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Parayaam Ariyaam" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={signupWithEmail} className="space-y-4">
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              name="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <button
          onClick={signupWithGoogle}
          className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5"
          />
          Sign up with Google
        </button>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
