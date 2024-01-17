import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserAuth } from '../context/AuthContext'


function navbar() {
  const {user,googleSignIn,logOut} =UserAuth();
  const [loading,setLoading] =useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleSignIn = async () => {
     try{
         await googleSignIn()
     }catch(error){
      console.log(error);
     }
  }
  const handleSignOut = async () => {
    try{
      await logOut()
    }catch(error){
       console.log(error)
    }
  }
  useEffect(() => {
    const checkAuthentication =async () =>{
      await new Promise((resolve) => setTimeout(resolve, 50))
      setLoading(false);
    }
    checkAuthentication();
  },[user])
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    // Function to handle screen size changes
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial mobile state
    handleResize();

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

 console.log(isMobile);
  return (
    <div className='h-16 w-full p-4 flex border-b-2 items-center justify-between font-medium'>
      <h1 className="text-xl">News Articles</h1>
      <ul className='flex'>
        <li className='p-2'><Link href='/'>Home</Link></li>
        {user ? (<li className='p-2'><Link href='/Liked'>Liked</Link></li>) : (<></>)}
        
      </ul>
      {loading ? (
        <div className='p-2'></div>
      ) : !user ? (
        isMobile ? (
          // Render menu image for mobile
          <>
            <img
              src='/menu.png'
              alt='menu'
              className='h-8 w-8 cursor-pointer'
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <ul className='flex flex-col absolute bg-white p-2 mt-2 rounded'>
                <li className='cursor-pointer' onClick={handleSignIn}>
                  Login
                </li>
                <li className='cursor-pointer' onClick={handleSignIn}>
                  Signup
                </li>
              </ul>
            )}
          </>
        ) : (
          <ul className='flex'>
            <li className='p-2 cursor-pointer' onClick={handleSignIn}>
              Login
            </li>
            <li className='p-2 cursor-pointer' onClick={handleSignIn}>
              Signup
            </li>
          </ul>
        )
      ) : (

        isMobile ? (
          // Render menu image for mobile
          <>
            <img
              src='/menu.png'
              alt='menu'
              className='h-8 w-8 cursor-pointer'
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <ul className='flex'>
                 <img src={user.photoURL} alt='user' className='h-8 w-8 rounded-full m-2' />
                 <p className='cursor-pointer m-3' onClick={handleSignOut}>
                   Log Out
                 </p>
               </ul>
            )}
          </>
        ) : (
          <div className='flex'>
          <img src={user.photoURL} alt='user' className='h-8 w-8 rounded-full m-2' />
          <p className='cursor-pointer m-3' onClick={handleSignOut}>
            Log Out
          </p>
        </div>
        )
      )}
     
    </div>
  )
}

export default navbar
