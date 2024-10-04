import { useRef, useState, useEffect } from 'react';
import { useMutation, useSuspenseQuery, useQueryClient, useQuery } from '@tanstack/react-query';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '@/components/Button/GeneralButton';
import CustomCategories from '@/components/Profile/Custom/CustomCategories';
import SnapshotList from '@/components/Profile/Snapshot/SnapshotList';
import CharacterCanvas from '@/components/Character/CharacterCanvas';
import queryKeys from '@/utils/querykeys';
import './Mypage.scss';
import { getPartsList, getMyCharacter, patchPartsOnOff, getSnapshotList } from '@/api/character';

const baseUrl = 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/';

export default function MypagePage() {
  const characterRef = useRef<HTMLDivElement | null>(null);
  const [selectedTab, setSelectedTab] = useState('헤어');
  const [characterGlbUrl, setCharacterGlbUrl] = useState<string | null>(null); // 캐릭터 URL 상태 추가
  const [appliedParts, setAppliedParts] = useState<{ [key: number]: boolean }>({}); // 파츠 적용 상태
  const [purchasedParts, setPurchasedParts] = useState<{ [key: number]: boolean }>({}); // 구매된 파츠 상태 추가
  const [activeAnimation, setActiveAnimation] = useState<string>('standing'); // 기본값으로 'standing' 애니메이션 설정
  const [gender, setGender] = useState<'MAN' | 'FEMALE'>('MAN'); // 성별 상태 추가
  const queryClient = useQueryClient();

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
      setGender(myCharacter?.data?.data.gender === 'MAN' ? 'MAN' : 'FEMALE');
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
  const formattedSnapshots = snapshotList?.data?.data.snapshots.map((snapshot: any) => ({
    date: new Date(snapshot.createdAt).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
    image: snapshot.snapshotUrl,
  }));

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

  // 애니메이션 URL 생성 로직 (남성/여성 및 파츠 적용 여부에 따라 다름)
  const generateAnimationUrl = (type: 'standing' | 'dancing' | 'waving') => {
    const hasPartsApplied = Object.values(appliedParts).some((applied) => applied);

    if (gender === 'MAN') {
      switch (type) {
        case 'standing':
          return hasPartsApplied ? `${baseUrl}B5standingPants.glb` : `${baseUrl}B5standing.glb`;
        case 'dancing':
          return hasPartsApplied ? `${baseUrl}B5dancingPants.glb` : `${baseUrl}B5dancing.glb`;
        case 'waving':
          return hasPartsApplied ? `${baseUrl}B5wavingPants.glb` : `${baseUrl}B5waving.glb`;
      }
    } else {
      switch (type) {
        case 'standing':
          return `${baseUrl}GBstanding.glb`;
        case 'dancing':
          return `${baseUrl}GBdancing.glb`;
        case 'waving':
          return `${baseUrl}GBwaving.glb`;
      }
    }
  };

  // 버튼 클릭 핸들러 - 선택된 애니메이션만 비활성화
  const handleButtonClick = (type: 'standing' | 'dancing' | 'waving') => {
    const url = generateAnimationUrl(type);
    setCharacterGlbUrl(url); // 선택한 모델 URL로 업데이트
    setActiveAnimation(type); // 현재 선택된 애니메이션 저장
  };

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
            <CharacterCanvas glbUrl={characterGlbUrl} gender={gender} />
          ) : (
            <p>캐릭터 정보를 불러오는 중입니다...</p>
          )}

          <div className="character-actions">
            <button
              className={activeAnimation === 'standing' ? 'disabled' : 'primary'}
              onClick={() => handleButtonClick('standing')}
              disabled={activeAnimation === 'standing'}>
              기본
            </button>
            <button
              className={activeAnimation === 'dancing' ? 'disabled' : 'primary'}
              onClick={() => handleButtonClick('dancing')}
              disabled={activeAnimation === 'dancing'}>
              춤추기
            </button>
            <button
              className={activeAnimation === 'waving' ? 'disabled' : 'primary'}
              onClick={() => handleButtonClick('waving')}
              disabled={activeAnimation === 'waving'}>
              인사
            </button>
          </div>
        </div>
      </div>

      <div className="customSection">
        <p className="subtitle">커스텀</p>
        <div className="customBox">
          <CustomCategories
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            userCoin={100}
            onPurchase={handlePurchase}
            onApply={handleApply}
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
