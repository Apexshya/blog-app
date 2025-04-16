'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    setIsClient(true);      
    checkLogin();          
    window.addEventListener('authChanged', checkLogin); 

    return () => window.removeEventListener('authChanged', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');

    window.dispatchEvent(new Event('authChanged'));

    router.push('/login');
  };

  if (!isClient) return null; 
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">📝 Blog App</h1>
      <ul className="flex gap-6 items-center">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link href="/signup" className="hover:underline">Signup</Link></li>
            <li><Link href="/login" className="hover:underline">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/blogs" className="hover:underline">Blogs</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
