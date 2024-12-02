import { NavLink } from "react-router-dom"
import logo from '../assets/image/logo.png';
import { useAuth } from "@/hooks"
const Navbar = () => {
  const {userLogout}=useAuth();
  const useLogout=()=>{
    userLogout();
  }
  return (
    <nav className='bg-gray-800 border-b fixed top-0 w-full z-50 border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                Pearl Center
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className='bg-black text-white hover:bg-lime-500 hover:text-white rounded-md px-3 py-2'>
                  Home
                </NavLink>
                <NavLink to='/' className='bg-black text-white hover:bg-lime-500 hover:text-white rounded-md px-3 py-2'>
                  Blog
                </NavLink>
                <button  onClick={()=>useLogout} className='bg-black text-white hover:bg-lime-500 hover:text-white rounded-md px-3 py-2'>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar