import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-[100vh] bg-forest-green">
      <div className="flex flex-col md:flex-row pt-36 pb-20 max-w-screen m-auto">
          <div className='w-full flex justify-center flex-col sm:text-lg md: text-lg lg:text-2xl  items-center bg-beige '>
            <h1>Oops</h1>
            <h1>No products found</h1>
            <h1>Please find our Homepage</h1>
            <h1> 
            <Link to={'/'} >
              <span className='hover:text-light-green'>Click Here</span>
            </Link>
            </h1>
          </div>
          <div>
            <img src={'/img/PageNotFound.jpg'} className="w-full relative"></img>
          </div>
      </div>
    </div>
  );
};

export default PageNotFound;