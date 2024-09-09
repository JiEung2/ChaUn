import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Index';
import Calendar from './pages/Home/Calendar/Calendar'; 
import Quest from './pages/Home/Quest/Quest'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/calendar" element={<Calendar />} />
        <Route path="/home/quest" element={<Quest />} />
      </Routes>
    </Router>
  );
};

export default App;