import React from 'react'

const CountrySuggestion = ({country , setSelected}) => {
    const handleClick = () =>{
        setSelected(null)
        setTimeout(()=>{setSelected(country)},50)
    }
  return (
    <button className='horizontal items-center gap-1 hover:scale-[1.3] transition-all' onClick={()=> handleClick()} data-tippy-content={country.name.common}>
        <div className='w-[20px] h-[20px] rounded-full bg-neutral-600/30 overflow-hidden'>
            <img src={country.flags.svg} alt="" className='w-full h-full object-cover' />
        </div>
        <span className='text-sm font-medium opacity-80'>{country.cca3}</span>
    </button>
  )
}

export default CountrySuggestion