import { useState, useEffect } from 'react';
import GeneralButton from '@/components/Button/GeneralButton';
import BodyAddModal from '@/components/Record/BodyDetail/BodyAddModal';
import BodyDetailGraph from '@/components/Record/BodyDetail/BodyDetailGraph';
import './BodyDetail.scss';

import { getBodyRecord } from '@/api/record';

export default function BodyDetailPage() {
  const [pivotDate, setPivotDate] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(pivotDate.getFullYear());
  const [month, setMonth] = useState<number>(pivotDate.getMonth() + 1);
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState<{ date: string; weight: number; fat: number; muscle: number }[]>([]);

  const handleBodyRecord = async (year: number, month: number) => {
    try {
      const response = await getBodyRecord(year, month);
      if (response && response.data.data) {
        const { bodyHistoryDataList } = response.data.data;
        if (Array.isArray(bodyHistoryDataList)) {
          const monthData = bodyHistoryDataList
            .filter((item: { date: string }) => {
              const itemDate = new Date(item.date);
              return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
            })
            .map((item: any) => ({
              date: formatDate(item.date),
              weight: item.weight,
              fat: item.bodyFatRatio,
              muscle: item.skeletalMuscleMass,
            }));

          setFilteredData(monthData);
        } else {
          console.error('bodyHistoryDataList가 배열이 아님:', bodyHistoryDataList);
        }
      } else {
        console.error('응답 데이터가 없습니다.');
      }
    } catch (e) {
      console.error(`API 호출 중 에러 발생: ${e}`);
    }
  };

  useEffect(() => {
    handleBodyRecord(year, month);
  }, [year, month]);

  const onDecreaseMonth = () => {
    const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1);
    setPivotDate(newDate);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  const onIncreaseMonth = () => {
    const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1);
    setPivotDate(newDate);
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
    const formattedDate = `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    return formattedDate;
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
          filteredData={filteredData.map((item) => ({
            date: item.date,
            weight: item.weight,
            muscle: item.muscle,
            fat: item.fat,
          }))}
        />
      </div>

      {filteredData.map((item) => (
        <div className="timeline" key={item.date}>
          <div className="timelineItem">
            <div className="timelineDate">
              <span className="dateIcon" />
              {item.date}
            </div>

            <div className="timelineContent">
              <p>몸무게: {item.weight}kg</p>
              <p>골격근량: {item.muscle}kg</p>
              <p>체지방량: {item.fat}kg</p>
            </div>
          </div>
        </div>
      ))}

      {showModal && <BodyAddModal onClose={handleCloseModal} />}
    </div>
  );
}
