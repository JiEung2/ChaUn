import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function CommonLayout() {
  return (
    <div>
      <Header />
      <main className="outletPadding">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
