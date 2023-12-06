// pages/UserActivityPage.js
'use client';

import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

const UserActivityPage = () => {
  const [pageVisits, setPageVisits] = useState([]);

  useEffect(() => {
    // Fetch the page_visits cookie
    const { page_visits } = parseCookies();

    if (page_visits) {
      // Parse the cookie value (assumed to be a JSON array)
      const parsedPageVisits = JSON.parse(page_visits);
      setPageVisits(parsedPageVisits);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <h1>User Activity</h1> */}
      <p>Page Visits:</p>
      <ul>
        {pageVisits.map((visit, index) => (
          <li key={index}>{visit}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivityPage;
