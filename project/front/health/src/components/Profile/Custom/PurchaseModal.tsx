import { useState } from 'react';
import XCircle from '@/assets/svg/xCircle.svg';
import Coin from '@/components/Coin/Coin';
import lockIcon from '@/assets/svg/lock.svg';
import GeneralButton from '@/components/Button/GeneralButton';
import './PurchaseModal.scss';

interface PurchaseModalProps {
  item: { price: number; image: string; isLocked: boolean };
  userCoin: number;
  onClose: () => void;
  onPurchaseSuccess: () => void;
}

export default function PurchaseModal({ item, userCoin, onClose, onPurchaseSuccess }: PurchaseModalProps) {
  const isPurchasable = userCoin >= item.price;
  const [errorMessage, setErrorMessage] = useState('');

  const handlePurchase = () => {
    if (isPurchasable) {
      onPurchaseSuccess(); // 구매 성공 시 콜백 호출
    } else {
      setErrorMessage('보유 코인이 부족합니다.');
    }
  };

  return (
    <div className="purchaseContainer">
      <div className="purchaseModal">
        <img src={XCircle} alt="xCircle" className="xCircle" onClick={onClose} />
        <p className="purchaseMent">아이템을 구매하시겠습니까?</p>
        <hr className="purchaseHr" />
        
        <div className="modalContent">
          <img src={lockIcon} alt="CustomItem" className="customItem" />
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <div className="costInfo">
            <div className="costItem">
              <p>구매비</p>
              <Coin amount={item.price} style="basic" />
            </div>
            <div className="costItem">
              <p>보유 코인</p>
              <Coin amount={userCoin} style="basic" />
            </div>
          </div>
        </div>

        <div className="purchaseButton">
          <GeneralButton
            buttonStyle={{ style: 'primary', size: 'select' }}
            onClick={handlePurchase}
            disabled={!isPurchasable}
          >
            구매
          </GeneralButton>
          <GeneralButton
            buttonStyle={{ style: 'customCancel', size: 'select' }}
            onClick={onClose}
          >
            취소
          </GeneralButton>
        </div>
      </div>
    </div>
  );
}
