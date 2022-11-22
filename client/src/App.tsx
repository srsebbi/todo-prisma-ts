import { Home } from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { SignUp } from './components/SignUp/SignUp';
import './App.css';
import { NotFound } from './NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<LogIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
