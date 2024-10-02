import { Suspense, useRef, useState } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '@/components/Button/GeneralButton';
import CustomCategories from '@/components/Profile/Custom/CustomCategories';
import SnapshotList from '@/components/Profile/Snapshot/SnapshotList';
import html2canvas from 'html2canvas';
import queryKeys from '@/utils/querykeys';
import { getUserDetail } from '@/api/user';
import './Mypage.scss';
import { useParams } from 'react-router-dom';
import { getPartsList, getMyCharacter, postSnapshot } from '@/api/character';

export default function MypagePage() {
  const { userId } = useParams<{ userId: string }>();
  const characterRef = useRef<HTMLImageElement | null>(null);
  const [selectedTab, setSelectedTab] = useState('헤어');

  // 캐릭터 및 파츠 리스트 조회
  const { data: myCharacter } = useSuspenseQuery({
    queryKey: [queryKeys.CHARACTER],
    queryFn: () => getMyCharacter(),
  });

  const { data: partsList } = useSuspenseQuery({
    queryKey: [queryKeys.PARTSLIST],
    queryFn: () => getPartsList(),
  });

  const numericUserId = userId ? Number(userId) : 0;

  const { data: userDetail } = useSuspenseQuery({
    queryKey: [queryKeys.USER_DETAIL, numericUserId],
    queryFn: () => getUserDetail(numericUserId),
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

  // partsList 데이터 매핑
  const mappedItems =
    partsList?.data?.data?.partsList?.map((part: any) => {
      let category = '';
      switch (part.partsType) {
        case 'hair':
          category = '헤어';
          break;
        case 'clothes':
          category = '상의';
          break;
        case 'pants':
          category = '하의';
          break;
        case 'item':
          category = '아이템';
          break;
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

  // mappedItems가 제대로 생성되었는지 확인
  console.log('Mapped Items:', mappedItems);

  // 스냅샷을 캡처하고 서버로 전송하는 함수
  const handleSnapshot = () => {
    if (characterRef.current) {
      html2canvas(characterRef.current, {
        scale: 2,
        backgroundColor: '#98e4ff',
      }).then((canvas) => {
        const snapshot = canvas.toDataURL('image/png');
        mutation.mutate(snapshot);
      });
    }
  };

  return (
    <div className="myProfileContainer">
      <div className="profileSection">
        <div className="info">
          <p className="subtitle">{userDetail?.data.data.nickname} 님</p>
          <Coin amount={userDetail?.data.data.coin} style="styled" />
        </div>

        <div className="character">
          <img src="https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5dancing.glb" alt="" />
          <img src={myCharacter?.data?.data.characterUrl} alt="myModel" ref={characterRef} />
          <GeneralButton
            buttonStyle={{ style: 'primary', size: 'select' }}
            className="snapshotButton"
            onClick={handleSnapshot}>
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
            userCoin={userDetail?.data.data.coin}
            onPurchase={() => {}}
            onApply={() => {}}
            items={mappedItems.filter((item: any) => item.category === selectedTab)}
          />
        </div>
      </div>

      <div className="snapshotSection">
        <p className="subtitle">스냅샷</p>
        <div className="snapshotBox">
          <SnapshotList snapshots={[]} /> {/* 스냅샷 리스트 추가 필요 */}
        </div>
      </div>

      <GeneralButton buttonStyle={{ style: 'floating', size: 'small' }} className="logout">
        로그아웃
      </GeneralButton>
    </div>
  );
}

// Suspense로 감싸서 로딩 중 처리 추가
export function MypagePageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MypagePage />
    </Suspense>
  );
}
