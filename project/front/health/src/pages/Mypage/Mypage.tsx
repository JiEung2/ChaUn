import { Suspense, useRef, useState } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '@/components/Button/GeneralButton';
import CustomCategories from '@/components/Profile/Custom/CustomCategories';
import SnapshotList from '@/components/Profile/Snapshot/SnapshotList';
import CharacterCanvas from '@/components/Character/CharacterCanvas';
// import html2canvas from 'html2canvas';
import queryKeys from '@/utils/querykeys';
import './Mypage.scss';
import { getPartsList, getMyCharacter, postSnapshot } from '@/api/character';

export default function MypagePage() {
  const characterRef = useRef<HTMLDivElement | null>(null); // 캔버스를 참조하는 div로 변경
  const [selectedTab, setSelectedTab] = useState('헤어');
  // const [canvasSnapshot, setCanvasSnapshot] = useState<string | null>(null); // 스냅샷 상태

  // 캐릭터 및 파츠 리스트 조회
  const { data: myCharacter, error: characterError } = useSuspenseQuery({
    queryKey: [queryKeys.CHARACTER],
    queryFn: () => getMyCharacter(),
  });

  if (characterError) {
    return <p>캐릭터 정보를 불러오는 중 문제가 발생했습니다.</p>;
  }

  const { data: partsList } = useSuspenseQuery({
    queryKey: [queryKeys.PARTSLIST],
    queryFn: () => getPartsList(),
  });

  const mutation = useMutation({
    mutationFn: (snapshot: string) => postSnapshot(snapshot),
    onSuccess: (response) => {
      const { snapshotUrl } = response.data;
      console.log('스냅샷 전송 성공. URL:', snapshotUrl);
    },
    onError: (error) => {
      console.error('스냅샷 전송 실패:', error);
    },
  });

  const characterGlbUrl = myCharacter?.data?.data.characterUrl || '';
  const characterGender = myCharacter?.data?.data.gender === 'MAN' ? 'MAN' : 'FEMALE';

  // partsList 데이터 매핑
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
        // case 'ARM' || 'LEG' || 'NONE':
        //   category = '아이템';
        //   break;
        default:
          category = '아이템';
      }

      return {
        id: part.id,
        category,
        price: part.cost,
        image: part.partsImage,
        isLocked: true,
        isApplied: false,
      };
    }) || [];

  // // 스냅샷을 캡처하고 서버로 전송하는 함수
  // const handleSnapshot = () => {
  //   if (canvasSnapshot) {
  //     console.log('Generated Snapshot:', canvasSnapshot);
  //     mutation.mutate(canvasSnapshot); // 서버로 스냅샷을 전송
  //   }
  // };

  // // 스냅샷 캡처 함수
  // const captureCanvas = (snapshot: string) => {
  //   setCanvasSnapshot(snapshot); // 캡처한 이미지를 상태에 저장
  // };
  const handleCapture = (snapshot: string) => {
    console.log('Received snapshot in MypagePage:', snapshot);
    mutation.mutate(snapshot); // 서버로 스냅샷 전송
  };

  return (
    <div className="myProfileContainer">
      <div className="profileSection">
        <div className="info">
          <p className="subtitle">{} 님</p>
          <Coin amount={100} style="styled" />
        </div>

        <div className="character" ref={characterRef}>
          {/* 캔버스를 감싸는 div에 ref 추가 */}
          {characterGlbUrl ? (
            <CharacterCanvas glbUrl={characterGlbUrl} gender={characterGender} onCapture={handleCapture} />
          ) : (
            <p>캐릭터 정보를 불러오는 중입니다...</p>
          )}
          <GeneralButton
            buttonStyle={{ style: 'primary', size: 'select' }}
            className="snapshotButton"
            onClick={() => handleCapture}>
            스냅샷
          </GeneralButton>
        </div>
      </div>

      <div className="customSection">
        <p className="subtitle">커스텀</p>
        <div className="customBox">
          <CustomCategories
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            userCoin={100}
            onPurchase={() => {}}
            onApply={() => {}}
            items={mappedItems.filter((item: any) => item.category === selectedTab)}
          />
        </div>
      </div>

      <div className="snapshotSection">
        <p className="subtitle">스냅샷</p>
        <div className="snapshotBox">
          <SnapshotList snapshots={[]} />
        </div>
      </div>

      <GeneralButton buttonStyle={{ style: 'floating', size: 'small' }} className="logout">
        로그아웃
      </GeneralButton>
    </div>
  );
}

export function MypagePageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MypagePage />
    </Suspense>
  );
}
