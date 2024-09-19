import Coin from '@/components/Coin/Coin'
import './MyProfile.scss';


export default function MyProfilePage() {
    return (
        <div className="myProfileContainer">
            <Coin amount={1290} style="styled" />
            <Coin amount={120} style="basic" />
        </div>
    )
}
