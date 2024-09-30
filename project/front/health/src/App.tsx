import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Calendar from './pages/Home/Calendar/Calendar';
import Quest from './pages/Home/Quest/Quest';
import ExerciseRecommend from './pages/Exercise/Recommend/Recommend';
import Exercise from './pages/Exercise/Exercise';
import Login from './pages/Login/Login';
import CommonLayout from './components/Common/CommonLayout';
import Survey from './pages/Survey/Survey';
import Record from './pages/Record/Record';
import BodyDetail from './pages/Record/BodyDetail';
import SurveyResult from './pages/Survey/Result';
import CrewRecommend from './pages/Crew/CrewRecommend/CrewRecommend';
import Crew from './pages/Crew/Crew';
import Alarm from './pages/Alarm/Alarm';
import Mypage from './pages/Mypage/Mypage';
import Profile from './pages/Profile/Profile';
import MyCrew from './pages/Crew/MyCrew/MyCrew';
import CrewDetail from './pages/Crew/CrewDetail/CrewDetail';
import OAuth from './pages/OAuth/OAuth';
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/surveyResult" element={<SurveyResult />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/calendar" element={<Calendar />} />
            <Route path="/home/quest" element={<Quest />} />
            <Route path="/exercise/recommend" element={<ExerciseRecommend />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/record" element={<Record />} />
            <Route path="/record/bodyDetail" element={<BodyDetail />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/crew/recommend" element={<CrewRecommend />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/alarm" element={<Alarm />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/crew/mycrew/" element={<MyCrew />} />
            <Route path="/OAuth" element={<OAuth />} />
            <Route path="/crew/detail/:crew_id" element={<CrewDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
