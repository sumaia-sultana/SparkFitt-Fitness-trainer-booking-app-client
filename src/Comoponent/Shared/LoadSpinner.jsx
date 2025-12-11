import React from 'react';
import { PacmanLoader } from 'react-spinners';

const LoadSpinner = ({smallHeight}) => {
    return (
         <div
      className={`${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex flex-col justify-center items-center `}>
      <PacmanLoader size={30} color='#2596be' />
    </div>
    );
};

export default LoadSpinner;