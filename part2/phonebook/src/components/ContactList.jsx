import React from 'react'
import List from './List'

const ContactList = ({contacts , edit , removeContact}) => {
  return (
    <section className='h-full w-full flex justify-center pt-[calc(2rem+140px)] px-6 pb-10'>

        <div className='w-full max-w-[600px]  h-full vertical'>
            <ul className='list-none w-full vertical gap-4'>
                {contacts.map((contact) => <List contact={contact} key={contact.id} edit={edit} removeContact={removeContact} />)}
            </ul>
        </div>

    </section>
  )
}

export default ContactList