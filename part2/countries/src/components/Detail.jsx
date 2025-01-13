import React, { useEffect, useState } from 'react'
import Typing from './Typing';

const Detail = ({ main , title , delay = 700 }) => {
    const [loaded , setLoaded] = useState(false);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setLoaded(true)
        },delay)

        return () => {
            clearTimeout(timer)
        }
    },[])
  return (
    <div className="vertical gap-1">
        <span className={`text-sm opacity-80 capitalize ${loaded ? '-mb-[.5rem]' : '-mb-[.5rem]'} `}>{title}</span>
        <div className='relative overflow-x-scroll no-scrollbar'>
            <p className={`font-parkinsans font-medium text-xl horizontal gap-3 ${!loaded ? 'opacity-0' : ''}  w-max *:w-max`}>{main}</p>
            {!loaded && <div className='bg-neutral-500/[.2] animate-pulse absolute abs-center-y w-full h-[170%] rounded-sm top-[1.8rem]'></div>}
        </div>
    </div>
  )
}

export default Detail