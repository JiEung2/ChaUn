import PredictionGraph from '@/components/Record/PredictionGraph';
import './BodyWeihtRecord.scss'

interface PredictionResultProps {
    data: { time: string; weight: number }[];
}
export default function PredictionResult({data}: PredictionResultProps) {

    return (
        <div className="predictionImages">
            <div className="predictionImage">
                <p>현재</p>
            </div>
            <div className="predictionImage">
                <p>1달 후</p>
            </div>
            <div className="predictionImage">
                <p>3달 후</p>
            </div>


            <div className="predictionGraph">
            <PredictionGraph data={data} />
            </div>
        </div>        
    )
}
