import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./routes/PublicRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import MyBlog from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} toasterId="auth" />
            <Toaster position="top-right" reverseOrder={false} toasterId="success" />
            <Toaster position="bottom-right" reverseOrder={false} toasterId="submission" />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                <Route path="/blogs/:blogid" element={<ProtectedRoute><SingleBlog /></ProtectedRoute>} />
                <Route path="/myblogs" element={<ProtectedRoute><MyBlog /></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />

            </Routes >
        </>
    );
}

export default App;