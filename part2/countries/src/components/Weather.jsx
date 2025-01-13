import countryServices from '../services/country'
import * as func from "../assets/functions";
import { Icon } from "@iconify/react";

const Weather = ({weather}) => {
  return (
    <div className='horizontal max-sm:vertical bg-white gap-3 py-2 px-3 pr-2  rounded-xl shadow-2xl w-max overflow-hidden relative animate-breaths [animation-delay:.2s] mb-4'>
        <span className='text-sm opacity-50 '>Weather</span>

      <div className='horizontal gap-3 items-stretch'>
        <div className='horizontal hover:bg-neutral-400/50 py-2 pr-3 pl-2 rounded-lg cursor-pointer transition-all' data-tippy-content={func.ucWords(weather?.weather[0].description)}>
          <div>
              <img src={countryServices.weatherIcon(weather?.weather[0].icon)} alt="" className='-my-[25px] -mx-[10px] animate-breath' />
          </div>
          <div className='vertical items-start -ml-2'>
            <span className='font-medium '>{func.kelvinToCelsius(weather?.main.temp)} &deg;C</span>
            <span className='text-[.7rem] -mt-[.35rem] opacity-70'>{weather?.weather[0].main}</span>
          </div>
        </div>

        <div className='horizontal gap-2 items-center hover:bg-neutral-400/50  rounded-lg cursor-pointer transition-all px-2' data-tippy-content={`Speed : <strong>${weather?.wind.speed}m/s</strong> | Direction : <strong>${weather?.wind.deg}deg </strong>`}>
          <div className={`rotate-[${weather?.wind.deg}deg]`} style={{
            transform:`rotate(${weather?.wind.deg}deg)`
          }}>
            <div className='animate-backward'>
              <Icon icon="solar:wind-line-duotone" className='text-3xl animate-pulse' />
            </div>
          </div>
          <div className='vertical items-start'>
              <span className='font-medium'>{weather?.wind.speed} m/s</span>
              <span className='text-[.7rem] -mt-[.35rem] opacity-70'>Wind</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather