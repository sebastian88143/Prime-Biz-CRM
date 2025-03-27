import Navbar from './Navbar';

import React from 'react';

const MainLayout = ({ children, setToken, setIsAuthenticated }) => {
  return (
    <>
      <Navbar setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
      <div className="content">{children}</div>
    </>
  );
};

export default MainLayout;