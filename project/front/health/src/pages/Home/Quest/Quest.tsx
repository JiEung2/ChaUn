import QuestItem from '../../../components/Home/Quest/QuestItem';
import './Quest.scss';

export default function Quest () {
  const todayQuests = [
    { title: '[개인] 매일 몸무게 입력하기', completed: true },
    { title: '[개인] 하루 한 번 운동하기', completed: true },
    { title: '[개인] 크루원 1회 찌르기', completed: false },
  ];

  const monthlyQuests = [
    { title: '[개인] 2주 출석 도장 찍기', completed: false },
  ];

  return (
    <div className="questList">
      <h3>오늘의 퀘스트</h3>
      {todayQuests.map((quest, index) => (
        <QuestItem key={index} title={quest.title} completed={quest.completed} />
      ))}

      <h3>월간 퀘스트</h3>
      {monthlyQuests.map((quest, index) => (
        <QuestItem key={index} title={quest.title} completed={quest.completed} />
      ))}
    </div>
  );
};

