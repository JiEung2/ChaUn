import PredictionGraph from '@/components/Record/PredictionGraph';
import './BodyWeihtRecord.scss'

interface BodyWeightRecordProps {
    data: { time: string; weight: number }[];
}
export default function BodyWeightRecord({data}: BodyWeightRecordProps) {

    return (
        <div className="prediction">
            <div className="predictionCard">
                <div className="predictionImage">
                    <div className="predictionImage1">
                        {/* <img src="" alt="" /> */}
                    </div>
                    <p className="time">현재</p>
                </div>

                <div className="predictionImage">
                    <div className="predictionImage2">
                        {/* <img src="" alt="" /> */}
                    </div>
                    <p className="time">1달 후</p>
                </div>
                <div className="predictionImage">
                    <div className="predictionImage3">
                        {/* <img src="" alt="" /> */}
                    </div>
                    <p className="time">3달 후</p>
                </div>
            </div>  


            <div className="predictionGraph">
            <PredictionGraph data={data} />
            </div>
        </div>        
    )
}
