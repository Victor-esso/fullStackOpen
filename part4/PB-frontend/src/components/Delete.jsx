
import Button from './blocks/Button'
const Delete = ({contact , onDelete , onCancel}) => {
  return (
    <div className='w-dvw h-dvh  fixed stack z-[9999999]'>
        <div className='bg-white/5 backdrop-blur-[2px]' onClick={onCancel}></div>
        <div className='grid-center px-6'>
            <div className='w-full max-w-[450px] p-5 bg-stone-950 z-20 rounded-2xl border-solid border border-white/[0.1]'>
                    <div className='vertical mb-5'>
                        <h2 className='text-orange-500 text-2xl font-medium'>Delete Contact</h2>
                        <span className='text-[#868584] font-light'>Are you sure you want to delete <strong className='text-white'>{contact.name}'s</strong> contact from your phonebook</span>
                    </div>
                    <div className='horizontal justify-between  mt-10'>
                        <Button  onClick={onCancel}>Cancel</Button>
                        <Button onClick={onDelete} type={'secondary'} className={'hover:bg-red-600 hover:text-white'}>Delete Contact</Button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Delete