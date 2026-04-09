import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Signup from "./pages/Signup";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<>Hello</>} />
                <Route path="/login" element={<>login</>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/blogs" element={<ProtectedRoute><>blogs</></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute><></></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><></></ProtectedRoute>} />

            </Routes>
        </>
    );
}

export default App;