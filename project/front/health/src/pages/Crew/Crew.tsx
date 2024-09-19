import BattleBoard from './components/BattleBoard';
// import CrewList from './components/CrewList';

export default function CrewPage() {
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
