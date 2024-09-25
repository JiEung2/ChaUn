import { useState, useEffect } from 'react';
import GeneralButton from '@/components/Button/GeneralButton';
import BodyAddModal from '@/components/Record/BodyDetail/BodyAddModal';
import BodyDetailGraph from '@/components/Record/BodyDetail/BodyDetailGraph';
import './BodyDetail.scss';

import { getBodyRecord } from '@/api/record';

export default function BodyDetailPage() {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [showModal, setShowModal] = useState(false);
  const [bodyHistoryDataList, setBodyHistoryDataList] = useState<
    { date: string; weight: number; skeletalMuscleMass: number; bodyFatRatio: number }[]
  >([]);


  const handleBodyRecord = async (year: number, month: number) => {
    try {
      const response = await getBodyRecord(year, month);
      const bodyHistoryDataList = response.data.data?.bodyHistoryDataList || [];
      setBodyHistoryDataList(bodyHistoryDataList);
    } catch (e) {
      console.error(`API 호출 중 에러 발생: ${e}`);
    }
  };

  useEffect(() => {
    console.log('렌더링 시 year:', year, 'month:', month);
    if (year && month) {
      handleBodyRecord(year, month);
    }
  }, [year, month]);

  const onDecreaseMonth = () => {
    const newDate = new Date(year, month - 2); // 이전 달로 이동
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  const onIncreaseMonth = () => {
    const newDate = new Date(year, month); // 다음 달로 이동
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 날짜 형식을 변경하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
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

      <div className="graphContainer">
          <BodyDetailGraph
            filteredData={bodyHistoryDataList.map((item) => ({
              date: formatDate(item.date),
              weight: item.weight,
              muscle: item.skeletalMuscleMass,
              fat: item.bodyFatRatio,
            }))}
          />
      </div>

      {/* 타임라인 */}
      {bodyHistoryDataList && bodyHistoryDataList.map((item: any) => (
        <div className="timeline" key={item.date}>
          <div className="timelineItem">
            <div className="timelineDate">
              <span className="dateIcon" />
              {formatDate(item.date)}
            </div>

            <div className="timelineContent">
              <p>몸무게: {item.weight}kg</p>
              <p>골격근량: {item.skeletalMuscleMass}kg</p>
              <p>체지방량: {item.bodyFatRatio}kg</p>
            </div>
          </div>
        </div>
      ))}
      {showModal && <BodyAddModal onClose={handleCloseModal} />}
    </div>
  );
}
