import { Icon } from "@iconify/react/dist/iconify.js"

const Feedback = ({handleClick}) => {
  return (
    <div className="py-10 grid-center no-select h-max shrink-0 w-full ">
      <div className="vertical gap-6 items-center">
        <h1 className="text-[4rem] font-parkinsans font-bold text-center max-sm:text-[3.5rem] leading-[110%]">Give Feedback</h1>
        <div className="horizontal gap-6 [&:has(button:hover)_button:not(:hover)]:opacity-50 [&:has(button:hover)_button:not(:hover)]:grayscale *:transition-all">
          <button onClick={() => handleClick('good')} className="bg-gradient-to-t from-emerald-800 to-emerald-500 vertical gap-1 font-parkinsans px-5 py-2 font-semibold items-center rounded-lg group active:scale-95">
            <Icon icon="fluent-emoji:beaming-face-with-smiling-eyes" className="text-[3.5rem] group-hover:scale-[2.2] group-hover:translate-y-[13px] transition-transform" />
            <span className="text-white capitalize group-hover:translate-y-[150%] group-hover:text-black group-hover:scale-[1.4] group-hover:font-bold transition-transform">Good</span>
          </button>
          <button onClick={() => handleClick('neutral')} className="bg-gradient-to-t from-slate-500 to-slate-100 vertical justify-center gap-1 font-parkinsans w-[100px] h-[100px] font-semibold items-center rounded-lg group active:scale-95">
            <Icon icon="fluent-emoji:neutral-face" className="text-[3.5rem]  group-hover:scale-[2.2] group-hover:translate-y-[13px] transition-transform " />
            <span className="text-white capitalize group-hover:translate-y-[150%] group-hover:text-black group-hover:scale-[1.4] group-hover:font-bold transition-transform">neutral</span>
          </button>
          <button onClick={() => handleClick('bad')} className="bg-gradient-to-t from-slate-500 to-slate-100 vertical gap-1 font-parkinsans px-5 py-2 font-semibold items-center rounded-lg group active:scale-95">
            <Icon icon="fluent-emoji:face-with-symbols-on-mouth" className="text-[3.5rem] group-hover:scale-[2.2] group-hover:translate-y-[13px] transition-transform" />
            <span className="text-white capitalize group-hover:translate-y-[150%] group-hover:text-black group-hover:scale-[1.4] group-hover:font-bold transition-transform">Bad</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Feedback