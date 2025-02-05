
import { Icon } from "@iconify/react/dist/iconify.js"
import React from 'react'
import Button from './blocks/Button'

const List = ({contact , edit , removeContact}) => {
  return (
    <li className='w-full z-10'>
        <div className='py-3 px-5 bg-white/[.02] hover:bg-white/[.04] border-solid border border-white/[0.04] hover:border-white/[0.08] w-full rounded-xl no-select horizontal justify-between items-center lg:hover:scale-[1.02] transition-transform '>
            <div className='horizontal max-sm:vertical items-center gap-3'>
                <p className='text-white text-lg leading-[100%] capitalize'>{contact.name}</p>
                <span className='text-white/40 font-medium text-base leading-[100%]'>{contact.number.toString()}</span>
            </div>
            <div className="horizontal items-center gap-2">
                <Button type={'secondary'} className={`hover:scale-[1.1] transition-transform`} tippyContent={`Update`} onClick={() => edit(contact)}>
                    <Icon icon="feather:edit" className="" />
                </Button>
                <Button className={`hover:scale-[1.1] transition-transform bg-red-800 hover:bg-red-600`} tippyContent={`Delete`} onClick={() => removeContact(contact)} >
                    <Icon icon="feather:trash-2" className="" />
                </Button>
            </div>
        </div>
    </li>
  )
}

export default List