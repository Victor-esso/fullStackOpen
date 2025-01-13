import Detail from "./Detail"
import * as func from "../assets/functions";
import MultiTyping from "./MultiTyping";
import { useEffect, useState } from "react";
import CountrySuggestion from "./CountrySuggestion";
import { Icon } from "@iconify/react";
import BtnLink from "./BtnLink";
import countryServices from '../services/country'
import Weather from "./Weather";

const BigCard = ({selected ,setSelected, allCountries}) => {
    let delay = {value:0};
    const [typingIndex, setTypingIndex] = useState(0);
    const [borders , setBorders ] = useState( [] )
    const [names , setNames] = useState( [selected.name.common , selected.name.official])
    const [time, setTime] = useState('');
    const [weather , setWeather] = useState(null);

    useEffect( () => {

        if(selected && selected?.borders?.length){
            setBorders(selected.borders.map(code => func.getCountryByCode(allCountries, code)))
        }else{
            setBorders( [] )
        }

        const calculateTime = () => {
            setTime(func.getCurrentTimeByCode(allCountries , selected.cca3));
        }

        calculateTime();

        const intervalId = setInterval(calculateTime, 1000);
        return () => clearInterval(intervalId);

    },[selected])

    useEffect( () => {
        
        const timer =  setTimeout( () => func.runTippy(),150);

        if(selected){
            // get weather details
            const weatherRequest = countryServices.weather(selected.latlng[0],selected.latlng[1])
            weatherRequest.then(data => {
                setWeather(data);
                const timer =  setTimeout( () => func.runTippy(),150);
                return()=>{
                    clearTimeout(timer)
                }
            })
        }else{
            setWeather(null)
        }


        return  () => {
            clearTimeout(timer);
        }
    } , [selected])

   

  return (
    <div className="w-full h-100dvh max-h-[auto] inset-0  z-0 lg:grid-center  no-select">
          <div className=" max-lg:pt-[calc(70px+2rem)] w-full max-lg:h-100dvh lg:w-[900px] lg:aspect-[1/.6] bg-white lg:rounded-3xl border border-solid border-neutral-300/[.8] vertical lg:horizontal relative p-3 lg:overflow-hidden max-lg:overflow-x-hidden" >
            {/* Absolutes */}
            <img src={selected.coatOfArms.svg} alt="" className="w-[600px] absolute lg:-right-[10%] lg:top-[15%] max-lg:abs-center-y max-lg:-right-[30%] opacity-20 no-select" />
            <span className="absolute text-[13rem] font-bold opacity-[.07] -left-[2%] -bottom-[5%] leading-[80%] no-select">{selected.cca3}</span>

            <div className="w-full lg:h-full lg:py-5 lg:px-4 vertical lg:justify-between max-md:gap-16  z-20" >

                <div className="horizontal max-md:vertical gap-3 items-center">
                    <img src={selected.flags.svg} alt="" className="h-[40px] shadow-lg rounded-md" />
                    <div className="vertical gap-2">
                        <h2 className="font-parkinsans font-medium leading-[210%] horizontal items-center gap-2">
                            <span className="text-[2rem]">
                            {(typingIndex >= 0) && (
                                <MultiTyping
                                stringsArray={names} // Pass the array of strings
                                typingIndex={typingIndex} // Pass the current index
                                setTypingIndex={setTypingIndex} // Pass the function to update the index
                                speed={30} // Speed of typing
                                waitUntilVisible={true} // Wait until visible to start typing
                                />
                            )}
                            </span>
                        </h2>
                        <div className="opacity-80 -mt-2">
                            {(typingIndex >= 1) && (
                            <MultiTyping
                                stringsArray={names} // Pass the array of strings
                                typingIndex={typingIndex} // Pass the current index
                                setTypingIndex={setTypingIndex} // Pass the function to update the index
                                speed={10} // Speed of typing
                                waitUntilVisible={true} // Wait until visible to start typing
                            />
                            )}
                        </div>
                    </div>
                </div>

                <div className="vertical gap-3">
                    {weather && <Weather weather={weather} />}
                    <div className="horizontal gap-6">
                        <Detail 
                            title={`Continent${selected.continents.length > 1 ? `s (${selected.continents.length})` : ''}`} 
                            main={selected.continents.map((state , i) => <span key={i}>{state}</span>)}
                            delay={func.plus(delay,1000)}
                        />
                        {selected.subregion && 
                        <Detail 
                            title={`subregion`} 
                            main={selected.subregion}
                            delay={func.plus(delay,200)}
                        />}
                    </div>
                    <Detail 
                        title={`Capital${selected?.capital?.length > 1 ? `s (${selected.capital.length})` : ''}`} 
                        main={selected.capital?.map((state , i) => <span key={i} className="after:content-[','] last:after:content-none">{state}</span>) || '-'}
                        delay={func.plus(delay,200)}
                    />
                    <Detail 
                        title={`currency${Object.entries(selected.currencies).length > 1 ? `s (${Object.entries(selected.currencies).length})` : ''}`} 
                        main={

                            Object.entries(selected.currencies).map(([key , value]) => 
                                <span className="horizontal gap-2 after:content-[','] last:after:content-none" key={key}>
                                    <span>{value.symbol}</span>
                                    <span className="capitalize">{`${value.name}(${key})`}</span>
                                </span>
                            )
                        }
                        delay={func.plus(delay,200)}
                    />
                    <div className="horizontal gap-6">
                        <Detail 
                            title={`Area`} 
                            main={selected.area.toLocaleString('en-US')}
                            delay={func.plus(delay,200)}
                        />
                        <Detail 
                            title={`population`} 
                            main={selected.population.toLocaleString('en-US')}
                            delay={func.plus(delay,100)}
                        />
                        
                    </div>
                    {/* Date-time */}
                    <div className="absolute top-5 max-lg:top-[calc(70px+2rem)] right-4 vertical items-end w-max h-max">
                        <span className="font-bold lg:text-[4rem] max-lg:text-xl opacity-20">{time.split(', ')[2]}</span>
                        <span className="font-bold lg:text-[2rem] max-lg:text-sm max-lg:-mt-1 lg:-mt-7 opacity-20 ">{`${time.split(', ')[0]}, ${time.split(', ')[1]}`}</span>
                    </div>

                    

                    {/* MAPS */}
                    <div className="w-max h-max lg:absolute right-4 bottom-5 horizontal gap-2 max-sm:pt-6">
                        
                        <div className="horizontal gap-2">
                            <BtnLink href={selected.maps.googleMaps} title="Google Maps">
                                <Icon icon="tabler:map-share"  />
                                <span className="font-medium capitalize ">Map</span>
                            </BtnLink>

                            <BtnLink href={selected.maps.openStreetMaps} title="Open Street Maps">
                                <Icon icon="fa6-solid:street-view" />
                                <span className="font-medium capitalize ">street</span>
                            </BtnLink>
                        </div>
                    </div>

                    
                        
                    
                </div>

                <div className="mask-left overflow-x-scroll no-scrollbar lg:w-[60%] w-full py-2 [&:has(>div>button:first-child:hover)]:pl-2 first transition-all [&:has(>div>button:hover)>div>button:is(:hover)]:px-4 ">
                    <div className="horizontal pr-16 w-max gap-0 *:px-2 [&:has(>button:hover)>button:not(:hover)]:opacity-20 [&:has(>button:hover)>button:not(:hover)]:blur-[.03rem] [&:has(>button:hover)>button:not(:hover)]:grayscale">
                      {borders.map((border, i) => <CountrySuggestion key={i} country={border} setSelected={setSelected}/>)} 
                    </div>
                </div>

            </div>

        

          </div>
      </div>
  )
}

export default BigCard


