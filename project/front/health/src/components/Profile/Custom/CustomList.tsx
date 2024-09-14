import CustomItem from './customItem';
import './CustomList.scss';

interface CustomListProps {
  items: { category: string; price: number; isLocked: boolean; image: string }[];
  coinAmount: number;
}

export default function CustomList({ items, coinAmount }: CustomListProps) {
  return (
    <div className="customListContainer">
        <div className="customList">
        {items.map((item, index) => (
            <CustomItem key={index} item={item} coinAmount={coinAmount} />
        ))}
        </div>
    </div>
  );
}
