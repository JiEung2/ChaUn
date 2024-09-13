import GeneralButton from '../Button/GeneralButton';
interface FourProps {
  finishServey: () => void;
  handlePrev: () => void;
}
export default function Four({ finishServey, handlePrev }: FourProps) {
  return (
    <div>
      <GeneralButton buttonStyle={{ style: 'semiOutlined', size: 'tiny' }} onClick={handlePrev}>
        이전
      </GeneralButton>
      <GeneralButton buttonStyle={{ style: 'semiPrimary', size: 'tiny' }} onClick={finishServey}>
        완료
      </GeneralButton>
    </div>
  );
}
