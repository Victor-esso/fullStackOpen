

import Button from './blocks/Button'
import Input from './blocks/Input'
const ContactForm = ({closeForm , setContact , contact , onSubmit , formTitle , formSubTitle , submitText , error}) => {

    
  return (
    <div className='w-dvw h-dvh  fixed stack z-[9999999]'>
        <div className='bg-white/5 backdrop-blur-[2px]' onClick={closeForm}></div>
        <div className='grid-center px-6'>
            <div className='w-full max-w-[450px] p-5 bg-stone-950 z-20 rounded-2xl border-solid border border-white/[0.1]'>
                    <div className='vertical mb-5'>
                        <h2 className='text-orange-500 text-2xl font-medium'>{formTitle}</h2>
                        <span className='text-white/[.5] font-light'>{formSubTitle}</span>
                    </div>
                    <form className='w-full' onSubmit={onSubmit}>

                        <div className='vertical gap-5'>
                            <div className='w-full'>
                                <Input focus={true} placeholder={'Fullname'} value={contact.name} onChange={(event) => setContact({...contact , name : event.target.value})}/>
                                {error.name && <span className='text-[.75rem] text-red-500'>{error.name}</span>}
                            </div>
                            <div className='w-full'>
                                <Input placeholder={'Telephone Number'} type={'tel'} value={contact.number} onChange={(event) => setContact({...contact , number : event.target.value})} />
                                {error.number && <span className='text-[.75rem] text-red-500'>{error.number}</span>}
                            </div>
                        </div>

                        <div className='horizontal justify-between  mt-6'>
                            <Button type={'secondary'} submit={false} onClick={closeForm}>Cancel</Button>
                            <Button submit={true}>{submitText ? submitText : 'Save Contact'}</Button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
  )
}

export default ContactForm