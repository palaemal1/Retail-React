import Navbar from '@/components/Navbar';
import SidebarLayout from './SideBarLayout';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
    <>
      <Navbar />
      
      <SidebarLayout>
        <Outlet/>
      </SidebarLayout>
    </>
  );
}

export default MainLayout;
