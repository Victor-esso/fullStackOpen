import { Icon } from "@iconify/react/dist/iconify.js"

const Statisticsline = ({icon , title , value}) => {
  return (
    <div className="bg-neutral-200 shrink-0 px-4 h-[54px] rounded-full horizontal items-center justify-between relative pl-[3.5rem] [&:nth-child(4)]:mt-6 hover:pl-[4rem] group hover:bg-neutral-800 transition-all hover:scale-[1.03] no-select">
            <Icon icon={icon} className="text-[calc(3.5rem-4px)] absolute left-[1px] group-hover:scale-[1.4] transition-all" />
        <div className="horizontal gap-2">
            <p className="capitalize text-xl font-semibold font-parkinsans text-neutral-800 group-hover:text-white transition-all ">{title}</p>
        </div>

        <span className="text-3xl font-bold text-neutral-700 group-hover:text-white transition-all group-hover:opacity-90">{value}</span>

    </div>
  )
}

export default Statisticsline