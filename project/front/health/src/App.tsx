import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Calendar from './pages/Home/Calendar/Calendar';
import Quest from './pages/Home/Quest/Quest';
import ExerciseRecommend from './pages/Exercise/Recommend/Recommend';
import Exercise from './pages/Exercise/Exercise';
import Login from './pages/Login/Login';
import CommonLayout from './components/Common/CommonLayout';

const App: React.FC = () => {
  return (
    <Router>
      <div id="root">
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/calendar" element={<Calendar />} />
            <Route path="/home/quest" element={<Quest />} />
            <Route path="/exercise/recommend" element={<ExerciseRecommend />} />
            <Route path="/exercise" element={<Exercise />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
