import CustomItem from './CustomItem';
import './CustomList.scss';

interface CustomListProps {
  items: { category: string; price: number; isLocked: boolean; image: string }[];
  coinAmount: number;
  onPurchase: (item: any) => void;
  onApply: (item: any) => void;
}

export default function CustomList({ items, coinAmount, onPurchase, onApply }: CustomListProps) {
  return (
    <div className="customListContainer">
        <div className="customList">
        {items.map((item, index) => (
            <CustomItem key={index} item={item} coinAmount={coinAmount} onPurchase={onPurchase} onApply={onApply} />
        ))}
        </div>
    </div>
  );
}
