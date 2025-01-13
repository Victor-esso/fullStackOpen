import SearchList from "./SearchList"

const Header = ({ suggestions , search , setSearch , setSelected , selected }) => {

    const handleSearchListCLick = (country) =>{
        setSearch('')
        setSelected(country)
    }
    
  return (
    <header className="h-[70px] w-full rounded-xl flex justify-center z-[2] fixed shrink-0  lg:top-6 top-0">

        <div className={ ` shadow-2xl shadow-neutral-700/[.2] w-full max-w-[400px] h-[66px]  [&:is(.active)]:!h-[400px] vertical *:w-full  transition-all overflow-hidden lg:rounded-xl relative bg-white p-3 gap-3 group/container ${suggestions.length && 'active '}` }>

            <input type="text" 
                className="w-full max-w-[400px]  border-0 lg:border-b-[1px] lg:focus-visible:border-0 lg:focus-visible:border-b-[1px] focus-visible:outline-none px-3 py-2 lg:focus-visible:border-b-emerald-500 transition-colors shrink-0" 
                placeholder={`${selected ? selected.name.official : 'Search Country Name ...'}`} 
                onChange={ ( e ) => setSearch( e.target.value )}
                value={search}
            />
            <div className="w-full top-[100%] left-0 bg-[#fff] transition-all h-full vertical gap-3 *:w-full overflow-y-scroll *:shrink-0 py-3 no-scrollbar pt-0 opacity-0 group-[&:is(.active)]/container:opacity-100 translate-y-12 group-[&:is(.active)]/container:translate-y-0 [&:has(.search-item:hover)>.search-item:not(:hover)]:grayscale-0 ">
               {suggestions.length > 0 && 
                    suggestions.map(( list , index ) => (
                        <SearchList country={list} key={index} onClick={()=> handleSearchListCLick(list)} />
                    ))
               }
            </div>
        </div>
    </header>
  )
}

export default Header