
import Button from './blocks/Button'
const Decide = ({title, message, onTrue , onFalse}) => {
  return (
    <div className='w-dvw h-dvh  fixed stack z-[9999999]'>
        <div className='bg-white/5 backdrop-blur-[2px]' onClick={onFalse}></div>
        <div className='grid-center px-6'>
            <div className='w-full max-w-[450px] p-5 bg-stone-950 z-20 rounded-2xl border-solid border border-white/[0.1]'>
                    <div className='vertical mb-5'>
                        <h2 className='text-orange-500 text-2xl font-medium'>{title}</h2>
                        <span className='text-[#868584] font-light'>{message}</span>
                    </div>
                    <div className='horizontal justify-between  mt-10'>
                        <Button  onClick={onFalse}>Cancel</Button>
                        <Button onClick={onTrue} type={'secondary'} className={'hover:bg-red-600 hover:text-white'}>Proceed</Button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Decide