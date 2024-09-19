import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';
import './CommonLayout.scss';
import { Outlet } from 'react-router-dom';

export default function CommonLayout() {
  return (
    <div>
      <Header />
<<<<<<< HEAD
      <main className="outlet">
=======
      <main className='outletPadding'>
>>>>>>> 9f7a2d30aaae4e68636ef103065769c5486013b4
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
