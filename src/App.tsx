import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<>Hello</>} />
                <Route path="/blogs" element={<ProtectedRoute><></></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute><></></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><></></ProtectedRoute>} />

            </Routes>
        </>
    );
}

export default App;