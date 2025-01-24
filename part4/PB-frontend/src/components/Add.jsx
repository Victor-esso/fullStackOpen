

import ContactForm from './ContactForm'
const Add = ({toggleAddContact , setNewContact , newContact , addNewContact , error}) => {
  return (
    <>
        <ContactForm closeForm={toggleAddContact} setContact={setNewContact} onSubmit={addNewContact} error={error}  contact={newContact} formTitle={'New Contact'} formSubTitle={'Adding a new contact to phonebook'} />
    </>
  )
}

export default Add