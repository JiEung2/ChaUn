import { useParams } from 'react-router-dom';
export default function Profile() {
  const { userId } = useParams();
  //TODO - userId로 사용자 데이터 가져오기
  return <div>프로필</div>;
}
