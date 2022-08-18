import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import TodoBox from './components/TodoBox';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TodoBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
