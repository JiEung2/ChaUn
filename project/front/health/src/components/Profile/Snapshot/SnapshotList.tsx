import './SnapshotList.scss';

interface SnapshotListProps {
  snapshots: { date: string; image: string }[];
  sortOrder: string;
}

export default function SnapshotList({ snapshots, sortOrder }: SnapshotListProps) {
    // 최신순, 과거순에 따라 스냅샷 정렬
    const sortedSnapshots = [...snapshots].sort((a, b) => {
        if (sortOrder === '최신순') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
    });

    return (
        <div className="snapshotListContainer">
            {sortedSnapshots.length > 0 ? (
                <div className="snapshotGrid">
                    {sortedSnapshots.map((snapshot, index) => (
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
