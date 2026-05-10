import React from 'react';
import { PacmanLoader } from 'react-spinners';

const LoadSpinner = ({smallHeight}) => {
    return (
         <div
      className={`${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex flex-col justify-center items-center `}>
      <PacmanLoader size={30} color='#6366f1' />
    </div>
    );
};

export default LoadSpinner;