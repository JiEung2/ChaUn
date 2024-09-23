import { useState, useEffect } from 'react';
import GeneralButton from "@/components/Button/GeneralButton";
import BodyAddModal from '@/components/Record/BodyDetail/BodyAddModal';
import BodyDetailGraph from '@/components/Record/BodyDetail/BodyDetailGraph';
import './BodyDetail.scss';

const sampleData = [
  { date: '2024-08-01', weight: 100.5, fat: 20.1, muscle: 30.2 },
  { date: '2024-08-10', weight: 81.8, fat: 19.8, muscle: 30.4 },
  { date: '2024-08-20', weight: 61.5, fat: 19.5, muscle: 30.6 },
  { date: '2024-08-22', weight: 61.5, fat: 19.3, muscle: 30.6 },
  { date: '2024-08-25', weight: 60.5, fat: 18.5, muscle: 30.6 },
  { date: '2024-08-26', weight: 59.5, fat: 17.5, muscle: 30.6 },
  { date: '2024-09-02', weight: 59.5, fat: 16.5, muscle: 30.6 },
  { date: '2024-09-15', weight: 63.0, fat: 20.5, muscle: 30.1 },
  // ... 다른 데이터 추가 가능
];

export default function BodyDetailPage() {
  const [pivotDate, setPivotDate] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(pivotDate.getFullYear());
  const [month, setMonth] = useState<number>(pivotDate.getMonth() + 1);
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState<{ date: string; weight: number; fat: number; muscle: number }[]>([]);

  useEffect(() => {
    // 현재 선택된 달의 데이터만 필터링
    const monthData = sampleData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
    });

    setFilteredData(monthData);
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
        onClick={handleOpenModal}
      >
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
        <BodyDetailGraph filteredData={filteredData} />
      </div>

      {filteredData.map(item => (
          <div className="timeline" key={item.date}>
            <div className="timelineItem">
              <div className="timelineDate">
                <span className="dateIcon" />
                {formatDate(item.date)}
              </div>

              <div className="timelineContent">
                <p>몸무게: {item.weight}kg</p>
                <p>골격근량: {item.muscle}kg</p>
                <p>체지방량: {item.fat}kg</p>
              </div>
            </div>
          </div>
        ))
      }

      {showModal && <BodyAddModal onClose={handleCloseModal} />}
    </div>
  );
}
