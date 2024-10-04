import coinIcon from '@/assets/svg/coin.svg';
import './Coin.scss';

interface CoinProps {
  amount: number;
  style?: 'basic' | 'styled';
  width?: string;
  height?: string;
}

export default function Coin({ amount, style = 'basic', width = 'auto', height = 'auto' }: CoinProps) {
  return (
    <div className={`coinContainer ${style}`} style={{ width, height }}>
      <img src={coinIcon} alt="coin" className="coinIcon" />
      <span className="coinAmount">{amount}</span>
    </div>
  );
}
