import { useRef, useState } from 'react';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '@/components/Button/GeneralButton';
import MyModel from '@/assets/image/model.png';
import CustomCategories from '@/components/Profile/Custom/CustomCategories';
import html2canvas from 'html2canvas';
import './MyProfile.scss';

export default function MyProfilePage() {
    const characterRef = useRef<HTMLDivElement | null>(null);
    const [selectedTab, setSelectedTab] = useState('헤어');
    const userCoin = 120;

    // 스냅샷을 캡처하고 다운로드하는 함수
    const handleSnapshot = () => {
        if (characterRef.current) {
            html2canvas(characterRef.current).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png'); // 캡처된 이미지를 PNG 형식으로 변환
                link.download = 'snapshot.png'; // 다운로드할 파일 이름 설정
                link.click();

                // API 연결시킬 때 추가 로직 생성 가능
            });
        }
    };

    return (
        <div className="myProfileContainer">
            <div className="profileSection">
                <div className="info">
                    <p className="subtitle">nickname 님</p>
                    <Coin amount={userCoin} style="styled" />                    
                </div>

                <div className="character" ref={characterRef}>
                    <img src={MyModel} alt="myModel" />
                    <GeneralButton
                        buttonStyle={{ style: "primary", size: "check" }}
                        className="snapshotButton"
                        onClick={handleSnapshot}
                    >
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
                        userCoin={userCoin}
                    />
                </div>
            </div>

            <div className="snapshotSection">
                <p className="subtitle">스냅샷</p>
            </div>
        </div>
    );
}
