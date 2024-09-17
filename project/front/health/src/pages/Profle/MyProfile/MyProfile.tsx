import { useRef, useState } from 'react';
import Coin from '@/components/Coin/Coin';
import GeneralButton from '@/components/Button/GeneralButton';
import MyModel from '@/assets/image/model.png';
import CustomItem from '@/assets/image/customItem.jpg';
import CustomCategories from '@/components/Profile/Custom/CustomCategories';
import html2canvas from 'html2canvas';
import './MyProfile.scss';

export default function MyProfilePage() {
    const characterRef = useRef<HTMLImageElement | null>(null);
    const [selectedTab, setSelectedTab] = useState('헤어');
    const [userCoin, setUserCoin] = useState(1000);
    const [items, setItems] = useState([
        { id: 1, category: '헤어', price: 100, isLocked: true, image: CustomItem, isApplied: false },
        { id: 2, category: '헤어', price: 120, isLocked: true, image: CustomItem, isApplied: false },
        { id: 3, category: '헤어', price: 150, isLocked: true, image: CustomItem, isApplied: false },
        { id: 4, category: '헤어', price: 1020, isLocked: true, image: CustomItem, isApplied: false },
        { id: 5, category: '상의', price: 120, isLocked: true, image: CustomItem, isApplied: false },
        // 추가 아이템 ...
    ]);
    const [appliedItem, setAppliedItem] = useState<string | null>(null);

    // 스냅샷을 캡처하고 다운로드하는 함수
    const handleSnapshot = () => {
        if (characterRef.current) {
            html2canvas(characterRef.current, { scale: 2 }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'snapshot.png';
                link.click();
            });
        }
    };

    // 아이템 구매 성공 시 호출되는 함수
    const handlePurchaseSuccess = (updatedItem: any) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedItem.id ? { ...item, isLocked: false } : item
            )
        );
        setUserCoin((prevCoin) => prevCoin - updatedItem.price);
    };

    // 아이템 클릭 시 캐릭터에 적용 또는 해제하는 함수
    const handleApplyItem = (item: any) => {
        if (item.isApplied) {
            setItems((prevItems) =>
                prevItems.map((i) =>
                    i.id === item.id ? { ...i, isApplied: false } : i
                )
            );
            setAppliedItem(null);
        } else {
            setItems((prevItems) =>
                prevItems.map((i) =>
                    i.id === item.id ? { ...i, isApplied: true } : { ...i, isApplied: false }
                )
            );
            setAppliedItem(item.image);
        }
    };

    return (
        <div className="myProfileContainer">
            <div className="profileSection">
                <div className="info">
                    <p className="subtitle">nickname 님</p>
                    <Coin amount={userCoin} style="styled" />
                </div>

                <div className="character">
                    <img src={appliedItem || MyModel} alt="myModel" ref={characterRef} />
                    <GeneralButton
                        buttonStyle={{ style: 'primary', size: 'check' }}
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
                        onPurchase={handlePurchaseSuccess}
                        onApply={handleApplyItem}
                        items={items.filter(item => item.category === selectedTab)}
                    />
                </div>
            </div>

            <div className="snapshotSection">
                <p className="subtitle">스냅샷</p>
            </div>

            <div>
                <GeneralButton
                    buttonStyle={{style: "floating", size: "large"}}
                    className="logout">
                    로그아웃
                </GeneralButton>
            </div>
        </div>
    );
}
