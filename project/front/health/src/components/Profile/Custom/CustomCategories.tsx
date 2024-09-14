import { useEffect, useState } from 'react';
import GeneralButton from '@/components/Button/GeneralButton';
import CustomList from './CustomList';
import './CustomCategories.scss';

interface CustomTabProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  userCoin: number;
}

const items = [
  { category: '헤어', price: 120, isLocked: true, image: '@/asset/image/model.png' },
  { category: '헤어', price: 150, isLocked: true, image: '/path/to/image2.png' },
  { category: '헤어', price: 180, isLocked: false, image: '/path/to/image3.png' },
  { category: '헤어', price: 180, isLocked: false, image: '/path/to/image3.png' },
  { category: '헤어', price: 180, isLocked: false, image: '/path/to/image3.png' },
  { category: '하의', price: 200, isLocked: true, image: '/path/to/image4.png' },
  { category: '하의', price: 200, isLocked: true, image: '/path/to/image4.png' },
  { category: '하의', price: 200, isLocked: true, image: '/path/to/image4.png' },
];

export default function CustomCategories({ selectedTab, setSelectedTab, userCoin }: CustomTabProps) {
  const tabs = ['헤어', '상의', '하의', '아이템'];
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const filtered = items.filter((item) => item.category === selectedTab);
    setFilteredItems(filtered);
  }, [selectedTab]);

  return (
    <div className="customCategorisContainer">
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
        <CustomList items={filteredItems} coinAmount={userCoin} />        
      </div>

    </div>
  );
}
