import ExerciseCategories from "./ExerciseCategories";
import GeneralButton from "../Button/GeneralButton";
import './ExerciseModal.scss'

export default function ExerciseModal() {
    return (
        <div className="exerciseModal">
            <ExerciseCategories />
            <GeneralButton
                buttonStyle={{style: 'floating', size: 'semiTiny'}}>
                    완료
            </GeneralButton>        
        </div>
    )
}