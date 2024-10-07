import { useState, useEffect, startTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import querykeys from '@/utils/querykeys';
import QuestItem from '../../../components/Home/Quest/QuestItem';
import { getQuest } from '@/api/quest.ts';
import './Quest.scss';

interface PersonalQuest {
  questId: number;
  title: string;
  questPeriod: string;
  isCompleted: boolean;
}

export default function QuestPage() {
  const { data } = useQuery({
    queryKey: [querykeys.USER_QUEST],
    queryFn: () => getQuest(),
  });

  const [todayQuests, setTodayQuests] = useState<PersonalQuest[]>([]);
  const [monthlyQuests, setMonthlyQuests] = useState<PersonalQuest[]>([]);

  useEffect(() => {
    if (data) {
      startTransition(() => {
        const daily: PersonalQuest[] = [];
        const monthly: PersonalQuest[] = [];
        const quests: PersonalQuest[] = data?.todayQuests || [];

        quests.forEach((quest) => {
          if (quest.questPeriod === 'DAILY') {
            daily.push(quest);
          } else if (quest.questPeriod === 'MONTHLY') {
            monthly.push(quest);
          }
        });

        setTodayQuests(daily);
        setMonthlyQuests(monthly);
      });
    }
  }, [data]);

  return (
    <div className="questList">
      <div className="todayQuest">
        <p className="questH3">오늘의 퀘스트</p>
        {todayQuests.length > 0 ? (
          todayQuests.map((quest) => (
            <QuestItem key={quest.questId} title={quest.title} completed={quest.isCompleted} />
          ))
        ) : (
          <p>남은 퀘스트가 없습니다.</p>
        )}
      </div>

      <div className="monthlyQuest">
        <p className="questH3">월간 퀘스트</p>
        {monthlyQuests.length > 0 ? (
          monthlyQuests.map((quest) => (
            <QuestItem key={quest.questId} title={quest.title} completed={quest.isCompleted} />
          ))
        ) : (
          <p>남은 퀘스트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
