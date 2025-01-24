import { useEffect, useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import '../assets/css/notifcations.css'

const Notification = ({title , message, id , removeNotification , type = 'default' , index , duration = 2500}) => {
    const [visible, setVisible] = useState(false);
  
    useEffect(()=>{
        setVisible(true);
        const timer = setTimeout(()=>{
            clearAnimation()
        },duration)

        return () => clearTimeout(timer);
    },[])
    
    const clearAnimation = () => {
        setTimeout(()=>{
            removeNotification(id)
        },150)
        setVisible(false);
    }

    const typeClasses = {
        default: 'border-white/[.2] shadow-white/[.1]',
        success: 'border-emerald-600 shadow-emerald-500/[.2]',
        error: 'border-red-600 shadow-red-500/[.2]',
        warning: 'border-yellow-600 shadow-yellow-500/[.2]',
    };
    const progressClass = {
        default: 'bg-white/[.4]',
        success: 'bg-emerald-300',
        error: 'bg-red-400',
        warning: 'bg-yellow-300',
    };

  return (
    <>
        <div className={`notification relative w-full max-w-[460px]  px-4 py-3  
            ${!title ? 'horizontal gap-4' : 'vertical gap-1 pt-5'}
            ${visible ? 'fade-in' : 'fade-out'} 
            ${typeClasses[type]}
            transition-transform bg-[#161413] border-solid border  w-full rounded-xl no-select lg:hover:scale-[1.02] border-b-8 shadow-2xl last:mb-0 mb-4`}>
                <p className="text-white capitalize font-medium">{title}</p>
                <span className={`${!title ? 'text-white' : 'text-white/[.4]'} font-light`}>{message}</span>
                <button onClick={() => {clearAnimation()}} className={`${!title ? '' : 'absolute right-2 top-2'} border border-solid border-white/[.05] hover:border-red-600  bg-white/[.04] text-white hover:text-white hover:scale-[1.15] hover:bg-red-600 transition-all rounded-lg w-[30px] h-[30px] grid-center`}><Icon icon="feather:x" /></button>
                <div className="w-full absolute left-0 -bottom-2 px-[0.55rem]">
                    <div className={`${progressClass[type]} h-[.06rem] transition-all ease-linear`} style={{transitionDuration:`${duration}ms`, width: visible ? '100%' : '0px'}}></div>
                </div>
        </div>
    </>
  )
}

export default Notification