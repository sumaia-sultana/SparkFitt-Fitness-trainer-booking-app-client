import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh] text-center'>

            <h1 className='text-8xl text-gray-400 font-bold'>404</h1>

           <h1 className='text-3xl text-[#3624bf] font-bold'>Page not found!</h1>
            <div className='flex justify-center'>
                <img 
                    className='size-72' 
                    src='/src/assets/error.jpg' 
                    alt='404 Error' 
                />
            </div>
            <p className='text-gray-500 pb-3'>Opps!! No Content Found With the route.</p>
            <Link to="/" className="btn bg-[#3624bf] text-white px-2 py-1.5 rounded"> Back To Home</Link>
        </div>
    );
};

export default ErrorPage;