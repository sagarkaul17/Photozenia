import React from 'react';
import loading from '../assets/loading.gif';

const Loader = () => {
  return (
    <div className='flex justify-center'>
        <img src={loading} alt="Loading..." height={200} width={200}/>
    </div>
  )
}

export default Loader