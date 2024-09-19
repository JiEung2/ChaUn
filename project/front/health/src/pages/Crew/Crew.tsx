import BattleBoard from './components/BattleBoard';
// import CrewList from './components/CrewList';
import StyledButton from '../../components/Button/StyledButton';
import { useNavigate } from 'react-router-dom';
import createIcon from '../../assets/svg/crewCreate.svg';
import recommendIcon from '../../assets/svg/crewRecommend.svg';
import rankingIcon from '../../assets/svg/crewRanking.svg';

export default function CrewPage() {
  const crews = [
    { id: 1, name: '달리는 번개', tag: '#러닝' },
    { id: 2, name: '달리는 번개', tag: '#러닝' },
    { id: 3, name: '달리는 번개', tag: '#러닝' },
    { id: 4, name: '달리는 번개', tag: '#러닝' },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="my-crew">
        <p>닉네임님의 크루</p>
        {/* <CrewList crews={crews} /> */}
      </div>
      <BattleBoard
        status="finished"
        ourTeamName="으랏차차"
        opponentTeamName="3대 500만원"
        ourTeamSport="헬스"
        opponentTeamSport="헬스"
        ourTeamScore={1200}
        opponentTeamScore={1200}
        dDay="3"
      />
      <div className="buttonSection">
        <div className="crewButtonSection">
          <StyledButton
            title="크루 생성"
            icon={createIcon}
            onClick={() => navigate('/crew/create')}
            backgroundColor="styledButton1"
          />
          <StyledButton
            title="크루 추천"
            icon={recommendIcon}
            onClick={() => navigate('/crew/recommend')}
            backgroundColor="styledButton2"
          />
        </div>
        <div className="rankingButtonSection">
          <StyledButton
            title="실시간 크루랭킹"
            icon={rankingIcon}
            onClick={() => navigate('/crew/ranking')}
            backgroundColor="styledButton3"
          />
        </div>
      </div>
    </>
  );
}
