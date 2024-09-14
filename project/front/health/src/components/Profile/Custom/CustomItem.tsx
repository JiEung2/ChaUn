import { useState } from 'react';
import lockIcon from '@/assets/svg/lock.svg';
import './CustomItem.scss';
import PurchaseModal from './PurchaseModal';
import Coin from '@/components/Coin/Coin';

interface CustomItemProps {
  item: { category: string; price: number; isLocked: boolean; image: string };
  coinAmount: number;
  onPurchase: (item: any) => void;
}

export default function CustomItem({ item, coinAmount, onPurchase }: CustomItemProps) {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = () => {
    setShowModal(true);
  };

  const handlePurchaseSuccess = () => {
    onPurchase(item);
    setShowModal(false);
  };

  return (
    <div className="customItemContainer">
      <div className="customItem" onClick={handleItemClick}>
        <img
          src={item.isLocked ? lockIcon : item.image}
          alt="CustomItem"
          className={`itemImage ${item.isLocked ? 'locked' : 'purchasable'}`}
        />
      </div>
      <div>
        <Coin amount={item.price} style="basic" />
      </div>
      {showModal && (
        <PurchaseModal
          item={item}
          userCoin={coinAmount}
          onClose={() => setShowModal(false)}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      )}
    </div>
  );
}
