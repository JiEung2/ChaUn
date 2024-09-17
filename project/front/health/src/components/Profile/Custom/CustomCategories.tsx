import GeneralButton from '@/components/Button/GeneralButton';
import CustomList from './CustomList';
import './CustomCategories.scss';

interface CustomTabProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  userCoin: number;
  onPurchase: (item: any) => void;
  onApply: (item: any) => void;
  items: { category: string; price: number; isLocked: boolean; image: string }[];
}

export default function CustomCategories({ selectedTab, setSelectedTab, userCoin, onPurchase, onApply, items }: CustomTabProps) {
  const tabs = ['헤어', '상의', '하의', '아이템'];

  return (
    <div className="customCategoriesContainer">
      <div className="customTab">
        {tabs.map((tab) => (
          <GeneralButton
            buttonStyle={{ style: 'outlined', size: 'customTag' }}
            key={tab}
            className={selectedTab === tab ? 'active' : ''}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </GeneralButton>
        ))}
      </div>

      <div className="customList">
        <CustomList items={items} coinAmount={userCoin} onPurchase={onPurchase} onApply={onApply} />
      </div>
    </div>
  );
}
