
const SearchList = ({ country , onClick }) => {
    
  return (
    <button className="horizontal search-item justify-between relative bg-white hover:bg-[#e2e2e2] overflow-hidden rounded-lg py-2 px-3 group/list border border-solid border-white hover:border-neutral-300/[.5] active:scale-95 transition-all" onClick={() => onClick()}>
        <img 
            className="absolute h-[130%] opacity-[.1] blur-sm skew-x-12 right-0 group-hover/list:blur-none  transition-all group-hover/list:opacity-[1] group-hover/list:skew-x-0 group-hover/list:h-[50%] group-hover/list:right-3 rounded-sm group-hover/list:animate-breath z-20" 
            src={country.flags.svg} alt={country.flags.alt} 
        />
        <div className="vertical relative z-30 w-full">
            <p className="font-semibold text-lg text-left">{country.name.common}</p>
            <span className="font-light opacity-55 text-sm text-left w-[88%]">{country.name.official}</span>
        </div>
        <span className=" font-bold text-[2rem] opacity-30 absolute right-3 group-hover/list:scale-[3] group-hover/list:opacity-[.06] group-hover/list:z-10 group-hover/list:translate-y-4 group-hover/list:-translate-x-[200%] transition-all">{country.cca3}</span>
    </button>
  )
}

export default SearchList