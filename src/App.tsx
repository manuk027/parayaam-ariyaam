import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                <Route path="/blogs/:blogid" element={<ProtectedRoute><SingleBlog /></ProtectedRoute>} />
                <Route path="/myblogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
                {/* <Route path="/edit/:id" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} /> */}

            </Routes >
        </>
    );
}

export default App;