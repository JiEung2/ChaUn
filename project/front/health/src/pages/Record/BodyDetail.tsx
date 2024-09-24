// import { useState, useEffect } from 'react';
// import GeneralButton from '@/components/Button/GeneralButton';
// import BodyAddModal from '@/components/Record/BodyDetail/BodyAddModal';
// import BodyDetailGraph from '@/components/Record/BodyDetail/BodyDetailGraph';
// import './BodyDetail.scss';

// import { getBodyRecord } from '@/api/record';

// const sampleData = [
//   { date: '2024-08-01', weight: 100.5, fat: 20.1, muscle: 30.2 },
//   { date: '2024-08-10', weight: 81.8, fat: 19.8, muscle: 30.4 },
//   { date: '2024-08-20', weight: 61.5, fat: 19.5, muscle: 30.6 },
//   { date: '2024-08-22', weight: 61.5, fat: 19.3, muscle: 30.6 },
//   { date: '2024-08-25', weight: 60.5, fat: 18.5, muscle: 30.6 },
//   { date: '2024-08-26', weight: 59.5, fat: 17.5, muscle: 30.6 },
//   { date: '2024-09-02', weight: 59.5, fat: 16.5, muscle: 30.6 },
//   { date: '2024-09-15', weight: 63.0, fat: 20.5, muscle: 30.1 },
//   // ... 다른 데이터 추가 가능
// ];

// export default function BodyDetailPage() {
//   const [pivotDate, setPivotDate] = useState<Date>(new Date());
//   const [year, setYear] = useState<number>(pivotDate.getFullYear());
//   const [month, setMonth] = useState<number>(pivotDate.getMonth() + 1);
//   const [showModal, setShowModal] = useState(false);
//   const [filteredData, setFilteredData] = useState<{ date: string; weight: number; fat: number; muscle: number }[]>([]);

//   const handleBodyRecord = (year: number, month: number) => {
//     try {
//       const response = getBodyRecord(year, month);
//       return response;
//     } catch (e) {
//       console.log(`error`);
//     }
//   };
//   useEffect(() => {
//     // 현재 선택된 달의 데이터만 필터링
//     const monthData = sampleData.filter((item) => {
//       const itemDate = new Date(item.date);
//       return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
//     });
//     setFilteredData(monthData);
//     handleBodyRecord(year, month);
//   }, [year, month]);

//   const onDecreaseMonth = () => {
//     const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1);
//     setPivotDate(newDate);
//     setYear(newDate.getFullYear());
//     setMonth(newDate.getMonth() + 1);
//   };

//   const onIncreaseMonth = () => {
//     const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1);
//     setPivotDate(newDate);
//     setYear(newDate.getFullYear());
//     setMonth(newDate.getMonth() + 1);
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   // 날짜 형식을 변경하는 함수
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const formattedDate = `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
//     return formattedDate;
//   };

//   return (
//     <div className="bodyRecordContainer">
//       <GeneralButton
//         buttonStyle={{ style: 'semiOutlined', size: 'mini' }}
//         className="bodyAdd"
//         onClick={handleOpenModal}>
//         체형 입력
//       </GeneralButton>

//       <div className="monthNavigation">
//         <button onClick={onDecreaseMonth}>&lt;</button>
//         <span>
//           {year}. {month.toString().padStart(2, '0')}
//         </span>
//         <button onClick={onIncreaseMonth}>&gt;</button>
//       </div>

//       <div className="graphContainer">
//         <BodyDetailGraph filteredData={filteredData} />
//       </div>

//       {filteredData.map((item) => (
//         <div className="timeline" key={item.date}>
//           <div className="timelineItem">
//             <div className="timelineDate">
//               <span className="dateIcon" />
//               {formatDate(item.date)}
//             </div>

//             <div className="timelineContent">
//               <p>몸무게: {item.weight}kg</p>
//               <p>골격근량: {item.muscle}kg</p>
//               <p>체지방량: {item.fat}kg</p>
//             </div>
//           </div>
//         </div>
//       ))}

//       {showModal && <BodyAddModal onClose={handleCloseModal} />}
//     </div>
//   );

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

  // API 호출을 비동기로 수행
  const handleBodyRecord = async (year: number, month: number) => {
    try {
      const response = await getBodyRecord(year, month);
      if (response && response.data) {
        const { bodyHistoryDataList } = response.data.data; // API로부터 받은 데이터 구조에 맞게 접근
        const monthData = bodyHistoryDataList.filter((item: { date: string }) => {
          const itemDate = new Date(item.date);
          return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month;
        });
        setFilteredData(monthData); // 필터된 데이터 설정
      }
    } catch (e) {
      console.log(`error: ${e}`);
    }
  };

  // useEffect에서 선택된 년/월에 맞는 데이터를 필터링
  useEffect(() => {
    handleBodyRecord(year, month); // API에서 데이터 가져오기
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
        <BodyDetailGraph filteredData={filteredData} />
      </div>

      {filteredData.map((item) => (
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
      ))}

      {showModal && <BodyAddModal onClose={handleCloseModal} />}
    </div>
  );
}
