import GeneralButton from "@/components/Button/GeneralButton";
import xCircle from '@/assets/svg/xCircle.svg';
import './BodyAddModal.scss'

interface BodyAddModalProps {
  onClose: () => void;
}

export default function BodyAddModal({ onClose }: BodyAddModalProps) {
    const handleComplete = () => {
        onClose()
      };

  return (
    <div className="bodyAddModal">
      <hr className='hr' />
        <img src={xCircle} alt="xCircle" className="xCircle" onClick={onClose} />
        <h2>체형 정보 입력</h2>
        <GeneralButton
            buttonStyle={{style: "floating", size: "semiTiny"}}
            onClick={handleComplete}>
        완료
        </GeneralButton>
    </div>
  );
}
