import './SnapshotList.scss';

interface SnapshotListProps {
  snapshots: { date: string; image: string }[];
}

export default function SnapshotList({ snapshots }: SnapshotListProps) {

    return (
        <div className="snapshotListContainer">
            {snapshots.length > 0 ? (
                <div className="snapshotGrid">
                    {snapshots.map((snapshot, index) => (
                        <div key={index} className="snapshotItem">
                            <img src={snapshot.image} alt={`snapshot-${index}`} />
                            <p>{snapshot.date}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="notSnapshot">
                    아직 찍은 스냅샷이 없습니다 <br />
                    스냅샷 버튼을 눌러 체형을 기록해보세요
                </p>
            )}
        </div>
    );
}
