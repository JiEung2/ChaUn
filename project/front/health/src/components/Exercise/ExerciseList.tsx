import ExerciseItem from './ExerciseItem';
import './ExerciseList.scss';

interface ExerciseListProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onSelect: (items: string[]) => void;
  multiple?: boolean;
}

export default function ExerciseList({ title, items, selectedItems, onSelect, multiple = false }: ExerciseListProps) {
  const handleItemClick = (item: string) => {
    if (multiple) {
      if (selectedItems.includes(item)) {
        onSelect(selectedItems.filter((selected) => selected !== item));
      } else {
        onSelect([...selectedItems, item]);
      }
    } else {
      onSelect([item]);
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
