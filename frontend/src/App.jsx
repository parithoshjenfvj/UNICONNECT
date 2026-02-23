import "./App.css";
import AuthContainer from "./components/AuthContainer";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthContainer />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  );
}

export default App;
