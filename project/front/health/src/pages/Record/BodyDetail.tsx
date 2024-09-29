import { useState } from 'react';
import GeneralButton from '@/components/Button/GeneralButton';
import BodyAddModal from '@/components/Record/BodyDetail/BodyAddModal';
import BodyDetailGraph from '@/components/Record/BodyDetail/BodyDetailGraph';
import './BodyDetail.scss';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBodyRecord } from '@/api/record';
import queryKeys from '@/utils/querykeys';
import { Suspense } from 'react';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function BodyDetailContent({ year, month }: { year: number; month: number }) {
  const { data: bodyDetailRecord } = useSuspenseQuery({
    queryKey: [queryKeys.MY_BODY_DETAIL, year, month],
    queryFn: () => getBodyRecord(year, month),
    select: (response) => {
      const bodyHistoryDataList = response.data.data?.bodyHistoryDataList || [];
      return bodyHistoryDataList.map((item: any) => ({
        date: item.date,
        weight: item.weight,
        skeletalMuscleMass: item.skeletalMuscleMass,
        bodyFatRatio: item.bodyFatRatio,
      }));
    },
  });

  return (
    <div className="graphContainer">
      <BodyDetailGraph
        filteredData={bodyDetailRecord?.map((item: any) => ({
          date: formatDate(item.date),
          weight: item.weight,
          muscle: item.skeletalMuscleMass,
          fat: item.bodyFatRatio,
        }))}
      />
      {/* 타임라인 */}
      {bodyDetailRecord?.map((item: any) => (
        <div className="timeline" key={item.date}>
          <div className="timelineItem">
            <div className="timelineDate">
              <span className="dateIcon" />
              {formatDate(item.date)}
            </div>
            <div className="timelineContent">
              <p>몸무게: {item.weight}kg</p>
              <p>골격근량: {item.skeletalMuscleMass}kg</p>
              <p>체지방률: {item.bodyFatRatio}%</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BodyDetailPage() {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [showModal, setShowModal] = useState(false);

  const onDecreaseMonth = () => {
    const newDate = new Date(year, month - 2);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  const onIncreaseMonth = () => {
    const newDate = new Date(year, month);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bodyRecordContainer">
      <GeneralButton
        buttonStyle={{ style: 'semiOutlined', size: 'mini' }}
        className="bodyAdd"
        onClick={handleOpenModal}>
        체형 입력
      </GeneralButton>

      <div className="monthNavigation">
        <button onClick={onDecreaseMonth}>&lt;</button>
        <span>
          {year}. {month.toString().padStart(2, '0')}
        </span>
        <button onClick={onIncreaseMonth}>&gt;</button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <BodyDetailContent year={year} month={month} />
      </Suspense>

      {showModal && <BodyAddModal onClose={handleCloseModal} />}
    </div>
  );
}
