import { Suspense } from 'react';
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
import CrewCreate from './pages/Crew/CrewCreate/CrewCreate';
import CrewRanking from './pages/Crew/CrewRanking/CrewRanking';
import CrewDetail from './pages/Crew/CrewDetail/CrewDetail';
import OAuth from './pages/OAuth/OAuth';
import CrewBattle from './pages/Crew/CrewBattle/CrewBattle';
// import CrewCreate from './pages/Crew/CrewCreate/CrewCreate';
import { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import LoadingLottile from '@/assets/Lottie/loading.json';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
export default function App() {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              textAlign: 'center',
            }}>
            <Lottie animationData={LoadingLottile} style={{ width: '200px', height: '200px' }} />
            <p>
              페이지 로딩 중 입니다. <br /> 잠시만 기다려주세요.
            </p>
          </div>
        }>
        <ErrorBoundary>
          <Toaster />
          <Router>
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
                <Route path="/crew/mycrew/:crewId" element={<MyCrew />} />
                <Route path="/crew/detail/:crewId" element={<CrewDetail />} />
                <Route path="/crew/create" element={<CrewCreate />} />
                <Route path="/crew/battle/:crewId" element={<CrewBattle />} />
                <Route path="/crew/ranking" element={<CrewRanking />} />
                <Route path="/oauth" element={<OAuth />} />
              </Route>
            </Routes>
          </Router>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
