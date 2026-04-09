import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BlogForm from "./pages/BlogForm";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/blogs" element={<ProtectedRoute><>blogs</></ProtectedRoute>} />
                <Route path="/myblogs" element={<ProtectedRoute><>myblogs</></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />

            </Routes>
        </>
    );
}

export default App;