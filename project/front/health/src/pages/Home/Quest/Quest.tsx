import QuestItem from '../../../components/Home/Quest/QuestItem';
import './Quest.scss';

export default function QuestPage() {
  const todayQuests = [
    { title: '매일 몸무게 입력하기', completed: true },
    { title: '하루 한 번 운동하기', completed: true },
    { title: '크루원 1회 찌르기', completed: false },
  ];

  const monthlyQuests = [{ title: '2주 출석 도장 찍기', completed: false }];

  return (
    <div className="questList">
      <div className="todayQuest">
        <p className="questH3">오늘의 퀘스트</p>
        {todayQuests.map((quest, index) => (
          <QuestItem key={index} title={quest.title} completed={quest.completed} />
        ))}
      </div>

      <div className="monthlyQuest">
        <p className="questH3">월간 퀘스트</p>
        {monthlyQuests.map((quest, index) => (
          <QuestItem key={index} title={quest.title} completed={quest.completed} />
        ))}
      </div>
    </div>
  );
}
