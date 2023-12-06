'use client';

import { useEffect, useState } from 'react';


import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SignIn() {

  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Event handlers
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // console.log(email)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log(password)
  };

  const handleLogin = async (event) => {

    event.preventDefault();
    try {
      const response = await fetch('https://playpal-77a0c2e5e469.herokuapp.com/signin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { userId } = data;
  
        // Set cookies after successful login or registration
        Cookies.set('user_tracking', userId);
        Cookies.set('page_visits', JSON.stringify([]));
  
        // Set the userId state for other components to access if needed
        setUserId(userId);
  
        // Redirect to the landing page
        router.push('/');
      }
  
      // if (!response.ok) {
      //   throw new Error('Login failed');
      // } // Handle the response data as needed
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Username</label>
                  <input onChange={handleUsernameChange} id="email" type="username" className="form-input w-full text-gray-300" placeholder="Your name" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input onChange={handlePasswordChange}id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div  className="flex flex-wrap -mx-3 mt-6">
                <div onClick={handleLogin} className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
