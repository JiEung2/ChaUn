import coinIcon from '@/assets/svg/coin.svg';
import './Coin.scss';

interface CoinProps {
  amount: number;
  style?: 'basic' | 'styled';
}

export default function Coin({ amount, style = 'basic' }: CoinProps) {
  return (
    <div className={`coinContainer ${style}`}>
      <img src={coinIcon} alt="coin" className="coinIcon" />
      <span className="coinAmount">{amount}</span>
    </div>
  );
}
