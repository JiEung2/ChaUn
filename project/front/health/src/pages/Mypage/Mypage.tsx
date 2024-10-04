import { useRef, useState, useEffect } from 'react';
import { useMutation, useSuspenseQuery, useQueryClient, useQuery } from '@tanstack/react-query';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '@/components/Button/GeneralButton';
import CustomCategories from '@/components/Profile/Custom/CustomCategories';
import SnapshotList from '@/components/Profile/Snapshot/SnapshotList';
import CharacterCanvas from '@/components/Character/CharacterCanvas';
import queryKeys from '@/utils/querykeys';
import './Mypage.scss';
import { getPartsList, getMyCharacter, postSnapshot, patchPartsOnOff, getSnapshotList } from '@/api/character';

export default function MypagePage() {
  const characterRef = useRef<HTMLDivElement | null>(null);
  const [selectedTab, setSelectedTab] = useState('헤어');
  const [characterGlbUrl, setCharacterGlbUrl] = useState<string | null>(null); // 캐릭터 URL 상태 추가
  const [appliedParts, setAppliedParts] = useState<{ [key: number]: boolean }>({}); // 파츠 적용 상태
  const [purchasedParts, setPurchasedParts] = useState<{ [key: number]: boolean }>({}); // 구매된 파츠 상태 추가
  const queryClient = useQueryClient(); // React Query의 캐시 사용

  // 로컬 스토리지에서 구매한 파츠 정보 불러오기
  useEffect(() => {
    const storedPurchasedParts = localStorage.getItem('purchasedParts');
    if (storedPurchasedParts) {
      setPurchasedParts(JSON.parse(storedPurchasedParts));
    }
  }, []);

  // 캐릭터 및 파츠 리스트 조회
  const { data: myCharacter } = useSuspenseQuery({
    queryKey: [queryKeys.CHARACTER],
    queryFn: () => getMyCharacter(),
  });

  useEffect(() => {
    if (myCharacter) {
      setCharacterGlbUrl(myCharacter?.data?.data.characterUrl || '');
    }
  }, [myCharacter]);

  const { data: partsList } = useSuspenseQuery({
    queryKey: [queryKeys.PARTS_LIST],
    queryFn: () => getPartsList(),
  });

  // 스냅샷 리스트 캐시에서 확인
  const cachedSnapshotList = queryClient.getQueryData([queryKeys.SNAPSHOT_LIST]);

  const { data: snapshotList } = useQuery({
    queryKey: [queryKeys.SNAPSHOT_LIST],
    queryFn: () => getSnapshotList(),
    enabled: !cachedSnapshotList, // 캐시된 데이터가 없을 때만 API 호출
  });

  const mutation = useMutation({
    mutationFn: (snapshot: string) => postSnapshot(snapshot),
    onSuccess: (response) => {
      const { snapshotUrl } = response.data;
      console.log('스냅샷 전송 성공. URL:', snapshotUrl);
      queryClient.invalidateQueries({ queryKey: [queryKeys.SNAPSHOT_LIST] }); // 스냅샷 목록 무효화
    },
    onError: (error) => {
      console.error('스냅샷 전송 실패:', error);
    },
  });

  // 파츠 적용/해제를 위한 mutation
  const partsOnoffMutation = useMutation({
    mutationFn: (parts_id: number) => patchPartsOnOff(parts_id),
    onSuccess: (response) => {
      const newCharacterUrl = response?.data?.characterUrl;
      setCharacterGlbUrl(newCharacterUrl); // 캐릭터 URL 업데이트
    },
    onError: (error) => {
      console.error('파츠 적용/해제 실패:', error);
    },
  });

  // 파츠 적용/해제 핸들러
  const handleApply = (item: any) => {
    const isApplied = appliedParts[item.id];
    setAppliedParts((prev) => ({ ...prev, [item.id]: !isApplied })); // 적용/해제 토글
    partsOnoffMutation.mutate(item.id); // partsOnOff 호출
  };

  // 아이템 구매 후 `isLocked` 해제 로직 추가 및 로컬 스토리지 저장
  const handlePurchase = (item: any) => {
    setPurchasedParts((prev) => {
      const updatedParts = { ...prev, [item.id]: true };
      localStorage.setItem('purchasedParts', JSON.stringify(updatedParts)); // 구매한 파츠 로컬 스토리지에 저장
      return updatedParts;
    });
  };

  const handleCapture = (snapshot: string) => {
    mutation.mutate(snapshot); // 서버로 스냅샷 전송
  };

  // 스냅샷 데이터를 날짜 포맷팅하여 넘기기
  const formattedSnapshots = snapshotList?.data?.data.snapshots.map((snapshot: any) => ({
    date: new Date(snapshot.createdAt).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
    image: snapshot.snapshotUrl,
  }));

  const mappedItems =
    partsList?.data?.data?.partsList?.map((part: any) => {
      let category = '';
      switch (part.partsType) {
        case 'HAIR':
          category = '헤어';
          break;
        case 'BODY':
          category = '상의';
          break;
        case 'PANTS':
          category = '하의';
          break;
        default:
          category = '아이템';
      }

      return {
        id: part.id,
        category,
        price: part.cost,
        image: part.partsImage,
        isLocked: !purchasedParts[part.id], // 구매 여부에 따라 블러 처리
        isApplied: appliedParts[part.id] || false, // 적용 상태 추가
      };
    }) || [];

  return (
    <div className="myProfileContainer">
      <div className="profileSection">
        <div className="info">
          <p className="subtitle">{/* 사용자 이름 */}님</p>
          <Coin amount={100} style="styled" />
        </div>

        <div className="character" ref={characterRef}>
          {characterGlbUrl ? (
            <CharacterCanvas
              glbUrl={characterGlbUrl}
              gender={myCharacter?.data?.data.gender === 'MAN' ? 'MAN' : 'FEMALE'}
              onCapture={handleCapture}
            />
          ) : (
            <p>캐릭터 정보를 불러오는 중입니다...</p>
          )}
        </div>
      </div>

      <div className="customSection">
        <p className="subtitle">커스텀</p>
        <div className="customBox">
          <CustomCategories
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            userCoin={100}
            onPurchase={handlePurchase} // 구매 핸들러 추가
            onApply={handleApply} // 적용/해제 함수 연결
            items={mappedItems.filter((item: any) => item.category === selectedTab)}
          />
        </div>
      </div>

      <div className="snapshotSection">
        <p className="subtitle">스냅샷</p>
        <div className="snapshotBox">{formattedSnapshots && <SnapshotList snapshots={formattedSnapshots} />}</div>
      </div>

      <GeneralButton buttonStyle={{ style: 'floating', size: 'small' }} className="logout">
        로그아웃
      </GeneralButton>
    </div>
  );
}
