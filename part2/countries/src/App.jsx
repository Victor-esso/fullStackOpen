import { useEffect, useState } from "react"
import countryServices from './services/country'
import Header from "./components/Header";
import BigCard from "./components/BigCard";
import * as func from "./assets/functions";
import BigCardSpirit from "./components/BigCardSpirit";
import tippy, {animateFill} from 'tippy.js';

function App() {

  const [ allCountries , setAllCountries] = useState( [] );
  const [ search , setSearch ] = useState( '' );
  const [ selected , setSelected ] = useState( null );
  const [ suggestions , setSuggestions ] = useState ( [] );


  useEffect( () => {
    countryServices.all().then( data => {
      setAllCountries(data)
    } )
  },[]);





  


  useEffect( () => {

    // filtering through the searched countries
    const filtered = allCountries.filter( country => {
      return search.trim().length >= 1 && ( country.name.common.toLowerCase().trim().includes( search.toLowerCase().trim() ) || country.cca3.toLowerCase().trim().includes( search.toLowerCase().trim() ) || country.name.official.toLowerCase().trim().includes( search.toLowerCase().trim() ))
    })

    // Making sure its only  a maximum of 10 and minimum of 1 suggestion is available
    if( filtered.length <= 100 && filtered.length > 0 ){
      setSuggestions( filtered );
    }else{
      setSuggestions( [] )
    }
    
  }, [ search , allCountries ] )


  return (
    <section className="w-full h-full min-h-[100dvh] bg-[#e8e8ee]  vertical *:w-full">
      
      <Header 
        suggestions={suggestions}
        search={search}
        setSearch={setSearch}
        selected={selected}
        setSelected={setSelected}
      />

    {(selected && !search.length) ?  
      <BigCard selected={selected} setSelected={setSelected} allCountries={allCountries} /> 
      : 
      <BigCardSpirit />
    }
    
      

    </section>
  )
}

export default App
