import ExerciseItem from './ExerciseItem';
import './ExerciseList.scss';

interface ExerciseListProps {
  title: string;
  items: { id: number; name: string }[];
  selectedItems: { id: number; name: string }[];
  onSelect: (items: { id: number; name: string }[]) => void;
  multiple?: boolean;
}

export default function ExerciseList({ title, items, selectedItems, onSelect, multiple = false }: ExerciseListProps) {
  const handleItemClick = (item: { id: number; name: string }) => {
    if (multiple) {
      if (selectedItems.find((selected) => selected.id === item.id)) {
        onSelect(selectedItems.filter((selected) => selected.id !== item.id));
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
            key={item.id}
            label={item.name}
            selected={!!selectedItems.find((selected) => selected.id === item.id)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
}
