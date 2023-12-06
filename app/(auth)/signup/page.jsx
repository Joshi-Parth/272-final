'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link'

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SignUp() {

  const router = useRouter();
  const [userId, setUserId] = useState(null); // Store the userId state

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Event handlers
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // console.log(username);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };

  const handleRegister = async (event) => {

    event.preventDefault();
    try {
      const response = await fetch('https://playpal-77a0c2e5e469.herokuapp.com/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
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
  
      // const data = await response.json();
      // console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error('Error during login:', error.message);
      // if (error.response && error.response.text) {
      //   console.log('Response text:', error.response.text);
      // }
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Username <span className="text-red-600">*</span></label>
                  <input onChange={handleUsernameChange} id="full-name" type="text" className="form-input w-full text-gray-300" placeholder="Username" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                  <input onChange={handleEmailChange} id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@gmail.com" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input onChange={handlePasswordChange} id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div onClick={handleRegister} className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Already using Global Marketplace? <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
