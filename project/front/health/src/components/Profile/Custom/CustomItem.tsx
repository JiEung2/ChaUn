import { useState } from 'react';
import lockIcon from '@/assets/svg/lock.svg';
import './CustomItem.scss';
import PurchaseModal from './PurchaseModal';
import Coin from '@/components/Coin/Coin';

interface CustomItemProps {
  item: { category: string; price: number; isLocked: boolean; image: string };
  coinAmount: number;
  onPurchase: (item: any) => void;
  onApply: (item: any) => void;
}

export default function CustomItem({ item, coinAmount, onPurchase, onApply }: CustomItemProps) {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = () => {
    if (!item.isLocked) {
      onApply(item);
    } else {
      setShowModal(true);
    }
  };

  const handlePurchaseSuccess = () => {
    onPurchase(item);
    setShowModal(false);
  };

  return (
    <div className="customItemContainer">
      <div className="customItem" onClick={handleItemClick}>
        <img
          src={item.image}
          alt="CustomItem"
          className={`itemImage ${item.isLocked ? 'blurred' : ''}`}
        />
        {item.isLocked && (
          <img src={lockIcon} alt="LockIcon" className="lockIcon" />
        )}
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
