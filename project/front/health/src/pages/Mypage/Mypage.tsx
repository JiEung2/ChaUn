import { useRef, useState, useEffect, Suspense } from 'react';
import { useMutation, useSuspenseQuery, useQueryClient, useQuery } from '@tanstack/react-query';
import ShuffleIcon from '@/assets/svg/shuffle.svg';
import CamerIcon from '@/assets/svg/camera.svg';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '@/components/Button/GeneralButton';
import CustomCategories from '@/components/Profile/Custom/CustomCategories';
import SnapshotList from '@/components/Profile/Snapshot/SnapshotList';
import CharacterCanvas from '@/components/Character/CharacterCanvas';
import html2canvas from 'html2canvas';
import queryKeys from '@/utils/querykeys';
import './Mypage.scss';
import { getUserDetail } from '@/api/user';
import { getMyCharacter, getPartsList, patchPartsOnOff, getSnapshotList, postSnapshot } from '@/api/character';
import useUserStore from '@/store/userInfo';
const baseUrl = 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/';

export default function MypagePage() {
  const { userId, nickname, coin, characterFileUrl, setHasCoin, setCharacterFileUrl } = useUserStore();
  const characterRef = useRef<HTMLDivElement | null>(null);
  const [selectedTab, setSelectedTab] = useState('헤어');
  // const [setPreserveBuffer] = useState(false);
  const [mypageCharacterUrl, setMypageCharacterUrl] = useState(characterFileUrl); // 캐릭터 URL 상태 추가
  const [appliedParts, setAppliedParts] = useState<{ [key: number]: boolean }>({}); // 파츠 적용 상태
  const [purchasedParts, setPurchasedParts] = useState<{ [key: number]: boolean }>({}); // 구매된 파츠 상태 추가
  const [_, setActiveAnimation] = useState<string>('standing'); // 기본값으로 'standing' 애니메이션 설정
  const [gender, setGender] = useState<'MAN' | 'WOMAN'>('MAN'); // 성별 상태 추가

  const [preserveBuffer, setPreserveBuffer] = useState(false);
  const queryClient = useQueryClient();
  interface snapshots {
    snapshotUrl: string;
    createdAt: string;
  }
  // 로컬 스토리지에서 구매한 파츠 정보 불러오기
  useEffect(() => {
    const storedPurchasedParts = localStorage.getItem('purchasedParts');
    if (storedPurchasedParts) {
      setPurchasedParts(JSON.parse(storedPurchasedParts));
    }
  }, []);

  // 캐릭터 및 파츠 리스트 조회
  const { data: myDetail } = useSuspenseQuery({
    queryKey: [queryKeys.USER_DETAIL, userId],
    queryFn: () => getUserDetail(userId),
  });
  console.log('myDetail.characterFileUrl', myDetail.characterFileUrl, userId);

  const { data: myCharacter } = useSuspenseQuery({
    queryKey: [queryKeys.CHARACTER],
    queryFn: () => getMyCharacter(),
  });

  useEffect(() => {
    if (myDetail) {
      setGender(myDetail.gender === 'MAN' ? 'MAN' : 'WOMAN');
      // setCharacterGlbUrl(myDetail.characterFileUrl);
      setHasCoin(myDetail.coins);
    }
    setMypageCharacterUrl(characterFileUrl);
  }, [myDetail]);

  const { data: partsList } = useSuspenseQuery({
    queryKey: [queryKeys.PARTS_LIST],
    queryFn: () => getPartsList(),
  });

  const snapshotMutation = useMutation({
    mutationFn: (snapshot: FormData) => postSnapshot(snapshot),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.SNAPSHOT_LIST] });
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  // 캔버스 캡처 핸들러
  const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed.')); // 에러 발생 시 reject
        }
      }, 'image/png');
    });
  };

  const handleCaptureClick = async () => {
    setPreserveBuffer(true);

    requestAnimationFrame(async () => {
      if (characterRef.current) {
        try {
          // 캔버스를 캡처하고 base64로 변환
          const canvas = await html2canvas(characterRef.current as HTMLElement, {
            backgroundColor: '#98e4ff',
          });

          // PNG 파일로 변환
          const blob = await canvasToBlob(canvas);
          const file = new File([blob], 'character_snapshot.png', { type: 'image/png' });

          // FormData 생성 및 'snapshot' 키로 파일 추가
          const formData = new FormData();
          formData.append('snapshot', file);

          snapshotMutation.mutate(formData);
        } catch (err) {
          console.error(err);
        }
      }

      setPreserveBuffer(false);
    });
  };

  const { data: snapshotList } = useQuery({
    queryKey: [queryKeys.SNAPSHOT_LIST],
    queryFn: () => getSnapshotList(),
    enabled: true,
  });

  const formattedSnapshots =
    snapshotList !== undefined
      ? snapshotList.snapshots?.map((snapshot: snapshots) => ({
          date: new Date(snapshot.createdAt).toLocaleDateString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }),
          image: snapshot.snapshotUrl,
        }))
      : [];

  // 파츠 적용/해제를 위한 mutation
  const partsOnoffMutation = useMutation({
    mutationFn: (parts_id: number) => patchPartsOnOff(parts_id),
    onSuccess: (response) => {
      const newCharacterUrl = response.characterUrl;
      setCharacterFileUrl(newCharacterUrl); // 캐릭터 URL 업데이트
      setMypageCharacterUrl(newCharacterUrl);
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
      setHasCoin(coin - item.price);
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

  // 셔플 아이콘 클릭 시 랜덤 애니메이션 선택
  const handleShuffleClick = () => {
    if (myCharacter.bodyTypeId === 5) {
      const animations: Array<'standing' | 'dancing' | 'waving'> = ['standing', 'dancing', 'waving'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      handleButtonClick(randomAnimation);
    } else {
      return;
    }
  };

  // 버튼 클릭 핸들러 - 선택된 애니메이션 업데이트
  const handleButtonClick = (type: 'standing' | 'dancing' | 'waving') => {
    const url = generateAnimationUrl(type);
    setMypageCharacterUrl(url); // 선택한 모델 URL로 업데이트
    setActiveAnimation(type); // 현재 선택된 애니메이션 저장
  };

  const mappedItems =
    partsList.partsList?.map((part: any) => {
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
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
          }}>
          <p>
            페이지 로딩 중 입니다. <br /> 잠시만 기다려주세요.
          </p>
        </div>
      }>
      <div className="myProfileContainer">
        <div className="profileSection">
          <div className="info">
            <p className="subtitle">{nickname}님</p>
            <Coin amount={coin} style="styled" />
          </div>

          <div className="characterAndSnapshot">
            <div className="character" ref={characterRef}>
              {mypageCharacterUrl ? (
                <CharacterCanvas glbUrl={mypageCharacterUrl} gender={gender} preserveDrawingBuffer={preserveBuffer} />
              ) : (
                <p>{nickname}님의 캐릭터를 불러오지 못했어요</p>
              )}
            </div>

            <div className="iconWrapper">
              <div className="navIcon">
                <img src={ShuffleIcon} alt="shuffle Icon" className="icon" onClick={handleShuffleClick} />
              </div>
              <div className="navIcon">
                <img src={CamerIcon} alt="camera Icon" className="icon" onClick={handleCaptureClick} />
              </div>
            </div>
          </div>
        </div>

        <div className="customSection">
          <p className="subtitle">커스텀</p>
          <div className="customBox">
            <CustomCategories
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              userCoin={coin}
              onPurchase={handlePurchase}
              onApply={handleApply}
              items={mappedItems.filter((item: any) => item.category === selectedTab)}
            />
          </div>
        </div>

        <div className="snapshotSection">
          <p className="subtitle">스냅샷</p>
          <p className="snapshotdDescript">카메라 버튼을 눌러 스냅샷을 남겨보세요</p>
          <div className="snapshotBox">{formattedSnapshots && <SnapshotList snapshots={formattedSnapshots} />}</div>
        </div>

        <GeneralButton buttonStyle={{ style: 'floating', size: 'small' }} className="logout">
          로그아웃
        </GeneralButton>
      </div>
    </Suspense>
  );
}
