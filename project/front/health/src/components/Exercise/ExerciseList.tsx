import ExerciseItem from './ExerciseItem';
import './ExerciseList.scss';
import { useState } from 'react'
interface ExerciseListProps {
  title: string;
  items: string[];
}

export default function ExerciseList({ title, items }: ExerciseListProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="exerciseList">
      <p className="listTitle">{title}</p>
      <div className="itemContainer">
        {items.map((item) => (
          <ExerciseItem
            key={item}
            label={item}
            selected={selectedItems.includes(item)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
}