import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom'; // Outlet 추가

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <main className="outlet">
        <Outlet />
      </main>
    </div>
  );
}
