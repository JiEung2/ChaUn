import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';
import { Outlet } from 'react-router-dom'; // Outlet 추가

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <main className="outlet">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
