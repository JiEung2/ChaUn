import './SnapshotList.scss';

interface SnapshotListProps {
  snapshots: { date: string; image: string }[];
}

export default function SnapshotList({ snapshots }: SnapshotListProps) {
  return (
    <div className="mySnapshotListContainer">
      {snapshots.length > 0 ? (
        <div className="snapshotGrid">
          {snapshots.map((snapshot, index) => (
            <div key={index} className="snapshotItem">
                <p className="snapshotDate">{snapshot.date}</p>
                <img src={snapshot.image} alt={`snapshot-${index}`} />
              
            </div>
          ))}
        </div>
      ) : (
        <div className="noSnapshotMessage">
          <p>아직 찍은 스냅샷이 없습니다.</p>
          <p>스냅샷 버튼을 눌러 체형을 기록해보세요!</p>                
        </div>
      )}
    </div>
  );
}
