import BattleBoard from './components/BattleBoard';
// import CrewList from './components/CrewList';

export default function CrewPage() {
  const crews = [
    { id: 1, name: '달리는 번개', tag: '#러닝' },
    { id: 2, name: '달리는 번개', tag: '#러닝' },
    { id: 3, name: '달리는 번개', tag: '#러닝' },
    { id: 4, name: '달리는 번개', tag: '#러닝' },
  ];
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
    </>
  );
}
