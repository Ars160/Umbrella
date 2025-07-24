import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BoardPages from './pages/BoardPage';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Profile from './pages/profile';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<BoardPages />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
