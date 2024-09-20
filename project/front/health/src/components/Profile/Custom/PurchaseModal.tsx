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

  const handlePurchase = () => {
    if (isPurchasable) {
      onPurchaseSuccess();
    } 
  };

  return (
    <div className="purchaseContainer">
      <div className="purchaseModal">
        <img src={XCircle} alt="xCircle" className="xCircle" onClick={onClose} />
        <p className="purchaseMent">아이템을 구매하시겠습니까?</p>
        <hr className="purchaseHr" />
        
        <div className="modalContent">
          <div className="customItemContainer">
            <img src={item.image} alt="CustomItem" className="customItemImage blurred" />
            <img src={lockIcon} alt="LockIcon" className="lockIcon" />
          </div>
          {isPurchasable ? '' : <span className="errorMessage">보유 코인이 부족합니다.</span>}
          <div className="costInfo">
            <div className="cost">
              <p>구매비</p>
              <Coin amount={item.price} style="basic" />
            </div>
            <div className="cost">
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
            className="purchase"
          >
            구매
          </GeneralButton>
          <GeneralButton
            buttonStyle={{ style: 'primary', size: 'select' }}
            onClick={onClose}
            className="cancel"
          >
            취소
          </GeneralButton>
        </div>
      </div>
    </div>
  );
}
