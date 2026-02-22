import "./App.css";
import AuthContainer from "./components/AuthContainer";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthContainer />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
