
const BigCardSpirit = () => {
  return (
    <div className="w-full h-100dvh max-h-[auto] inset-0  z-0 lg:grid-center max-lg:pt-[calc(70px+2rem)] no-select">
        <div className="max-lg:pt-[calc(70px+2rem)] w-full max-lg:h-100dvh lg:w-[900px] lg:aspect-[1/.6] bg-white lg:rounded-3xl border border-solid border-neutral-300/[.8] vertical lg:horizontal relative p-3 overflow-hidden">
            <div className="w-[600px] aspect-[1/1] bg-neutral-400/30 animate-pulse rounded-2xl absolute lg:-right-[10%] lg:top-[15%] max-lg:abs-center-y max-lg:-right-[30%] opacity-20 no-select hidden"></div>
            <span className="absolute text-[13rem] font-bold text-neutral-400/20 animate-pulse -left-[2%] -bottom-[5%] leading-[80%] no-select"><span>000</span></span>

            <div className="w-full h-full lg:py-5 lg:px-4 vertical lg:justify-between max-md:gap-16  z-20" >
                <div className="horizontal max-md:vertical gap-3 items-center">
                    <div className="w-[80px] h-[60px] bg-neutral-400/20 animate-pulse "></div>
                    <div className="vertical gap-2">
                        <h1 className="font-parkinsans font-medium leading-[210%] horizontal items-center gap-2 bg-neutral-400/20 animate-pulse [animation-delay:.4s]">
                            <span className="opacity-0">United States of Ozakoji</span>
                        </h1>
                        <span className=" bg-neutral-400/20 animate-pulse -mt-2"><span className="opacity-0">the republic of new and old people working together</span></span>
                    </div>
                </div>
            </div>
        
        </div> 
    </div>
  )
}

export default BigCardSpirit